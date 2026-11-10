terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

locals {
  current_env = terraform.workspace
  config      = lookup(var.workspace_settings, local.current_env, var.workspace_settings["default"])
}

resource "local_file" "environment_config" {
  filename = "${path.module}/env_${local.current_env}.conf"
  content  = <<-EOT
    # Configuration for Workspace: ${local.current_env}
    INSTANCE_TYPE=${local.config.instance_type}
    REPLICAS=${local.config.replicas}
    DEBUG_MODE=${local.config.debug_mode}
  EOT
}
