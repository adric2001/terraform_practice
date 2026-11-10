output "summary_path" {
  description = "Path to generated environment summary"
  value       = local_file.summary.filename
}

output "subnet_allocations" {
  description = "Subnets provisioned by networking module"
  value       = module.network.subnets
}
