# Exercise 16: Declarative Import (Terraform 1.5+)

## 🎯 Objectives
- Import existing unmanaged infrastructure into Terraform state declaratively.
- Use the modern `import` block (`to = ...`, `id = ...`).
- Generate HCL code automatically using `terraform plan -generate-config-out`.

## 📖 Key Concepts
- Prior to Terraform 1.5, importing required running imperative CLI commands like `terraform import aws_s3_bucket.my_bucket bucket-id` and manually writing matching HCL.
- Modern Terraform provides declarative `import` blocks:
  ```hcl
  import {
    to = local_file.legacy_asset
    id = "/path/to/existing/file"
  }
  ```
- If HCL definition is missing, Terraform can synthesize it into a target file!

## 📝 Your Task
In `starter/`:
1. An unmanaged file exists at `existing_assets/legacy_system.txt`.
2. In `imports.tf`, define an `import` block targeting `local_file.legacy_system`.
3. In `main.tf`, write the matching `resource "local_file" "legacy_system"` block.
4. Run `terraform plan` to observe the import operation being planned.
5. Run `terraform apply -auto-approve` to bring the asset into state.

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform plan
terraform apply -auto-approve
terraform state list
terraform destroy -auto-approve
```
