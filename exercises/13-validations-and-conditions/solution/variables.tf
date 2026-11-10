variable "env_code" {
  description = "Environment identifier (dev, stage, prod)"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "stage", "prod"], var.env_code)
    error_message = "The env_code variable must be exactly 'dev', 'stage', or 'prod'."
  }
}

variable "app_version" {
  description = "Application release version matching semver (e.g. v1.2.3)"
  type        = string
  default     = "v1.2.0"

  validation {
    condition     = can(regex("^v[0-9]+\\.[0-9]+\\.[0-9]+$", var.app_version))
    error_message = "app_version must follow semantic versioning prefixed with 'v' (e.g., 'v1.0.0')."
  }
}

variable "cluster_name" {
  description = "Name of the target compute cluster"
  type        = string
  default     = "alpha"
}
