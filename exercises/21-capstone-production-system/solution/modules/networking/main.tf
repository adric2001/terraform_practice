terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

locals {
  subnets = [
    for i in range(var.subnet_count) : cidrsubnet(var.vpc_cidr, 8, i)
  ]
}

resource "local_file" "network_manifest" {
  filename = "${path.module}/../../network.json"
  content = jsonencode({
    vpc_cidr = var.vpc_cidr
    subnets  = local.subnets
  })
}
