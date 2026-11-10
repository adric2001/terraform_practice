terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

# TODO 1: Use a local block with flatten() and nested for loops:
# locals {
#   enabled_endpoints = flatten([
#     for env_name, env_data in var.cluster_config : [
#       for svc in env_data.services : "${svc}.${env_name}.internal"
#     ] if env_data.enabled
#   ])
# }

# TODO 2: Create local_file "dns_records" writing sorted endpoints to "${path.module}/dns_records.txt"
