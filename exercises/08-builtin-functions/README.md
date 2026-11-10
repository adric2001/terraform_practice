# Exercise 08: Built-in Functions & HCL Expressions

## 🎯 Objectives
- Transform complex data structures using built-in HCL functions (`flatten`, `merge`, `lookup`, `compact`).
- Use ternary expressions: `condition ? true_val : false_val`.
- Build list and map projections with `for` expressions (`[for item in list : ...]` and `{for k, v in map : ...}`).

## 📖 Key Concepts
- **`flatten()`**: Eliminates nested lists into a single flat list.
- **`lookup(map, key, default)`**: Retrieves a value safely with a fallback default.
- **`merge(map1, map2)`**: Combines multiple maps into one.
- **`for` expressions**: Allows transforming collections without external scripts.

## 📝 Your Task
In `starter/`:
1. In `variables.tf`, you have a nested structure of environments and services.
2. In `main.tf`, write a local block that uses `flatten()` and `for` expressions to produce a flattened list of domain endpoints:
   - Pattern: `${service}.${environment}.internal`
3. Generate a combined configuration file `${path.module}/dns_records.txt` with all endpoints.
4. In `outputs.tf`, output the list of generated hostnames and the total count.

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform apply -auto-approve
cat dns_records.txt
terraform output
terraform destroy -auto-approve
```
