# Exercise 09: Dynamic Blocks

## 🎯 Objectives
- Understand the syntax and purpose of `dynamic` blocks.
- Generate repeating nested blocks conditionally and cleanly.
- Use `iterator` and access values using `iterator.value`.

## 📖 Key Concepts
- In Terraform, some resources have nested configuration blocks (like `ingress`, `egress`, or `setting`).
- A `dynamic` block acts like a `for_each` loop specifically for repeating nested configuration blocks inside a single resource.

## 📝 Your Task
In this exercise, we simulate a firewall/security configuration generator.
In `starter/`:
1. In `variables.tf`, define `firewall_rules`: a map of rules with port, protocol, and cidrs.
2. In `main.tf`, create a `local_file` named `firewall_ruleset` that renders an XML/HCL-style ruleset block by iterating dynamically over the rules.
3. In `outputs.tf`, expose the list of evaluated rule names.

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform apply -auto-approve
cat firewall.conf
terraform output
terraform destroy -auto-approve
```
