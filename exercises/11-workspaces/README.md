# Exercise 11: Workspaces & Multi-Environment Configuration

## 🎯 Objectives
- Master Terraform workspaces (`default`, `dev`, `staging`, `prod`).
- Reference the active workspace via `terraform.workspace`.
- Drive environment-specific sizing, naming, and counts dynamically.

## 📖 Key Concepts
- **Workspace**: A separate, isolated state file stored under the same backend configuration.
- **`terraform.workspace`**: Built-in interpolation string containing the active workspace name.
- **Lookup Maps**: Common pattern `lookup(var.env_configs, terraform.workspace, var.env_configs["default"])`.

## 📝 Your Task
In `starter/`:
1. In `variables.tf`, define a map of configurations keyed by workspace (`dev`, `prod`, `default`).
2. In `main.tf`, generate `${path.module}/env_${terraform.workspace}.conf` with the active workspace configuration.
3. Test creating a `prod` workspace, switching to it, and observing how the generated file adapts!

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform workspace new prod || terraform workspace select prod
terraform apply -auto-approve
cat env_prod.conf
terraform workspace select default
terraform apply -auto-approve
cat env_default.conf
terraform destroy -auto-approve
terraform workspace select default
terraform workspace delete prod
```
