# asg, security group, launch configuration, and load balancer
# null resource sets ips and  ssh access to the instances to github secrets

# terraform {
#   required_providers {
#     aws = {
#       source  = "hashicorp/aws"
#       version = "~> 5.0"
#     }
#   }
# }

provider "aws" {
  region = "eu-north-1"
}

data "http" "my_ip" {
  url = "https://ifconfig.me/ip"
}

locals {
  raw_ip = chomp(data.http.my_ip.response_body)
  ingress_rules = [
    { port = 8080 },
    { port = 22 }
  ]
}



resource "aws_security_group" "app_sg" {
  name        = "${var.name}-sg"
  description = "Allow SSH and HTTP access"

  dynamic "ingress" {
    for_each = local.ingress_rules
    content {
      from_port = ingress.value.port
      to_port   = ingress.value.port
      protocol  = "tcp"
      cidr_blocks      = ["${local.raw_ip}/32"]
      # ipv6_cidr_blocks = ["${local.raw_ip}/128"]
    }
  }


  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_launch_template" "app_lt" {
  name_prefix   = "${var.name}-lt-"
  image_id      = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  key_name      = aws_key_pair.app_key.key_name
  depends_on    = [aws_security_group.app_sg]

  security_group_names = [aws_security_group.app_sg.name]

  monitoring {
    enabled = true
  }

  tags = {
    Name = "${var.name}-instance"
  }

  user_data = base64encode(file("${path.module}/../scripts/deploy-remote.sh"))
}

resource "aws_autoscaling_group" "app_asg" {
  name             = "${var.name}-asg"
  max_size         = 2
  min_size         = 1
  desired_capacity = 1
  launch_template {
    id      = aws_launch_template.app_lt.id
    version = "$Latest"
  }
  availability_zones = ["eu-north-1a"]

  tag {
    key                 = "Name"
    value               = "${var.name}-asg-instance"
    propagate_at_launch = true
  }
}

resource "tls_private_key" "ed25519-example" {
  algorithm = "ED25519"
}
resource "aws_key_pair" "app_key" {
  key_name   = "${var.name}-key"
  public_key = tls_private_key.ed25519-example.public_key_openssh
}

resource "aws_secretsmanager_secret" "secrets" {
  name = "${var.name}-secret"
}


resource "aws_secretsmanager_secret_version" "secrets" {
  secret_id     = aws_secretsmanager_secret.secrets.id
  secret_string = tls_private_key.ed25519-example.private_key_pem
}
# 

resource "aws_ssm_parameter" "ec2_public_ip" {
  depends_on = [aws_autoscaling_group.app_asg]

  name  = "/${var.name}/ec2-public-ip"
  type  = "String"
  value = data.aws_instances.app_instances.public_ips[0]
}
resource "null_resource" "write_env" {
  provisioner "local-exec" {
    command = <<-EOF
      IP=$(aws ec2 describe-instances \
        --filters "Name=tag:aws:autoscaling:groupName,Values=${aws_autoscaling_group.app_asg.name}" \
                  "Name=instance-state-name,Values=running" \
        --query "Reservations[0].Instances[0].PublicIpAddress" \
        --output text)
      echo "EC2_PUBLIC_IP=$IP" >> ../.env
    EOF
  }
}


terraform {
  backend "s3" {
    bucket  = "payments-manager-mikroorm-tf-state-eu"
    key     = "global/s3/terraform.tfstate"
    region  = "eu-north-1"
    encrypt = true
  }
}

resource "aws_iam_user" "the-accounts" {
  for_each = toset(["Todd", "James", "Alice", "Dottie"])
  name     = each.key
}


resource "aws_s3_bucket" "tf-state" {
  bucket = "${var.name}-tf-state-eu"

  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_s3_bucket_versioning" "tf-state" {
  bucket = "payments-manager-mikroorm-tf-state-eu"

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "tf-state" {
  bucket = aws_s3_bucket.tf-state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
