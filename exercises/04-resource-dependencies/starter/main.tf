terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4.0"
    }
  }
}

# TODO 1: Generate a random password (length = 16, special = true) using resource "random_password" "db_pass"

# TODO 2: Save random password to "${path.module}/db_secret.txt" using resource "local_file" "secret_file"

# TODO 3: Archive "${path.module}/db_secret.txt" into "${path.module}/db_bundle.zip" using data "archive_file" "bundle"
# Include explicit depends_on = [local_file.secret_file]
