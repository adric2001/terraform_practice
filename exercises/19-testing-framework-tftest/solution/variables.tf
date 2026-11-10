variable "app_env" {
  description = "Target environment for test verification"
  type        = string
  default     = "staging"
}

variable "assigned_port" {
  description = "Assigned network port"
  type        = number
  default     = 8080
}
