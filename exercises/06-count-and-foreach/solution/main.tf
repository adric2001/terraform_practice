terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "servers" {
  for_each = toset(var.server_names)

  filename = "${path.module}/servers/${each.key}.txt"
  content  = "Server Hostname: ${each.key}.internal\n"
}

resource "local_file" "roles" {
  for_each = var.service_roles

  filename = "${path.module}/roles/${each.key}.conf"
  content  = "Role: ${each.key} | Listening Port: ${each.value}\n"
}
