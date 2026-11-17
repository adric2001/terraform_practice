output "file_path" {
  description = "The path to the created local file"
  value       = local_file.welcome_note.filename
}

output "file_id" {
  description = "The unique resource identifier assigned by Terraform"
  value       = local_file.welcome_note.id
}
