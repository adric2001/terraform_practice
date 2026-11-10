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

module "network" {
  source = "./modules/networking"

  vpc_cidr     = "10.100.0.0/16"
  subnet_count = 3
}

module "vault" {
  source = "./modules/secure_vault"

  service_name = var.project_name
}

resource "local_file" "summary" {
  filename = "${path.module}/environment_summary.json"
  content = jsonencode({
    project     = var.project_name
    environment = var.environment
    subnets     = module.network.subnets
    public_key  = module.vault.public_key
  })
}
