terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

# TODO 1: Call module "app_assets" using source = "./modules/storage_bucket"

# TODO 2: Call module "app_logs" using source = "./modules/storage_bucket"
