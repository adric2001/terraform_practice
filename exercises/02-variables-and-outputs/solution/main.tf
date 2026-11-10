terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "app_config" {
  filename = "${path.module}/app_config.env"
  content  = <<-EOT
    ENVIRONMENT=${var.environment}
    PORT=${var.app_port}
    FEATURE_ENABLED=${var.enable_feature}
  EOT
}
