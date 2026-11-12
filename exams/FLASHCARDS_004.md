# 🃏 HashiCorp Terraform Associate (004) Flashcards

> **50 Rapid-Fire, High-Yield Flashcards for Final Exam Cramming**  
> Test your recall on the most heavily-tested concepts, CLI flags, variable precedence rules, and 004-specific updates (TF 1.4 – 1.8+).

---

### Category 1: Core IaC Concepts & Architecture

#### Card 1: Imperative vs. Declarative
**Question:** What is the difference between imperative and declarative Infrastructure as Code, and which model does Terraform use?  
<details>
<summary><b>Reveal Answer</b></summary>

- **Declarative (Terraform):** You define the **desired end-state** ("I want 3 VMs and a VPC"), and Terraform calculates the delta and steps needed to achieve that state.
- **Imperative (e.g., Bash scripts, Ansible playbook procedural steps):** You specify the explicit step-by-step commands or instructions to create the infrastructure.
</details>

---

#### Card 2: Idempotency
**Question:** What does idempotency mean in the context of Terraform?  
<details>
<summary><b>Reveal Answer</b></summary>

Executing `terraform apply` multiple times with the same configuration produces the same result without making unintended side-effects or duplicate resources. If no configuration or real-world drift has occurred, subsequent applies make zero changes.
</details>

---

#### Card 3: Day 1 vs. Day 2 Operations
**Question:** Provide examples of Day 1 vs. Day 2 operations managed by Terraform.  
<details>
<summary><b>Reveal Answer</b></summary>

- **Day 1 Operations:** Initial provisioning, bootstrapping infrastructure, network creation, initial server deployment.
- **Day 2 Operations:** Maintenance, resizing instances, updating firewall rules, rolling updates, refactoring, and eventual decommission/destruction.
</details>

---

#### Card 4: Terraform Core vs. Terraform Plugins (Providers)
**Question:** What is the architectural relationship between Terraform Core and Terraform Providers?  
<details>
<summary><b>Reveal Answer</b></summary>

- **Terraform Core:** An open-source Go binary that parses configuration files (HCL), manages the state file, builds the Directed Acyclic Graph (DAG), and orchestrates execution.
- **Terraform Providers:** Separate gRPC plugins executed as independent processes that translate Core's CRUD requests into API calls for cloud providers (AWS, Azure, GCP, Kubernetes, etc.).
</details>

---

### Category 2: CLI Workflow & Commands

#### Card 5: Core Workflow Order
**Question:** What are the four core steps of the standard Terraform CLI workflow?  
<details>
<summary><b>Reveal Answer</b></summary>

1. **`terraform init`** (Initialize working directory, download providers and modules)
2. **`terraform validate`** (Verify syntax and internal consistency)
3. **`terraform plan`** (Generate and inspect execution plan)
4. **`terraform apply`** (Execute changes to reach desired state)
</details>

---

#### Card 6: `terraform init` Actions
**Question:** What 3 major tasks are performed when running `terraform init`?  
<details>
<summary><b>Reveal Answer</b></summary>

1. Downloads and installs provider plugins into `.terraform/providers/`.
2. Downloads external child modules referenced in the root module into `.terraform/modules/`.
3. Configures and initializes the backend (local or remote state storage).
*(Note: It also reads or creates the dependency lock file `.terraform.lock.hcl`.)*
</details>

---

#### Card 7: Upgrading Provider Locks
**Question:** Which flag must be used with `terraform init` to upgrade provider versions within the constraints allowed by configuration?  
<details>
<summary><b>Reveal Answer</b></summary>

`terraform init -upgrade`
</details>

---

#### Card 8: Formatting Command
**Question:** Which command formats configuration files to HashiCorp standard conventions, and which flag processes subdirectories recursively?  
<details>
<summary><b>Reveal Answer</b></summary>

`terraform fmt -recursive`
</details>

---

#### Card 9: `terraform validate` Scope
**Question:** Does `terraform validate` authenticate against cloud APIs to verify resource existence (e.g., verifying an AMI ID exists in AWS)?  
<details>
<summary><b>Reveal Answer</b></summary>

**No.** `terraform validate` only checks HCL syntax and internal consistency (e.g., matching attribute types, valid attribute names). It does **not** make remote API calls or check credentials.
</details>

