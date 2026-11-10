# Exercise 10: Reusable Child Modules

## 🎯 Objectives
- Encapsulate reusable infrastructure into a child module.
- Define module input variables and module output values.
- Instantiate child modules multiple times with different parameters from the root module.

## 📖 Key Concepts
- **Module**: A container for multiple resources that are used together.
- **Child Module**: A module called by another module via `module "<NAME>" { source = "..." }`.
- **Encapsulation**: Resources inside a child module are private unless explicitly exposed via outputs.

## 📝 Your Task
In `starter/`:
1. Build a child module in `modules/storage_bucket/` that creates a simulated storage folder and metadata manifest:
   - Inputs: `bucket_name`, `environment`, `retention_days`.
   - Resource: `local_file.bucket_manifest`.
   - Output: `manifest_path` and `arn`.
2. In the root `main.tf`, invoke this child module twice:
   - `module "app_assets"` (bucket_name: `"app-assets"`, env: `"production"`)
   - `module "app_logs"` (bucket_name: `"app-logs"`, env: `"production"`, retention_days: 90)
3. In root `outputs.tf`, expose the manifest paths of both modules.

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform plan
terraform apply -auto-approve
terraform output
terraform destroy -auto-approve
```
