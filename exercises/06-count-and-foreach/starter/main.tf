terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

# TODO 1: Create local_file "servers" using for_each = toset(var.server_names)
# Filename: "${path.module}/servers/${each.key}.txt"

# TODO 2: Create local_file "roles" using for_each = var.service_roles
# Filename: "${path.module}/roles/${each.key}.conf"
