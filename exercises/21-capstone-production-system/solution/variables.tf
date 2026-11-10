variable "project_name" {
  description = "Global project identifier"
  type        = string
  default     = "phoenix-core"
}

variable "environment" {
  description = "Deployment target environment"
  type        = string
  default     = "production"
}
