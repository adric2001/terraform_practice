# 📑 Terraform Cheat Sheet & Quick Reference

## 🚀 Everyday CLI Workflow
```bash
terraform init                  # Initialize backend and provider plugins
terraform init -upgrade         # Upgrade provider plugins to latest allowed version
terraform fmt -recursive        # Format all configuration files recursively
terraform validate              # Check configuration syntax and consistency
terraform plan                  # Generate execution plan
terraform plan -out=tfplan      # Save binary execution plan
terraform apply tfplan          # Apply pre-calculated plan without prompting
terraform apply -auto-approve   # Apply changes without interactive confirmation
terraform destroy -auto-approve # Destroy all managed infrastructure
terraform refresh               # Sync state with real-world infrastructure
```

---

## 🔍 State Management (`terraform state`)
```bash
terraform state list                     # List all resources in current state
terraform state show <addr>              # Display detailed attributes of a resource
terraform state mv <source> <dest>       # Rename or move a resource address in state
terraform state rm <addr>                # Remove resource from state without destroying it
terraform state pull > state.json        # Pull raw JSON state to stdout
terraform state push state.json          # Push JSON state back (dangerous!)
```

---

## 🗂️ Workspaces (`terraform workspace`)
```bash
terraform workspace list                 # List all existing workspaces
terraform workspace show                 # Print name of current workspace
terraform workspace new <name>           # Create and switch to a new workspace
terraform workspace select <name>        # Switch to an existing workspace
terraform workspace delete <name>        # Delete a workspace (must be empty)
```

---

## 🧪 Testing & Diagnostics
```bash
terraform test                           # Run native .tftest.hcl test suites
terraform test -verbose                  # Run tests with detailed log output
terraform graph | dot -Tpng > graph.png  # Generate visual dependency graph (requires graphviz)
terraform console                        # Open interactive HCL expression console
```

---

## 🧱 HCL Syntax Quick Reference

### Input Variable with Custom Validation
```hcl
variable "environment" {
  type        = string
  description = "Target deployment tier"
  default     = "dev"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}
```

### Preconditions and Postconditions
```hcl
resource "local_file" "config" {
  filename = "${path.module}/app.conf"
  content  = "cluster_size=${var.cluster_size}"

  lifecycle {
    precondition {
      condition     = var.cluster_size > 0
      error_message = "cluster_size must be positive."
    }
    postcondition {
      condition     = length(self.content) > 0
      error_message = "Rendered config file cannot be empty."
    }
  }
}
```

### Declarative `moved` Block (TF 1.1+)
```hcl
moved {
  from = local_file.legacy_name
  to   = local_file.modern_name
}
```

### Declarative `import` Block (TF 1.5+)
```hcl
import {
  to = local_file.existing_asset
  id = "/path/to/existing/file.txt"
}
```

### Dynamic Blocks
```hcl
dynamic "rule" {
  for_each = var.firewall_rules
  iterator = item
  content {
    port     = item.value.port
    protocol = item.value.protocol
  }
}
```

---

## ⚙️ Essential Built-in Functions

| Function | Example | Description |
| :--- | :--- | :--- |
| `lookup` | `lookup(map, "key", "default")` | Safe map lookup with fallback |
| `merge` | `merge(map1, map2)` | Merge multiple maps |
| `flatten` | `flatten([["a", "b"], ["c"]])` | Flattens nested lists into single list |
| `contains` | `contains(["a", "b"], "a")` | Returns true if list contains value |
| `cidrsubnet` | `cidrsubnet("10.0.0.0/16", 8, 1)` | Calculates subnet CIDR (10.0.1.0/24) |
| `jsonencode` | `jsonencode({ key = "val" })` | Encodes HCL object into JSON string |
| `jsondecode` | `jsondecode(file("app.json"))` | Decodes JSON string into HCL object |
| `can` | `can(regex("^[a-z]+$", var.str))` | Returns true if expression does not fail |
