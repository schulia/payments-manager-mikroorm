# asg, security group, launch configuration, and load balancer
# null resource sets ips and  ssh access to the instances to github secrets

resource "aws_security_group" "app_sg" {
  name        = "${var.name}-sg"
  description = "Allow SSH and HTTP access"

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
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
  instance_type = "t2.micro"

  security_group_names = [aws_security_group.app_sg.name]

  cpu_options {
    core_count       = 4
    threads_per_core = 2
  }

  monitoring {
    enabled = true
  }

  tags = {
    Name = "${var.name}-instance"
  }

  user_data = base64encode(file("${path.module}/../scripts/deploy-remote.sh"))
}

resource "aws_autoscaling_group" "app_asg" {
  name                      = "${var.name}-asg"
  max_size                  = 2
  min_size                  = 1
  desired_capacity          = 1
  launch_template {
    id      = aws_launch_template.app_lt.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "${var.name}-asg-instance"
    propagate_at_launch = true
  }
}