output "active_rules" {
  description = "Names of active firewall rules"
  value       = keys(var.firewall_rules)
}
