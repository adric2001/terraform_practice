output "payload_sha256" {
  description = "Tracked checksum stored in terraform_data state"
  value       = terraform_data.validator.output
}
