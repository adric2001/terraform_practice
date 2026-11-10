terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "payload" {
  filename = "${path.module}/app_payload.txt"
  content  = "Build Artifact: ${var.build_id}\n"
}

# TODO: Add terraform_data "validator"
