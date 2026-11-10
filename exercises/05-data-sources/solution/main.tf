terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

data "local_file" "spec" {
  filename = "${path.module}/data/system_spec.json"
}

locals {
  system_spec = jsondecode(data.local_file.spec.content)
}

resource "local_file" "manifest" {
  filename = "${path.module}/rendered_manifest.txt"
  content  = <<-EOT
    SYSTEM SPECIFICATION
    Name: ${local.system_spec.system_name}
    Version: ${local.system_spec.version}
    CPUs: ${local.system_spec.resources.cpu_cores} cores
    Memory: ${local.system_spec.resources.memory_gb} GB
    Features: ${join(", ", local.system_spec.features)}
  EOT
}
