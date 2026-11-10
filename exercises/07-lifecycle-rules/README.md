# Exercise 07: Lifecycle Rules

## 🎯 Objectives
- Control resource replacement behavior using the `lifecycle` meta-argument.
- Use `create_before_destroy` to achieve zero-downtime resource replacement.
- Use `prevent_destroy` to protect mission-critical resources from accidental deletion.
- Use `ignore_changes` to prevent Terraform from overwriting out-of-band updates.

## 📖 Key Concepts
- **`create_before_destroy = true`**: Creates the replacement resource before deleting the old one.
- **`prevent_destroy = true`**: Generates an error and blocks any destroy action.
- **`ignore_changes = [...]`**: Disregards modifications made to specified attributes.

## 📝 Your Task
In `starter/`:
1. Configure a `local_file` named `critical_db_seed`:
   - Set `lifecycle { prevent_destroy = false }` for practice (toggle to `true` to test destruction prevention).
2. Configure a `local_file` named `blue_green_app`:
   - Set `lifecycle { create_before_destroy = true }`.
3. Configure a `local_file` named `externally_managed_file`:
   - Set `lifecycle { ignore_changes = [content] }`.

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform apply -auto-approve
terraform plan    # Verify no unexpected diffs
terraform destroy -auto-approve
```
