terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "primary_site" {
  filename = "${path.module}/primary_region.txt"
  content  = "REGION: us-east-1 (Primary Active)\n"
}

resource "local_file" "secondary_site" {
  provider = local.dr_region

  filename = "${path.module}/secondary_region.txt"
  content  = "REGION: us-west-2 (Secondary Standby DR)\n"
}
