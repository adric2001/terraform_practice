terraform {
  required_version = ">= 1.5.0"
  required_providers {
    # TODO: Add hashicorp/local provider requirement (~> 2.5)
  }
}

# TODO: Declare a resource "local_file" named "welcome_note"
# - filename: "${path.module}/welcome.txt"
# - content: "Hello, Terraform! I am managing infrastructure as code."
# - file_permission: "0644"