---

#### Card 10: Saving & Applying Plans
**Question:** How do you guarantee that the exact plan reviewed is the plan executed in an automated pipeline?  
<details>
<summary><b>Reveal Answer</b></summary>

Save the plan to a binary file during planning, then pass it to apply:
```bash
terraform plan -out=tfplan
terraform apply tfplan
```
*(When a saved plan file is provided, `terraform apply` does not prompt for confirmation or re-read state.)*
</details>

---

#### Card 11: Replacing a Resource (004 Exam Update)
**Question:** What is the recommended modern way to force recreation of a specific resource during `terraform apply`, replacing the deprecated `terraform taint`?  
<details>
<summary><b>Reveal Answer</b></summary>

Use the `-replace` flag with `terraform apply` or `terraform plan`:
```bash
terraform apply -replace="aws_instance.web"
```
*(Note: `terraform taint` is deprecated since Terraform 0.15.2.)*
</details>

---

#### Card 12: Refresh Only (004 Exam Update)
**Question:** What is the modern replacement for the deprecated standalone `terraform refresh` command?  
<details>
<summary><b>Reveal Answer</b></summary>

Use:
```bash
terraform apply -refresh-only
```
or `terraform plan -refresh-only`. This inspects state drift against real infrastructure interactively before committing changes.
</details>

---

#### Card 13: Targeting Specific Resources
**Question:** Which flag isolates changes to a single resource or module, and why is HashiCorp cautious about its use in production?  
<details>
<summary><b>Reveal Answer</b></summary>

`-target=resource_type.name` (e.g., `terraform apply -target="aws_instance.web"`).  
**Caution:** It bypasses standard dependency resolution and can lead to undeclared drift or broken state dependencies.
</details>

---

### Category 3: State Management & Backends

#### Card 14: Purpose of Terraform State
**Question:** Why does Terraform require a state file (`terraform.tfstate`)?  
<details>
<summary><b>Reveal Answer</b></summary>

1. Maps configuration declarations to real-world infrastructure resource IDs.
2. Tracks metadata such as resource dependencies for proper ordering.
3. Caches resource attributes to optimize performance on large deployments.
4. Detects drift between declared configuration and actual cloud resources.
</details>

---

#### Card 15: State Locking
**Question:** Why is backend state locking essential in team environments?  
<details>
<summary><b>Reveal Answer</b></summary>

It prevents concurrent `terraform apply` or plan executions from corrupting the state file. If a backend supports locking (e.g., AWS S3 + DynamoDB, Terraform Cloud, Azure Blob Storage, GCS), Terraform acquires a mutex lock during write operations.
</details>

---

#### Card 16: Safe Resource Renaming Without Destroying
**Question:** If you rename `aws_instance.old_name` to `aws_instance.new_name` in HCL, what command moves the state without recreating the physical VM?  
<details>
<summary><b>Reveal Answer</b></summary>

`terraform state mv aws_instance.old_name aws_instance.new_name`  
*(Or preferably in Terraform 1.1+, declare a `moved { from = ... to = ... }` block in HCL!)*
</details>

---

#### Card 17: Removing Resources from State Without Destroying
**Question:** How can you tell Terraform to stop managing a resource without physically destroying it in the cloud?  
<details>
<summary><b>Reveal Answer</b></summary>

`terraform state rm <resource_address>`  
(e.g., `terraform state rm aws_s3_bucket.data_vault`). The real bucket remains untouched in AWS, but is purged from state.
</details>

---

#### Card 18: Inspecting State Contents
**Question:** Which two CLI commands allow you to safely inspect resources currently recorded in the state file?  
<details>
<summary><b>Reveal Answer</b></summary>

1. `terraform state list` (lists all resource addresses in state)
2. `terraform state show <address>` (prints detailed attributes for that specific resource)
</details>

---

#### Card 19: Sensitive Data in State
**Question:** Does marking a variable with `sensitive = true` prevent its value from being written in plain text to `terraform.tfstate`?  
<details>
<summary><b>Reveal Answer</b></summary>

**NO.** `sensitive = true` only masks the value from CLI logs, console output, and plan output. The value is **still stored in plain text inside `terraform.tfstate`**. State files must be protected via encrypted backends and strict RBAC.
</details>

---

### Category 4: Variables, Outputs & Precedence

