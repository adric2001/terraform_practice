# Exercise 02: Variables and Outputs

## 🎯 Objectives
- Define typed input variables (`string`, `number`, `bool`).
- Provide default values and variable descriptions.
- Use `terraform.tfvars` to supply custom variable values.
- Declare outputs with `description` and `sensitive = true` flags.

## 📖 Key Concepts
- **Input Variables**: Parameters passed to your Terraform module (`variable "<name>" { ... }`).
- **Precedence**: CLI `-var` > `*.auto.tfvars` > `terraform.tfvars` > `TF_VAR_...` env vars > defaults.
- **Outputs**: Return values from applied resources for reference or automation.
- **Sensitive**: Conceals sensitive strings from CLI stdout during plan and apply.

## 📝 Your Task
In `starter/`:
1. In `variables.tf`, declare:
   - `environment`: type `string`, default `"development"`.
   - `app_port`: type `number`, default `8080`.
   - `enable_feature`: type `bool`, default `true`.
   - `db_password`: type `string`, sensitive `true`, no default.
2. In `main.tf`, generate a config file `${path.module}/app_config.env` using `local_file` containing the environment and port.
3. In `outputs.tf`, expose:
   - `app_url`: Formatted as `"http://localhost:${var.app_port}"`.
   - `database_password`: Set `sensitive = true`.
4. Create a `terraform.tfvars` file (based on `terraform.tfvars.example`) providing custom values.

## 🧪 Verification Steps
```bash
cd starter
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform apply -auto-approve
terraform output app_url
terraform output database_password           # Should show <sensitive>
terraform output -raw database_password      # Displays secret value
terraform destroy -auto-approve
```
