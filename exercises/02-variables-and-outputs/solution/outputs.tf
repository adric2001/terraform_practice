output "app_url" {
  description = "Fully qualified local application URL"
  value       = "http://localhost:${var.app_port}"
}

output "database_password" {
  description = "Master database password"
  value       = var.db_password
  sensitive   = true
}
