output "service_files" {
  value = { for k, v in local_file.services : k => v.filename }
}
