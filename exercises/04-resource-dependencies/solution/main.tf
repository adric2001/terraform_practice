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

resource "random_password" "db_pass" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "local_file" "secret_file" {
  filename        = "${path.module}/db_secret.txt"
  content         = random_password.db_pass.result
  file_permission = "0600"
}

data "archive_file" "bundle" {
  type        = "zip"
  source_file = local_file.secret_file.filename
  output_path = "${path.module}/db_bundle.zip"

  depends_on = [
    local_file.secret_file
  ]
}
