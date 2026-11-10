# Exercise 04: Resource Dependencies and the Graph

## 🎯 Objectives
- Understand how Terraform builds the Directed Acyclic Graph (DAG).
- Differentiate between **implicit dependencies** and **explicit dependencies** (`depends_on`).
- Avoid race conditions during multi-resource provisioning.
- Use `terraform graph` to inspect dependencies.

## 📖 Key Concepts
- **Implicit Dependency**: When Resource B references an attribute of Resource A (`content = random_password.pass.result`).
- **Explicit Dependency (`depends_on`)**: Specifies an execution order when no attribute reference exists.

## 📝 Your Task
In `starter/`:
1. Generate a random password using `random_password` (length = 16, special = true).
2. Save that password into a secured file `${path.module}/db_secret.txt` using `local_file`.
3. Create a zip archive using `archive_file` containing `db_secret.txt` as `${path.module}/db_bundle.zip`.
4. Ensure the archive step explicitly depends on the file being written on disk using `depends_on = [local_file.secret_file]`.
5. Output the SHA256 of the zip file.

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform plan
terraform apply -auto-approve
test -f db_secret.txt && test -f db_bundle.zip && echo "Success! Files exist."
terraform output
terraform destroy -auto-approve
```