#### Card 20: Variable Definition Precedence Order
**Question:** Rank variable definition sources from HIGHEST (wins) to LOWEST priority.  
<details>
<summary><b>Reveal Answer</b></summary>

1. **CLI `-var` or `-var-file`** (Highest)
2. **`*.auto.tfvars` or `*.auto.tfvars.json`** (processed alphabetically)
3. **`terraform.tfvars.json`**
4. **`terraform.tfvars`**
5. **Environment variables: `TF_VAR_<name>`**
6. **Default value** in `variable {}` block (Lowest)
</details>

---

#### Card 21: Auto-Loaded Variable Files
**Question:** Which variable filenames are automatically loaded by Terraform without requiring `-var-file`?  
<details>
<summary><b>Reveal Answer</b></summary>

- `terraform.tfvars`
- `terraform.tfvars.json`
- Any file ending in `.auto.tfvars` (e.g., `prod.auto.tfvars`)
- Any file ending in `.auto.tfvars.json`
</details>

---

#### Card 22: Custom Variable Validation
**Question:** What two arguments are required inside a `validation` block within a `variable` declaration?  
<details>
<summary><b>Reveal Answer</b></summary>

- `condition`: A boolean expression defining valid input.
- `error_message`: A descriptive string returned to the user if `condition` evaluates to `false`.
</details>

---

#### Card 23: Accessing Child Module Outputs
**Question:** How does a root module access an output named `vpc_id` declared in a child module called `network`?  
<details>
<summary><b>Reveal Answer</b></summary>

`module.network.vpc_id`
</details>

---

#### Card 24: Suppressing Output Display
**Question:** If an output contains a database password, what attribute inside `output` prevents it from being displayed during `terraform apply`?  
<details>
<summary><b>Reveal Answer</b></summary>

`sensitive = true`
```hcl
output "db_password" {
  value     = aws_db_instance.main.password
  sensitive = true
}
```
</details>

---

### Category 5: HCL Syntax, Meta-Arguments & Functions

#### Card 25: `count` vs. `for_each`
**Question:** Why is `for_each` preferred over `count` when managing a collection of independent resources (e.g., users or subnets)?  
<details>
<summary><b>Reveal Answer</b></summary>

- `count` indexes resources by integer (`[0]`, `[1]`, `[2]`). If an item in the middle of a list is deleted, all subsequent resources are re-indexed, causing unnecessary destruction and recreation.
- `for_each` indexes resources by distinct map keys or set strings (`["alice"]`, `["bob"]`), making additions and deletions safe without touching other resources.
</details>

#### Card 26: `each.key` and `each.value`
**Question:** When using `for_each` over a map, what do `each.key` and `each.value` represent?  
<details>
<summary><b>Reveal Answer</b></summary>

- `each.key`: The key of the map entry (e.g., `"web"`, `"app"`).
- `each.value`: The value of the map entry (can be a string, number, or complex object).
</details>

---

#### Card 27: Dynamic Blocks
**Question:** When should you use a `dynamic` block in Terraform configuration?  
<details>
<summary><b>Reveal Answer</b></summary>

When you need to generate repeatable nested configuration blocks (such as multiple `ingress` rules in a security group or `tag` blocks) based on a list, set, or map variable.
</details>

---

#### Card 28: Splat Expression `[*]`
**Question:** If `aws_instance.web` uses `count = 3`, how do you extract all private IPs into a single list using a splat expression?  
<details>
<summary><b>Reveal Answer</b></summary>

`aws_instance.web[*].private_ip`
</details>

---

#### Card 29: Built-in Functions: `lookup()`
**Question:** What does `lookup(map, key, default)` do, and what happens if `key` does not exist?  
<details>
<summary><b>Reveal Answer</b></summary>

It retrieves the value of `key` from `map`. If the key does not exist, it safely returns `default` instead of throwing an error.
</details>

---

#### Card 30: Built-in Functions: `merge()`
**Question:** What is the output of `merge({ a = 1, b = 2 }, { b = 99, c = 3 })`?  
<details>
<summary><b>Reveal Answer</b></summary>

`{ a = 1, b = 99, c = 3 }`  
*(Keys in later maps overwrite keys in earlier maps.)*
</details>

---

