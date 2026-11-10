# Exercise 05: Data Sources and External Data

## 🎯 Objectives
- Query external state and existing files using `data` blocks.
- Contrast `data` (read-only) with `resource` (manage lifecycle).
- Parse JSON payloads with `jsondecode()` to drive resource parameters.

## 📖 Key Concepts
- **Data Block**: `data "<TYPE>" "<NAME>" { ... }` allows Terraform to read data from a provider without managing its lifecycle.
- **Parsing Data**: `jsondecode()` converts raw strings into HCL maps and objects.

## 📝 Your Task
In `starter/`:
1. Read the provided `data/system_spec.json` using a `data "local_file" "spec"` block.
2. Decode the JSON string using `jsondecode(data.local_file.spec.content)`.
3. In `main.tf`, generate a file `${path.module}/rendered_manifest.txt` describing the parsed system (name, version, CPU cores, memory GB).
4. In `outputs.tf`, expose the parsed application name and memory limit.

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform apply -auto-approve
cat rendered_manifest.txt
terraform output
terraform destroy -auto-approve
```
