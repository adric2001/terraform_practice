output "assets_manifest" {
  description = "Path to assets bucket manifest"
  value       = module.app_assets.manifest_path
}

output "logs_manifest" {
  description = "Path to logs bucket manifest"
  value       = module.app_logs.manifest_path
}
