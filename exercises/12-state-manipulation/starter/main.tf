terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "legacy_config" {
  filename = "${path.module}/system.cfg"
  content  = "cluster_nodes=3\n"
}
