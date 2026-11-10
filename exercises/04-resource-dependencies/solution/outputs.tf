output "bundle_sha256" {
  description = "Base64 SHA256 checksum of the generated archive"
  value       = data.archive_file.bundle.output_base64sha256
}
