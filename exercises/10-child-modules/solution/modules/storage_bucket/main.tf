terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "bucket_manifest" {
  filename = "${path.module}/../../storage/${var.bucket_name}.json"
  content = jsonencode({
    bucket_name    = var.bucket_name
    environment    = var.environment
    retention_days = var.retention_days
  })
}
