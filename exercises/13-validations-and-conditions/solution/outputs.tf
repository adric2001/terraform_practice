output "release_path" {
  description = "Path of the verified release configuration file"
  value       = local_file.release_note.filename
}
