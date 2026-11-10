# Exercise 03: Collections and Structural Types

## 🎯 Objectives
- Master complex Terraform types: `list`, `map`, `set`, and `object({ ... })`.
- Access values via index (`var.list[0]`) and key (`var.map["key"]`).
- Render structural objects into formatted configuration files.

## 📖 Key Concepts
- **List**: An ordered sequence of values (`list(string)`).
- **Map**: A key-value table where all values are the same type (`map(string)`).
- **Set**: An unordered collection of unique values (`set(string)`).
- **Object**: A structural type holding named attributes of differing types.

## 📝 Your Task
In `starter/`:
1. In `variables.tf`, define:
   - `allowed_ips`: `list(string)` of CIDRs.
   - `server_metadata`: `map(string)` containing owner, cost-center, project.
   - `service_definition`: `object({ name = string, port = number, enabled = bool, tags = list(string) })`.
2. In `main.tf`, generate a JSON configuration file `${path.module}/service.json` using `jsonencode()` with the service definition and metadata.
3. In `outputs.tf`, output the primary IP (first element of `allowed_ips`) and the service name.

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform apply -auto-approve
cat service.json
terraform output
terraform destroy -auto-approve
```
