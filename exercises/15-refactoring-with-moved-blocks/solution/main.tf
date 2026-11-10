terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "services" {
  for_each = toset(["frontend", "backend"])

  filename = "${path.module}/${each.key}.txt"
  content  = "Service: ${each.key} v2\n"
}