#### Card 31: `depends_on` Meta-Argument
**Question:** When should `depends_on` be declared explicitly on a resource or module?  
<details>
<summary><b>Reveal Answer</b></summary>

Only when a hidden dependency exists that Terraform cannot infer automatically from attribute interpolation (e.g., an IAM role policy assignment that an EC2 instance depends on to pull from S3).
</details>

---

#### Card 32: `lifecycle` Block Options
**Question:** Name 4 key arguments that can be set within a resource `lifecycle` block.  
<details>
<summary><b>Reveal Answer</b></summary>

1. `create_before_destroy = true` (zero-downtime recreation)
2. `prevent_destroy = true` (safety lock against accidental deletion)
3. `ignore_changes = [tags, ami]` (ignores out-of-band updates)
4. `replace_triggered_by = [aws_security_group.main.id]` (forces recreation when another resource changes)
</details>

---

### Category 6: Modules & Dependency Lock File

#### Card 33: Standard Module Registry Source Syntax
**Question:** What is the syntax for pulling a module from the public Terraform Registry?  
<details>
<summary><b>Reveal Answer</b></summary>

`source = "<NAMESPACE>/<NAME>/<PROVIDER>"`  
Example: `source = "terraform-aws-modules/vpc/aws"`
</details>

---

#### Card 34: Module Versioning
**Question:** Can you specify the `version` argument for local child modules (e.g., `source = "./modules/vpc"`)?  
<details>
<summary><b>Reveal Answer</b></summary>

**No.** The `version` argument is only supported for registry-based modules. Local modules inherit their version directly from the local filesystem or git repository branch/tag.
</details>

---

#### Card 35: The `.terraform.lock.hcl` File
**Question:** What does `.terraform.lock.hcl` record, and should it be committed to version control?  
<details>
<summary><b>Reveal Answer</b></summary>

It records the exact versions and cryptographically hashed checksums of all **provider plugins** used in the configuration.  
**Yes**, it should always be committed to Git to ensure deterministic provider downloads across the entire team and CI/CD pipelines.
</details>

---

### Category 7: Terraform 004 Modern Features (TF 1.4 – 1.8+)

#### Card 36: Declarative `import` Blocks (TF 1.5+)
**Question:** How does Terraform 1.5+ support declarative resource importing in code without running `terraform import` on the CLI?  
<details>
<summary><b>Reveal Answer</b></summary>

Using an `import` block:
```hcl
import {
  to = aws_s3_bucket.legacy
  id = "my-existing-bucket-name"
}
```
During `terraform plan`, Terraform detects the import and can even generate the configuration using `terraform plan -generate-config-out=generated.tf`.
</details>

---

#### Card 37: Declarative `moved` Blocks (TF 1.1+)
**Question:** What is the purpose of the `moved` block?  
<details>
<summary><b>Reveal Answer</b></summary>

It records resource address changes or refactoring directly in HCL code so that team members running `terraform apply` have their state updated automatically without recreating physical resources or manually running `terraform state mv`:
```hcl
moved {
  from = aws_instance.web
  to   = aws_instance.frontend
}
```
</details>

---

#### Card 38: Native Terraform Testing (TF 1.6+)
**Question:** What file extension is used for native Terraform integration tests, and what CLI command runs them?  
<details>
<summary><b>Reveal Answer</b></summary>

- File extension: `*.tftest.hcl` (e.g., `tests/website.tftest.hcl`)
- CLI command: `terraform test`
- Contains `run` blocks with `command = plan` or `command = apply` and `assert` blocks.
</details>

---

#### Card 39: Continuous Validation with `check` Blocks (TF 1.5+)
**Question:** What is the behavior of a `check` block containing an assertion that evaluates to `false`?  
<details>
<summary><b>Reveal Answer</b></summary>

It outputs a **warning** during `terraform plan` and `terraform apply`, but **does NOT block execution or fail the apply**. It is intended for non-blocking health and drift checks.
</details>

---

#### Card 40: Preconditions and Postconditions
**Question:** What happens if a `precondition` or `postcondition` inside a `lifecycle` block fails?  
<details>
<summary><b>Reveal Answer</b></summary>

Unlike `check` blocks, failing a `precondition` or `postcondition` **immediately halts execution with an error**, preventing invalid infrastructure state from being provisioned.
</details>

---

