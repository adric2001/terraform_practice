# Exercise 06: `count` vs `for_each`

## 🎯 Objectives
- Understand the distinct behavior of `count` and `for_each`.
- Learn why modifying a `count` list causes destructive index shifts.
- Master `for_each` with sets (`toset()`) and maps.
- Access instance keys with `each.key` and `each.value`.

## 📖 Key Concepts
- **`count`**: Creates instances indexed by number (`[0]`, `[1]`). Removing an item from the middle causes re-creation of all downstream instances!
- **`for_each`**: Creates instances keyed by distinct string keys (`["web"]`, `["db"]`). Additions and removals only affect the specific resource key.

## 📝 Your Task
In `starter/`:
1. In `variables.tf`, you have `server_names` (list) and `service_roles` (map).
2. Create resources using `for_each`:
   - `local_file.servers`: Iterates over `toset(var.server_names)` creating `${path.module}/servers/${each.key}.txt`.
   - `local_file.roles`: Iterates over `var.service_roles` creating `${path.module}/roles/${each.key}.conf` with content `"Role: ${each.key} | Port: ${each.value}"`.
3. In `outputs.tf`, produce maps of created filenames and ports.

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform plan
terraform apply -auto-approve
ls -l servers/ roles/
terraform output
terraform destroy -auto-approve
```
