terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

# TODO: Create a local_file resource writing environment settings to "${path.module}/app_config.env"
# Content template:
# ENVIRONMENT=<environment>
# PORT=<app_port>
# FEATURE_ENABLED=<enable_feature>
