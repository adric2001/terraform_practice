# TODO: Define output "file_path" referencing welcome_note.filename
  
output "file_path" {
    value = local_file.welcome_note.filename
}
# TODO: Define output "file_id" referencing welcome_note.id
output "file_id" {
    value = local_file.welcome_note.id
}