terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

# TODO 1: Create resource "local_file" "primary_site"
# Filename: "${path.module}/primary_region.txt"

# TODO 2: Create resource "local_file" "secondary_site"
# Filename: "${path.module}/secondary_region.txt"
