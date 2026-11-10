# Exercise 17: State Backends & Locking Semantics

## 🎯 Objectives
- Configure state storage backends (`local`, `s3`, `http`).
- Understand how state locking prevents race conditions and state corruption.
- Migrate state between backends with `terraform init -migrate-state`.
- Use partial backend configuration and `-backend-config` flags.

## 📖 Key Concepts
- **Remote Backend**: Stores `terraform.tfstate` in a shared, centralized store (e.g. AWS S3 + DynamoDB, Terraform Cloud, Azure Blob).
- **State Locking**: Acquired before every write operation. Prevents team members or CI pipelines from corrupting state by writing concurrently.
- **Migration**: When changing the backend block, Terraform prompts to migrate existing state to the new location.

## 📝 Your Task
In `starter/`:
1. In `backend.tf`, configure a custom `local` backend path:
   ```hcl
   terraform {
     backend "local" {
       path = "custom_state/dev.tfstate"
     }
   }
   ```
2. Initialize and migrate existing state to the new path with `terraform init -migrate-state`.
3. Inspect the newly created directory `custom_state/` to confirm state storage.

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform apply -auto-approve
ls -la custom_state/
terraform destroy -auto-approve
```
