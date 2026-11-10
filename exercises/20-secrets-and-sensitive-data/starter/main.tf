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

# TODO 1: Generate TLS RSA 4096 private key using resource "tls_private_key" "app_key"

# TODO 2: Generate random password (length 24) using resource "random_password" "db_secret"

# TODO 3: Save encrypted credentials into "${path.module}/secure_credentials.json"
