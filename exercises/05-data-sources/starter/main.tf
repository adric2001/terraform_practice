terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

# TODO 1: Read the external JSON file using data "local_file" "spec"
# Target path: "${path.module}/data/system_spec.json"

# TODO 2: Parse json content using a local variable:
# locals {
#   system_spec = jsondecode(data.local_file.spec.content)
# }

# TODO 3: Create a local_file resource "${path.module}/rendered_manifest.txt"
