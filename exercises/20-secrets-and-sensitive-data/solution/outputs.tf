output "public_key_openssh" {
  description = "Public SSH key (safe to expose publicly)"
  value       = tls_private_key.app_key.public_key_openssh
}

output "db_password" {
  description = "Masked database password"
  value       = random_password.db_secret.result
  sensitive   = true
}

output "password_sha256" {
  description = "Safe cryptographic fingerprint of the secret password"
  value       = sha256(nonsensitive(random_password.db_secret.result))
}
