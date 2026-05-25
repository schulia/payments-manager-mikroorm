output "instance_public_ips" {
  value = data.aws_instances.app_instances.public_ips
}