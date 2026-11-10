terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

# TODO 1: Resource "critical_db_seed" with lifecycle { prevent_destroy = false }

# TODO 2: Resource "blue_green_app" with lifecycle { create_before_destroy = true }

# TODO 3: Resource "externally_managed_file" with lifecycle { ignore_changes = [content] }
