# Exercise 13: Custom Validations & Pre/Post-Conditions

## 🎯 Objectives
- Enforce strict input validation using variable `validation` blocks with regex.
- Implement resource `lifecycle { precondition { ... } }` checks.
- Implement resource `lifecycle { postcondition { ... } }` checks.

## 📖 Key Concepts
- **Variable Validation**: Blocks invalid values early at the input boundary before evaluating any resources.
- **Preconditions**: Guard assertions that execute before creating/updating a resource.
- **Postconditions**: Guarantees that run after resource creation to verify actual output states.

## 📝 Your Task
In `starter/`:
1. In `variables.tf`, add a `validation` block to `env_code` requiring it to be `"dev"`, `"stage"`, or `"prod"`.
2. Add a `validation` block to `app_version` requiring it to match Semantic Versioning (`^v[0-9]+\.[0-9]+\.[0-9]+$`).
3. In `main.tf`, create a `local_file` resource with:
   - A `precondition` verifying `length(var.cluster_name) >= 3`.
   - A `postcondition` verifying `self.content != ""`.

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform apply -auto-approve
# Test passing an invalid version:
terraform apply -var="app_version=invalid" # Should fail with custom error message!
terraform destroy -auto-approve
```
