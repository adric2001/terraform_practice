terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "welcome_note" {
  filename        = "${path.module}/welcome.txt"
  content         = "Hello, Terraform! I am managing infrastructure as code."
  file_permission = "0644"
}
