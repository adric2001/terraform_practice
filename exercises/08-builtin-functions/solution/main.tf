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
  # Flatten nested services for enabled environments only
  enabled_endpoints = sort(flatten([
    for env_name, env_data in var.cluster_config : [
      for svc in env_data.services : "${svc}.${env_name}.internal"
    ] if env_data.enabled
  ]))
}

resource "local_file" "dns_records" {
  filename = "${path.module}/dns_records.txt"
  content  = join("\n", local.enabled_endpoints)
}
