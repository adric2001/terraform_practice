output "server_file_paths" {
  description = "Map of server names to generated file paths"
  value       = { for k, v in local_file.servers : k => v.filename }
}

output "role_ports" {
  description = "Port mappings for each created role"
  value       = { for k, v in local_file.roles : k => var.service_roles[k] }
}
