output "active_workspace" {
  description = "Currently active Terraform workspace"
  value       = terraform.workspace
}

output "deployed_instance_type" {
  description = "Instance type chosen for this workspace"
  value       = local.config.instance_type
}
