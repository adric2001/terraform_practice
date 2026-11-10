variable "environment" {
  description = "Target deployment environment (e.g. dev, staging, prod)"
  type        = string
  default     = "development"
}

variable "app_port" {
  description = "The port on which the application server listens"
  type        = number
  default     = 8080
}

variable "enable_feature" {
  description = "Flag to toggle experimental feature flags"
  type        = bool
  default     = true
}

variable "db_password" {
  description = "Database master password"
  type        = string
  sensitive   = true
}
