# Exercise 20: Secrets Management & State Hygiene

## 🎯 Objectives
- Generate cryptographic keys and passwords using `hashicorp/tls` and `hashicorp/random`.
- Mask sensitive data in plans, logs, and outputs using `sensitive = true`.
- Use `nonsensitive()` prudently when non-sensitive digests are needed.
- Protect state files from leaking into Git.

## 📖 Key Concepts
- **`sensitive = true`**: Prevents values from being printed in plan/apply terminal output.
- **State Security**: Sensitive values are STILL stored in plaintext inside `terraform.tfstate`! Therefore, remote backends must be encrypted at rest and state files must NEVER be committed to Git.
- **`nonsensitive()`**: Converts a sensitive value to non-sensitive (e.g. hashing a secret).

## 📝 Your Task
In `starter/`:
1. Generate an RSA private key using `tls_private_key`.
2. Generate a secure random database password using `random_password`.
3. In `main.tf`, write a credentials manifest to a protected local file (`file_permission = "0600"`).
4. In `outputs.tf`:
   - Output `public_key_openssh` (non-sensitive).
   - Output `db_password` marked `sensitive = true`.
   - Output `password_sha256` using `sha256(nonsensitive(random_password.db_secret.result))`.

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform apply -auto-approve
terraform output
# Observe that db_password is masked as <sensitive> while public key is printed
terraform destroy -auto-approve
```
