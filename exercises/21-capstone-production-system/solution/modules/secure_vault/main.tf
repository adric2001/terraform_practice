terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0.0"
    }
  }
}

resource "tls_private_key" "service_cert" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "local_file" "vault_record" {
  filename        = "${path.module}/../../vault_${var.service_name}.json"
  file_permission = "0600"
  content = jsonencode({
    service    = var.service_name
    public_key = tls_private_key.service_cert.public_key_openssh
  })
}
