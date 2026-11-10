output "primary_endpoint" {
  description = "Path to primary site deployment file"
  value       = local_file.primary_site.filename
}

output "secondary_endpoint" {
  description = "Path to secondary standby site deployment file"
  value       = local_file.secondary_site.filename
}
