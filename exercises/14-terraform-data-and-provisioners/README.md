# Exercise 14: `terraform_data` & Lifecycle Triggers

## 🎯 Objectives
- Replace deprecated `null_resource` with modern `terraform_data` (built-in since Terraform 1.4).
- Use `triggers_replace` to force re-execution when an input hash changes.
- Practice `local-exec` provisioners and learn safe patterns for external script orchestration.

## 📖 Key Concepts
- **`terraform_data`**: Built into Terraform without requiring third-party provider downloads. Holds arbitrary values and participates in the dependency graph.
- **`triggers_replace`**: Replaces the resource whenever the specified trigger value changes.
- **Provisioners**: Intended as a **last resort** for executing commands when declarative providers don't suffice.

## 📝 Your Task
In `starter/`:
1. Generate a file `${path.module}/app_payload.txt` using `local_file`.
2. Define a `terraform_data` resource named `checksum_validator` with:
   - `input`: File content hash `filesha256(local_file.payload.filename)`.
   - `triggers_replace`: Replaces validator whenever the file hash changes.
   - `provisioner "local-exec"`: Prints a success message to the console.
3. Modify the payload file content and re-apply to observe `terraform_data` re-triggering!

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform apply -auto-approve
# Observe provisioner running in stdout!
terraform destroy -auto-approve
```
