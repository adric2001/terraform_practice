terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "legacy_system" {
  filename        = "${path.module}/existing_assets/legacy_system.txt"
  content         = "LEGACY_DATA_DO_NOT_DELETE\n"
  file_permission = "0644"
}
