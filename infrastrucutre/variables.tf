# names and versions of resources


variable "name" {
  description = "Name of the project"
  type        = string
  default     = "payments-manager-mikroorm"
}

variable "ami_type" {
  description = "Type of AMI to use for the instances"
  type        = string
  default     = "amazon-linux-2"
}