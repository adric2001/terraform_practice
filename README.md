# 🚀 Terraform Practice Suite: Zero to Production

A comprehensive, hands-on curriculum of **21 progressive practice exercises** and a full **Terraform Associate (004) Cloud Readiness Portal** with an in-browser code checker, timed mock exams, flashcard trainer, and cloud sync.

---

## 🌐 Live Cloud Practice Portal & Lab Studio
Access the full interactive suite in your browser:
### 👉 **[https://d1ewr9sh9xd6o.cloudfront.net](https://d1ewr9sh9xd6o.cloudfront.net)**

* **🛠️ In-Browser Hands-On Lab Studio**: Solve all 21 exercises with multi-file tabs, automated real-time HCL validation, and 1-click solution copying.
* **🎯 10 Practice Exams (250 Questions)**: Instant right/wrong feedback, question flagging, and 57-question timed mock exam with navigator grid.
* **📅 14-Day Exam Acceleration Roadmap**: Daily guided schedule with direct 1-click exam and lab launcher buttons.
* **🗂️ 50 High-Yield Flashcard Trainer**: Flip-card trainer covering top traps, state commands, and new 004 features.
* **☁️ Cloud Sync & Diagnostic Progress**: AWS Cognito authentication and DynamoDB persistence tracking your readiness score and weak domains.

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

## 🎯 10 Terraform Associate (004) Practice Exams & Interactive Simulator

Prepare for the official **HashiCorp Certified: Terraform Associate (004)** exam with **10 full-length practice exams (250 questions total)** featuring instant on-the-fly feedback, diagnostic scoring, and an exam readiness evaluator:

* ☁️ **Live AWS Cloud Readiness Portal:** [**https://d1ewr9sh9xd6o.cloudfront.net**](https://d1ewr9sh9xd6o.cloudfront.net) — Full-featured cloud web app with user authentication (Cognito), persistence (DynamoDB), 14-day study sprint roadmap, 50-flashcard trainer, and in-browser Lab Studio.
* 🖥️ **Terminal CLI Simulator:** Run `./run_exam.sh` (or `python3 exams/simulator.py`) for an interactive terminal quiz with live score tracking, right/wrong feedback on the fly, and domain readiness reports.
* 🌐 **Offline Browser Web UI:** Open [`exams/simulator.html`](exams/simulator.html) (`open exams/simulator.html`) in any browser for study mode and 60-minute timed exam mode with zero dependencies!
* 📚 **Official 004 Study Guide:** Read [`exams/STUDY_GUIDE_004.md`](exams/STUDY_GUIDE_004.md) for the complete 004 domain blueprint, what's new in 004, top 10 exam traps, and lab mappings.
* 📝 **Markdown Exam Files:** Access all 10 exams with collapsible answer keys in [`exams/`](exams/README.md) ([Exam 01](exams/exam-01.md) to [Exam 10](exams/exam-10.md)).

---

## 🛠️ How to Practice the 21 Exercises

You can practice the exercises using either the web portal, the isolated local CLI sandbox, or standard local directories:

### Option 1: Web Lab Studio (Zero Setup - Recommended)
Open [**https://d1ewr9sh9xd6o.cloudfront.net**](https://d1ewr9sh9xd6o.cloudfront.net) and click **"🛠️ Lab Studio"**:
- Write and edit HCL code across multiple files directly in the browser.
- Click **"🧪 Check & Validate Code"** for automated real-time verification with instant pass/fail diagnostics.
- View reference solutions with 1-click copy into your editor.
- Saves progress and completed labs to your cloud account!

### Option 2: Isolated Terminal CLI Sandbox (`./practice.sh`)
Practice locally in an isolated `.work/` sandbox without modifying tracked repository files or polluting git:
```bash
# 1. Start an exercise in an isolated .work/ workspace
./practice.sh start 01

# 2. Navigate into your sandbox and implement the solution
cd .work/01-first-resource

# 3. Verify syntax and configuration against terraform validate
./practice.sh verify 01

# 4. View official reference solution
./practice.sh solution 01

# 5. Reset your sandbox anytime
./practice.sh reset 01
```

### Option 3: Standard Directory Practice
1. Choose an exercise:
   ```bash
   cd exercises/01-first-resource/starter
   ```
2. Read the exercise's `README.md` for requirements and hints.
3. Edit the `.tf` files in `starter/` and test:
   ```bash
   terraform init
   terraform fmt -check
   terraform validate
   terraform plan
   terraform apply
   ```
4. Clean up resources:
   ```bash
   terraform destroy -auto-approve
   ```

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
