terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

# TODO 1: Extract current config using lookup(var.workspace_settings, terraform.workspace, var.workspace_settings["default"])

# TODO 2: Write configuration to "${path.module}/env_${terraform.workspace}.conf"
