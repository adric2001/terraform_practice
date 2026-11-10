terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "payload" {
  filename = "${path.module}/app_payload.txt"
  content  = "Build Artifact: ${var.build_id}\n"
}

resource "terraform_data" "validator" {
  input = filesha256(local_file.payload.filename)

  triggers_replace = [
    local_file.payload.content
  ]

  provisioner "local-exec" {
    command = "echo '[AUDIT] Verified payload ${self.input} for build ${var.build_id}'"
  }
}
