# Exercise 15: Zero-Downtime Refactoring with `moved` Blocks

## 🎯 Objectives
- Understand declarative state refactoring introduced in Terraform 1.1.
- Move individual resources into `for_each` maps without resource recreation.
- Move resources into child modules declaratively.
- Eliminate reliance on manual, error-prone `terraform state mv` commands in CI/CD.

## 📖 Key Concepts
- **`moved` Block**:
  ```hcl
  moved {
    from = local_file.standalone
    to   = local_file.grouped["standalone"]
  }
  ```
- When Terraform detects a `moved` block during `plan`, it automatically re-keys the state record to the new address.
- Zero downtime: The plan reports **0 to add, 0 to change, 0 to destroy**!

## 📝 Your Task
In `starter/`:
1. In `main.tf`, the configuration has been refactored into a single `for_each` resource: `local_file.services`.
2. In `moved.tf`, write two `moved` blocks mapping the old single resources (`local_file.frontend` and `local_file.backend`) to the new `for_each` keys.
3. Run `terraform plan` and verify that Terraform plans a rename rather than destroy/recreate!

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform plan
terraform apply -auto-approve
terraform destroy -auto-approve
```
