output "public_key" {
  description = "Public SSH key for the service"
  value       = tls_private_key.service_cert.public_key_openssh
}

output "vault_file" {
  description = "Path to vault security record"
  value       = local_file.vault_record.filename
}
