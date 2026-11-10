terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "config" {
  filename = "${path.module}/app.json"
  content = jsonencode({
    env  = var.app_env
    port = var.assigned_port
  })
}
