output "subnets" {
  description = "List of calculated subnet CIDRs"
  value       = local.subnets
}

output "manifest_path" {
  description = "Filesystem path to network manifest"
  value       = local_file.network_manifest.filename
}
