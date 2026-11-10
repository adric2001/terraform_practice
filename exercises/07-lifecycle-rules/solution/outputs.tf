output "critical_file" {
  description = "Protected database seed file"
  value       = local_file.critical_db_seed.filename
}

output "blue_green_file" {
  description = "File using create_before_destroy lifecycle"
  value       = local_file.blue_green_app.filename
}
