output "app_name" {
  description = "Application name parsed from external data"
  value       = local.system_spec.system_name
}

output "memory_gb" {
  description = "Allocated memory in GB"
  value       = local.system_spec.resources.memory_gb
}
