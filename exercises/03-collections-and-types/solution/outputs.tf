output "primary_ip" {
  description = "First allowed CIDR block in the list"
  value       = var.allowed_ips[0]
}

output "service_name" {
  description = "Configured name of the service"
  value       = var.service_definition.name
}
