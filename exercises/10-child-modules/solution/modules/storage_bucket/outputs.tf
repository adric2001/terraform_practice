output "manifest_path" {
  description = "Filesystem path to bucket manifest"
  value       = local_file.bucket_manifest.filename
}

output "arn" {
  description = "Simulated resource ARN"
  value       = "arn:aws:s3:::${var.bucket_name}"
}
