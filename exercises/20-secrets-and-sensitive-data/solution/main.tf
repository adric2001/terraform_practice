terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0.0"
    }
  }
}

resource "tls_private_key" "app_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "random_password" "db_secret" {
  length           = 24
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "local_file" "secure_manifest" {
  filename        = "${path.module}/secure_credentials.json"
  file_permission = "0600"
  content = jsonencode({
    public_key  = tls_private_key.app_key.public_key_openssh
    private_key = tls_private_key.app_key.private_key_pem
    db_password = random_password.db_secret.result
  })
}
