terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "backend_test" {
  filename = "${path.module}/backend_status.txt"
  content  = "State successfully stored in custom backend location\n"
}
