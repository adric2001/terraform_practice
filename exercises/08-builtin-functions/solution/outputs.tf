output "endpoints" {
  description = "Flattened list of enabled internal service endpoints"
  value       = local.enabled_endpoints
}

output "total_endpoints" {
  description = "Count of enabled endpoints"
  value       = length(local.enabled_endpoints)
}
