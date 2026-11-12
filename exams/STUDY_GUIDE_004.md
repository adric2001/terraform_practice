# 🎓 HashiCorp Certified: Terraform Associate (004) Comprehensive Study Guide

This study guide provides an authoritative preparation roadmap for the **HashiCorp Certified: Terraform Associate (004)** examination. It aligns the official exam blueprint with hands-on practice labs and highlights high-yield exam traps.

---

## 📋 Exam Overview & Blueprint (Version 004)

* **Exam Title:** HashiCorp Certified: Terraform Associate (004)
* **Format:** Multiple Choice & Multiple Select
* **Duration:** 60 Minutes
* **Total Questions:** ~57 Questions
* **Passing Score:** ~70%
* **Prerequisites:** None (basic cloud and terminal fundamentals recommended)

### Official Domain Weightings & Mapping to Repository Labs:

| Domain | Exam Domain Title | Weight | Target Mastery Labs |
| :---: | :--- | :---: | :--- |
| **1** | **Understand Infrastructure as Code (IaC) Concepts** | ~10% | [`01-first-resource`](../exercises/01-first-resource), [`07-lifecycle-rules`](../exercises/07-lifecycle-rules) |
| **2** | **Understand the Purpose of Terraform (vs Alternatives)** | ~8% | [`01-first-resource`](../exercises/01-first-resource), [DevOps Practice Hub](https://github.com/adric2001/devops_practice) |
| **3** | **Understand Terraform Basics** | ~12% | [`01-first-resource`](../exercises/01-first-resource), [`02-variables-and-outputs`](../exercises/02-variables-and-outputs) |
| **4** | **Use Terraform Outside the Core Workflow** | ~14% | [`12-state-manipulation`](../exercises/12-state-manipulation), [`16-declarative-import`](../exercises/16-declarative-import), [`19-testing-framework-tftest`](../exercises/19-testing-framework-tftest) |
| **5** | **Interact with Terraform Modules** | ~12% | [`10-child-modules`](../exercises/10-child-modules), [`18-multi-provider-aliasing`](../exercises/18-multi-provider-aliasing) |
| **6** | **Use the Core Terraform Workflow** | ~14% | [`01-first-resource`](../exercises/01-first-resource), [`04-resource-dependencies`](../exercises/04-resource-dependencies) |
| **7** | **Implement and Maintain State** | ~14% | [`11-workspaces`](../exercises/11-workspaces), [`12-state-manipulation`](../exercises/12-state-manipulation), [`17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking) |
| **8** | **Read, Generate, and Modify Configuration** | ~16% | [`03-collections-and-types`](../exercises/03-collections-and-types), [`06-count-and-foreach`](../exercises/06-count-and-foreach), [`08-builtin-functions`](../exercises/08-builtin-functions), [`09-dynamic-blocks`](../exercises/09-dynamic-blocks), [`13-validations-and-conditions`](../exercises/13-validations-and-conditions), [`14-terraform-data-and-provisioners`](../exercises/14-terraform-data-and-provisioners), [`15-refactoring-with-moved-blocks`](../exercises/15-refactoring-with-moved-blocks) |
| **9** | **Understand Terraform Cloud/Enterprise Capabilities** | ~10% | [`20-secrets-and-sensitive-data`](../exercises/20-secrets-and-sensitive-data), [`21-capstone-production-system`](../exercises/21-capstone-production-system) |

---

## ⚡ What's NEW in Exam 004 (vs Legacy 003)

The 004 exam focuses on modern features introduced in Terraform 1.4 through 1.8+:

1. **Declarative `import` Blocks (TF 1.5+):**
   * Legacy: Required running imperative CLI `terraform import <ADDR> <ID>` and writing matching HCL by hand.
   * Modern 004: Written directly in HCL: `import { to = local_file.asset id = "/path" }`. Generates code automatically via `terraform plan -generate-config-out=generated.tf`.
2. **Declarative `moved` Blocks (TF 1.1+):**
   * Eliminates the need for risky manual `terraform state mv` in CI pipelines.
   * Syntax: `moved { from = aws_instance.web to = aws_instance.servers["web"] }`.
3. **Native Testing Framework (`terraform test` - TF 1.6+):**
   * Replaces external Go/Terratest harnesses with native `.tftest.hcl` files.
   * Supports `command = plan` (unit tests) and `command = apply` (integration tests) with `assert` blocks and mock providers.
4. **Continuous Validation with `check` Blocks (TF 1.5+):**
   * Non-blocking assertions for infrastructure health. Unlike preconditions, failing a `check` block outputs warnings without halting plans.
5. **`terraform_data` (TF 1.4+):**
   * Core built-in resource replacing `null_resource` from `hashicorp/null`. Supports `triggers_replace` and requires no provider download.
6. **Deprecations to Watch Out For:**
   * `terraform taint` is deprecated &rarr; Use `terraform apply -replace="<ADDR>"`.
   * Standalone `terraform refresh` is discouraged &rarr; Use `terraform apply -refresh-only`.

---

## ⚠️ Top 10 High-Yield Exam Traps & Gotchas

1. **The State Secrets Trap:**
   * *Trap:* "Marking an input variable `sensitive = true` encrypts it in `terraform.tfstate`."
   * *Truth:* **FALSE!** The `sensitive` flag ONLY masks the value in CLI stdout and plan output. The plaintext secret is STILL stored in the unencrypted state JSON file. State must be protected using backend encryption (e.g. S3 KMS) and strict IAM.
2. **`create_before_destroy` Dependency Inversion:**
   * If Resource A has `create_before_destroy = true` and depends on Resource B, Resource B must ALSO have `create_before_destroy = true` if replaced. Otherwise, Terraform halts with a dependency cycle error.
3. **`count` vs `for_each` Refactoring Pitfall:**
   * When using `count`, resources are identified by numeric indices (`[0]`, `[1]`, `[2]`). Removing an item from the beginning shifts all subsequent indices down by 1, causing Terraform to destroy and recreate all downstream instances. `for_each` keys by string and avoids this.
4. **`prevent_destroy` Behavior:**
   * `prevent_destroy = true` stops any plan that would destroy or recreate the resource. Simply deleting the resource block from code does NOT bypass it—Terraform will still fail during plan! You must set `prevent_destroy = false`, apply, and then delete the block.
5. **`terraform state rm` Does NOT Destroy Infrastructure:**
   * `terraform state rm <ADDR>` purely stops tracking the resource in state. It makes zero API calls to terminate the real cloud asset.
6. **Child Modules CANNOT Declare Backends:**
   * Only the root module may define a `backend` block. Child modules must never declare backends.
7. **Module Encapsulation:**
   * Resources inside child modules are completely private. The root module CANNOT reference them directly unless the child module explicitly exports them via an `output` block.
8. **Dynamic Blocks Restriction:**
   * Dynamic blocks (`dynamic "<NAME>"`) can ONLY generate repeating *nested* blocks inside resources (like `ingress`, `egress`, `setting`). They CANNOT create top-level `resource` or `module` blocks.
9. **Variable Precedence Order (Lowest to Highest):**
   * Default values &rarr; `TF_VAR_*` env vars &rarr; `terraform.tfvars` &rarr; `terraform.tfvars.json` &rarr; `*.auto.tfvars` &rarr; CLI `-var` and `-var-file`.
10. **Sentinel Policy Enforcement Tiers:**
    * Advisory &rarr; Prints warning, never blocks.
    * Soft Mandatory &rarr; Blocks apply, but can be overridden by authorized users.
    * Hard Mandatory &rarr; Strictly blocks apply, CANNOT be overridden by anyone.

---

## 🛠️ Step-by-Step Study & Practice Strategy

### Week 1: Core HCL & Workflow Mastery
1. Work through Labs [`01-first-resource`](../exercises/01-first-resource) through [`07-lifecycle-rules`](../exercises/07-lifecycle-rules).
2. Take **Exam 01 (Diagnostic Baseline)** and **Exam 02 (Core Workflow Deep Dive)**.
3. Review any incorrect answers and check explanations on the fly.

### Week 2: State, Modules & Advanced Expressions
1. Work through Labs [`08-builtin-functions`](../exercises/08-builtin-functions) through [`14-terraform-data-and-provisioners`](../exercises/14-terraform-data-and-provisioners).
2. Take **Exam 03 (Syntax & Functions)**, **Exam 04 (State Architecture)**, and **Exam 05 (Modules & Registries)**.
3. Practice state commands in terminal: `terraform state list`, `show`, `mv`.

### Week 3: Modern 004 Features, Security & Cloud
1. Work through Labs [`15-refactoring-with-moved-blocks`](../exercises/15-refactoring-with-moved-blocks) through [`21-capstone-production-system`](../exercises/21-capstone-production-system).
2. Take **Exam 06 (Lifecycles & Dynamic Blocks)**, **Exam 07 (004 Modern Features)**, **Exam 08 (Security & Secrets)**, and **Exam 09 (Terraform Cloud/Enterprise)**.
3. Ensure you understand native tests (`.tftest.hcl`) and declarative `import` blocks.

### Week 4: Final Mock Exam & Readiness Certification
1. Take **Exam 10 (Final Comprehensive Simulation)** in **Timed Exam Mode**.
2. Aim for a score of **&ge; 85%**.
3. If any domain scores below 75%, revisit the recommended lab exercise listed in your score report.

Good luck on the HashiCorp Certified: Terraform Associate (004) exam! 🚀

