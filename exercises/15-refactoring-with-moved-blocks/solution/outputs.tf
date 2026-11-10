output "service_files" {
  description = "Map of refactored service files"
  value       = { for k, v in local_file.services : k => v.filename }
}
