terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "release_note" {
  filename = "${path.module}/release_${var.env_code}.json"
  content = jsonencode({
    environment  = var.env_code
    version      = var.app_version
    cluster_name = var.cluster_name
  })

  lifecycle {
    precondition {
      condition     = length(var.cluster_name) >= 3
      error_message = "cluster_name must be at least 3 characters long."
    }

    postcondition {
      condition     = length(self.content) > 10
      error_message = "Rendered release content must not be empty or truncated."
    }
  }
}
