# Exercise 12: State Inspection & Manipulation

## 🎯 Objectives
- Practice essential state commands: `terraform state list`, `show`, `mv`, and `rm`.
- Safely rename a resource address in state without triggering destructive recreation.
- Understand how to remove a resource from management without destroying the underlying asset.

## 📖 Key Concepts
- **`terraform state list`**: Enumerates all tracked resource addresses.
- **`terraform state show <addr>`**: Displays internal attributes of a tracked instance.
- **`terraform state mv <source> <dest>`**: Renames an address inside the state file without touching the infrastructure.
- **`terraform state rm <addr>`**: Stops tracking a resource in state; leaves live infrastructure untouched.

## 📝 Your Task
In `starter/`:
1. Apply the initial configuration containing `resource "local_file" "legacy_config"`.
2. Notice you want to rename the resource in code to `local_file.modern_config`.
3. If you only change the HCL code, `terraform plan` will DESTROY the old file and CREATE the new one!
4. Use `terraform state mv local_file.legacy_config local_file.modern_config` to rebind state!
5. Run `terraform plan` to verify that there are **0 to add, 0 to change, 0 to destroy**.

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform apply -auto-approve
terraform state list
# Now perform the rename exercise:
# 1. Edit main.tf: rename legacy_config -> modern_config
# 2. Run: terraform state mv local_file.legacy_config local_file.modern_config
# 3. Run: terraform plan (Must show: No changes!)
terraform destroy -auto-approve
```