#### Card 41: `terraform_data` vs. `null_resource`
**Question:** What built-in resource in Terraform 1.4+ replaces the need for `null_resource` from the external `hashicorp/null` provider?  
<details>
<summary><b>Reveal Answer</b></summary>

`terraform_data`. It is built directly into Terraform Core, requires no external provider download, stores arbitrary values in state, and supports `triggers_replace`.
</details>

---

### Category 8: Terraform Workspaces & CLI Features

#### Card 42: Terraform CLI Workspaces
**Question:** What do CLI workspaces isolate, and when should you avoid using them for production isolation?  
<details>
<summary><b>Reveal Answer</b></summary>

CLI workspaces isolate **state files** within the same backend directory (e.g., `default`, `staging`, `prod`).  
**Caveat:** They share the exact same configuration code and credentials. HashiCorp recommends using separate directories or Terraform Cloud Workspaces for production environments needing strong role separation and distinct credentials.
</details>

---

#### Card 43: Workspace Commands
**Question:** What commands list all workspaces, create a new one called `dev`, and switch to it?  
<details>
<summary><b>Reveal Answer</b></summary>

1. List: `terraform workspace list`
2. Create & switch: `terraform workspace new dev`
3. Switch: `terraform workspace select dev`
</details>

---

#### Card 44: Debug Logging Environment Variables
**Question:** Which environment variables enable verbose debug logging and specify a file destination for the logs?  
<details>
<summary><b>Reveal Answer</b></summary>

- `TF_LOG=DEBUG` (or `TRACE`, `INFO`, `WARN`, `ERROR`)
- `TF_LOG_PATH=/path/to/terraform.log`
</details>

---

#### Card 45: Interactive Console
**Question:** Which command provides an interactive read-eval-print loop (REPL) for evaluating HCL expressions and built-in functions against existing state?  
<details>
<summary><b>Reveal Answer</b></summary>

`terraform console`
</details>

---

### Category 9: Terraform Cloud & Enterprise

#### Card 46: Terraform Cloud Run Modes
**Question:** What are the three run execution modes available in Terraform Cloud workspaces?  
<details>
<summary><b>Reveal Answer</b></summary>

1. **Remote:** Execution occurs within Terraform Cloud virtual machines (managed runner).
2. **Local:** Execution occurs on the developer's local CLI, using Terraform Cloud solely for remote state storage.
3. **Agent:** Execution occurs on self-hosted Terraform Cloud Agents deployed inside private networks.
</details>

---

#### Card 47: Policy as Code: Sentinel vs. OPA
**Question:** Which two Policy as Code frameworks are supported in Terraform Cloud to enforce governance rules before provisioning?  
<details>
<summary><b>Reveal Answer</b></summary>

1. **HashiCorp Sentinel** (proprietary policy language with `soft-mandatory`, `hard-mandatory`, and `advisory` levels).
2. **Open Policy Agent (OPA)** (industry standard using the Rego query language).
</details>

---

#### Card 48: Workspace Variables in Terraform Cloud
**Question:** What are the two distinct types of variables configured in a Terraform Cloud workspace?  
<details>
<summary><b>Reveal Answer</b></summary>

1. **Terraform Variables:** Passed as inputs to your HCL `variable` declarations (equivalent to `*.tfvars`).
2. **Environment Variables:** Set as shell environment variables during the run (e.g., `AWS_ACCESS_KEY_ID`, `ARM_CLIENT_SECRET`, `TF_CLI_ARGS`).
</details>

---

#### Card 49: Remote State Data Source
**Question:** What data source is used to securely read output values exported from a different Terraform project's remote state?  
<details>
<summary><b>Reveal Answer</b></summary>

`terraform_remote_state`:
```hcl
data "terraform_remote_state" "vpc" {
  backend = "s3"
  config = {
    bucket = "company-tfstate"
    key    = "network/terraform.tfstate"
    region = "us-east-1"
  }
}
```
</details>

---

#### Card 50: Private Module Registry
**Question:** What is the naming convention for a module published in a Terraform Cloud/Enterprise Private Module Registry?  
<details>
<summary><b>Reveal Answer</b></summary>

`<ORGANIZATION>/<NAME>/<PROVIDER>`  
Example: `app.terraform.io/my-org/vpc/aws`
</details>
