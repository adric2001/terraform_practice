terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

module "app_assets" {
  source = "./modules/storage_bucket"

  bucket_name    = "app-assets"
  environment    = "production"
  retention_days = 365
}

module "app_logs" {
  source = "./modules/storage_bucket"

  bucket_name    = "app-logs"
  environment    = "production"
  retention_days = 90
}
