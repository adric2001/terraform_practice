terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "service_json" {
  filename = "${path.module}/service.json"
  content = jsonencode({
    service  = var.service_definition
    allowed  = var.allowed_ips
    metadata = var.server_metadata
  })
}
