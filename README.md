# 🚀 Terraform Practice Suite: Zero to Production

A comprehensive, hands-on curriculum of **21 progressive practice exercises** designed to take you from foundational HashiCorp Configuration Language (HCL) syntax to advanced enterprise orchestration, state refactoring, declarative imports, and native automated testing.

---

## 🧭 Multi-Repository DevOps Hub Navigation

This repository is part of the **DevOps Practice Ecosystem**. You can jump directly between practice tracks or view the central orchestrator:

- 🌐 **[Central Practice Hub Repo](https://github.com/adric2001/devops_practice)** — The unified dashboard & cross-tool integration guides.
- 📦 **[Ansible Practice Suite](https://github.com/adric2001/ansible_practice)** — 20 exercises mastering configuration management and automation.
- 🏗️ **[Terraform Practice Suite](https://github.com/adric2001/terraform_practice)** — (You are here) 21 exercises mastering Infrastructure as Code.

---

## 📚 Curriculum Roadmap

| # | Tier | Exercise | Key Focus Areas | Status |
| :-: | :---: | :--- | :--- | :---: |
| **01** | 🟢 Beginner | [`01-first-resource`](exercises/01-first-resource) | `terraform` block, providers, `local_file`, `init`, `plan`, `apply`, `destroy` | `[ ]` |
| **02** | 🟢 Beginner | [`02-variables-and-outputs`](exercises/02-variables-and-outputs) | Input variables, basic types (`string`, `number`, `bool`), `outputs`, `sensitive`, `tfvars` | `[ ]` |
| **03** | 🟢 Beginner | [`03-collections-and-types`](exercises/03-collections-and-types) | Collections (`list`, `map`, `set`, `object`, `tuple`), schema constraints, value lookups | `[ ]` |
| **04** | 🟢 Beginner | [`04-resource-dependencies`](exercises/04-resource-dependencies) | Implicit vs explicit dependencies (`depends_on`), DAG, `terraform graph`, race conditions | `[ ]` |
| **05** | 🟢 Beginner | [`05-data-sources`](exercises/05-data-sources) | `data` blocks vs `resource`, read-only state, parsing external JSON with `jsondecode()` | `[ ]` |
| **06** | 🟢 Beginner | [`06-count-and-foreach`](exercises/06-count-and-foreach) | `count` vs `for_each`, state key addressing (`[0]` vs `["key"]`), refactoring lists to sets | `[ ]` |
| **07** | 🟢 Beginner | [`07-lifecycle-rules`](exercises/07-lifecycle-rules) | `create_before_destroy`, `prevent_destroy`, `ignore_changes`, zero-downtime updates | `[ ]` |
| **08** | 🟡 Intermediate | [`08-builtin-functions`](exercises/08-builtin-functions) | `format`, `join`, `lookup`, `merge`, `flatten`, ternary conditionals, `for` expressions | `[ ]` |
| **09** | 🟡 Intermediate | [`09-dynamic-blocks`](exercises/09-dynamic-blocks) | `dynamic` blocks, `for_each` nesting, `iterator`, conditional block generation | `[ ]` |
| **10** | 🟡 Intermediate | [`10-child-modules`](exercises/10-child-modules) | Modularization, child module encapsulation, inputs, outputs, reusability | `[ ]` |
| **11** | 🟡 Intermediate | [`11-workspaces`](exercises/11-workspaces) | `terraform workspace`, environment branching, workspace-driven configuration lookups | `[ ]` |
| **12** | 🟡 Intermediate | [`12-state-manipulation`](exercises/12-state-manipulation) | `terraform state list`, `show`, `mv`, `rm`, disaster recovery & state refactoring | `[ ]` |
| **13** | 🟡 Intermediate | [`13-validations-and-conditions`](exercises/13-validations-and-conditions) | Custom variable `validation`, regex patterns, resource `precondition` & `postcondition` | `[ ]` |
| **14** | 🟡 Intermediate | [`14-terraform-data-and-provisioners`](exercises/14-terraform-data-and-provisioners) | `terraform_data` (modern `null_resource`), `triggers_replace`, `local-exec` provisioners | `[ ]` |
| **15** | 🔴 Advanced | [`15-refactoring-with-moved-blocks`](exercises/15-refactoring-with-moved-blocks) | Declarative `moved` blocks (TF 1.1+), zero-destroy renaming, moving resources to modules | `[ ]` |
| **16** | 🔴 Advanced | [`16-declarative-import`](exercises/16-declarative-import) | Declarative `import` blocks (TF 1.5+), importing unmanaged infrastructure into state | `[ ]` |
| **17** | 🔴 Advanced | [`17-remote-backends-and-locking`](exercises/17-remote-backends-and-locking) | Remote backend configuration, state migration (`-migrate-state`), state locking semantics | `[ ]` |
| **18** | 🔴 Advanced | [`18-multi-provider-aliasing`](exercises/18-multi-provider-aliasing) | Provider `alias`, passing provider instances to child modules, multi-region patterns | `[ ]` |
| **19** | 🔴 Advanced | [`19-testing-framework-tftest`](exercises/19-testing-framework-tftest) | Native testing framework (`terraform test`), `.tftest.hcl`, unit and integration testing | `[ ]` |
| **20** | 🔴 Advanced | [`20-secrets-and-sensitive-data`](exercises/20-secrets-and-sensitive-data) | Sensitive values masking, `nonsensitive()`, key generation, state hygiene & security | `[ ]` |
| **21** | 🔴 Advanced | [`21-capstone-production-system`](exercises/21-capstone-production-system) | Enterprise multi-tier system: modules, checks, dynamic blocks, tests, lifecycles | `[ ]` |

---

## 🛠️ How to Practice

Every exercise is self-contained and organized into two folders:
- **`starter/`**: Your work area! Contains skeleton HCL files with `TODO` markers and instructions.
- **`solution/`**: Complete reference implementation. If you get stuck or want to compare architectural approaches, check here.

### Standard Practice Workflow
1. Choose an exercise:
   ```bash
   cd exercises/01-first-resource/starter
   ```
2. Read the exercise's `README.md` for requirements, background, and hints.
3. Open the `.tf` files in `starter/` and implement the requested configuration.
4. Test your configuration:
   ```bash
   terraform init
   terraform fmt -check
   terraform validate
   terraform plan
   terraform apply
   ```
5. Verify the generated resources, files, and outputs.
6. Clean up:
   ```bash
   terraform destroy -auto-approve
   ```
7. Compare your solution with the `solution/` directory.

---

## 💡 Zero Cloud Bill Guarantee

All exercises in this repository use local, archive, random, TLS, and native terraform providers (`hashicorp/local`, `hashicorp/random`, `hashicorp/archive`, `hashicorp/tls`, and built-in `terraform_data`).
You do **NOT** need an active AWS, GCP, or Azure account to run, test, and master these 21 exercises!

---

## 🧪 Automated Validation Script

To verify that all solutions and starter templates conform to valid HCL syntax:
```bash
chmod +x verify_all.sh
./verify_all.sh
```

---

## 📑 Cheat Sheet

A comprehensive quick-reference for everyday Terraform operations is available in [`CHEAT_SHEET.md`](CHEAT_SHEET.md).
