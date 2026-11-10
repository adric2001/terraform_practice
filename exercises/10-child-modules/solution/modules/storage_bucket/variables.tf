variable "bucket_name" {
  description = "Unique identifier for the storage bucket"
  type        = string
}

variable "environment" {
  description = "Target deployment environment"
  type        = string
  default     = "dev"
}

variable "retention_days" {
  description = "Data retention policy in days"
  type        = number
  default     = 30
}
