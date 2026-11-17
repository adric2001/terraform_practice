variable "aws_region" {
  description = "Target AWS deployment region"
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "Prefix for all application resource names"
  type        = string
  default     = "tf-practice-portal"
}

variable "environment" {
  description = "Deployment environment (e.g. prod, dev)"
  type        = string
  default     = "prod"
}
