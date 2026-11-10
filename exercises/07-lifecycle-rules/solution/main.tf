terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "critical_db_seed" {
  filename = "${path.module}/db_seed.sql"
  content  = "INSERT INTO schema_version VALUES (1, 'initial');"

  lifecycle {
    prevent_destroy = false
  }
}

resource "local_file" "blue_green_app" {
  filename = "${path.module}/app_release.txt"
  content  = "Release Version 1.0.0"

  lifecycle {
    create_before_destroy = true
  }
}

resource "local_file" "externally_managed_file" {
  filename = "${path.module}/dynamic_tags.conf"
  content  = "initial_tag=alpha"

  lifecycle {
    ignore_changes = [
      content,
      file_permission
    ]
  }
}
