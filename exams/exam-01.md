# 📝 Practice Exam 01: Diagnostic Baseline Assessment

**Domain Focus:** All 9 Domains  
**Total Questions:** 25 | **Passing Score:** 70% | **Time Limit:** 60 Minutes

> Broad assessment covering all 9 domains of the Terraform Associate 004 exam blueprint to establish your readiness baseline.

---

## 📖 Instructions
1. Read each question carefully and select your answer.
2. Click the collapsible **Answer & In-Depth Explanation** toggle to check your answer on the fly.
3. Note any weak domains and review the recommended hands-on exercises.

---

### Question 01 `[q1_01]`
*🏷️ Domain 1: Understand Infrastructure as Code (IaC) Concepts*

Which statement best describes the primary advantage of a declarative Infrastructure as Code approach compared to an imperative approach?

- [ ] A. The user must specify the exact sequential step-by-step commands required to transition infrastructure.
- [ ] B. The user specifies the desired end-state of the infrastructure, and the tool determines the actions required to achieve that state.
- [ ] C. Imperative tools automatically detect drift, whereas declarative tools cannot detect out-of-band changes.
- [ ] D. Declarative tools require external bash scripts to execute every resource creation.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Declarative IaC (like Terraform) focuses on WHAT the final infrastructure should look like. The tool computes the difference between current state and desired state and executes the necessary API calls. Imperative tools (like custom scripts or Ansible ad-hoc) require you to write the exact steps (HOW) to reach the state.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 02 `[q1_02]`
*🏷️ Domain 3: Understand Terraform Basics*

Where does Terraform store downloaded provider plugins by default during 'terraform init'?

- [ ] A. Inside the system '/etc/terraform.d/plugins' directory.
- [ ] B. Inside the hidden subdirectory '.terraform/providers/' within the working directory.
- [ ] C. Directly inside the 'terraform.tfstate' file.
- [ ] D. Provider binaries are never downloaded locally; they run remotely in HashiCorp cloud.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform downloads provider plugins into the hidden `.terraform/providers` directory in the current working directory (unless a central plugin cache directory is configured via `plugin_cache_dir`).

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 03 `[q1_03]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

You execute 'terraform plan'. What does this command do?

- [ ] A. It directly makes API calls to create the resources in the cloud provider.
- [ ] B. It reads the current state, compares it with the configuration code, and outputs a preview of proposed changes without modifying real infrastructure.
- [ ] C. It validates syntax only and ignores remote provider state.
- [ ] D. It irrevocably commits state changes to the remote backend.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform plan' creates an execution plan. It refreshes state against real-world infrastructure (unless -refresh=false is specified), compares it with HCL configuration, and prints the proposed actions (+ create, ~ update, - destroy) without modifying resources.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 04 `[q1_04]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

You run 'terraform fmt -check'. What is the outcome if one of your .tf files contains formatting inconsistencies?

- [ ] A. The command automatically formats and saves the file.
- [ ] B. The command deletes the misformatted file.
- [ ] C. The command returns a non-zero exit code and lists the files that need formatting, without modifying them.
- [ ] D. The command raises a fatal HCL syntax compilation error and halts the CI pipeline.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `C`

**Explanation:**  
The '-check' flag verifies if input files are formatted according to canonical HCL style. If any file needs formatting, it returns exit code 3 (non-zero) and prints the filenames, which is ideal for CI/CD linting gates.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 05 `[q1_05]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Given a variable declared as: variable "db_pass" { type = string, sensitive = true }. What happens when you reference this variable in an output?

- [ ] A. Terraform encrypts the state file with AES-256 automatically.
- [ ] B. Terraform will throw an error during plan unless the output is also marked 'sensitive = true'.
- [ ] C. Terraform displays the cleartext value in CLI stdout during apply.
- [ ] D. Terraform redacts the value in terraform.tfstate.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform prevents accidental leakage of sensitive values. If an output references a sensitive variable or resource attribute, Terraform requires that output block to explicitly declare 'sensitive = true'; otherwise, planning halts with an error.

🔗 **Recommended Hands-on Exercise:** [`exercises/02-variables-and-outputs`](../exercises/02-variables-and-outputs)

</details>

---

### Question 06 `[q1_06]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

In what order of precedence does Terraform resolve variable values (from lowest to highest priority)?

- [ ] A. Default values -> Environment variables (TF_VAR_*) -> terraform.tfvars -> CLI -var flags
- [ ] B. CLI -var flags -> terraform.tfvars -> Environment variables -> Default values
- [ ] C. terraform.tfvars -> CLI -var flags -> Default values -> Environment variables
- [ ] D. Environment variables -> Default values -> terraform.tfvars -> CLI -var flags

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Precedence from lowest to highest: 1. Default values declared in variable blocks; 2. TF_VAR_* environment variables; 3. terraform.tfvars; 4. terraform.tfvars.json; 5. *.auto.tfvars; 6. Command line flags (-var and -var-file). Higher precedence overrides lower.

🔗 **Recommended Hands-on Exercise:** [`exercises/02-variables-and-outputs`](../exercises/02-variables-and-outputs)

</details>

---

### Question 07 `[q1_07]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

You have a list of subnets: var.subnets = ["subnet-a", "subnet-b", "subnet-c"]. You create resources using 'count = length(var.subnets)'. What happens if you remove "subnet-a" from the beginning of the list?

- [ ] A. Only subnet-a is destroyed; subnet-b and subnet-c remain untouched.
- [ ] B. Subnet-b takes index [0] and subnet-c takes index [1], causing Terraform to modify or recreate all subsequent resources due to index shifting.
- [ ] C. Terraform produces a duplicate key exception.
- [ ] D. The count meta-argument automatically detects value names and avoids recreation.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'count' identifies resources by numeric indices (e.g. aws_subnet.net[0], aws_subnet.net[1]). Removing an item from the beginning shifts all subsequent items down by one index, which causes Terraform to update or destroy/recreate every downstream resource. 'for_each' avoids this problem.

🔗 **Recommended Hands-on Exercise:** [`exercises/06-count-and-foreach`](../exercises/06-count-and-foreach)

</details>

---

### Question 08 `[q1_08]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

When should you use the 'for_each' meta-argument instead of 'count'?

- [ ] A. Only when creating exactly two resources.
- [ ] B. When instances correspond to distinct named items (maps or sets of strings) and you want to prevent unintended recreation if items are added or removed from the middle.
- [ ] C. When provisioning resources without any provider configuration.
- [ ] D. 'for_each' is deprecated in Terraform 1.5+ in favor of count.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'for_each' accepts a map or set of strings. Each resource instance is identified by its string key (e.g., ["web"], ["db"]), ensuring that adding or removing elements only affects that specific resource instance.

🔗 **Recommended Hands-on Exercise:** [`exercises/06-count-and-foreach`](../exercises/06-count-and-foreach)

</details>

---

### Question 09 `[q1_09]`
*🏷️ Domain 7: Implement and Maintain State*

Why is remote state locking essential when collaborating on Terraform projects?

- [ ] A. It encrypts the state file using customer-managed KMS keys.
- [ ] B. It prevents concurrent runs from executing against the same state file simultaneously, which could cause state corruption or conflicting changes.
- [ ] C. It locks the Terraform CLI version so team members cannot upgrade.
- [ ] D. It prevents developers from reading sensitive passwords in outputs.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
State locking ensures mutual exclusion. If two team members or CI jobs run 'terraform apply' at the same time on the same state, locking ensures only one process writes to state while the other waits or errors, preventing split-brain corruption.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 10 `[q1_10]`
*🏷️ Domain 7: Implement and Maintain State*

Which combination is a standard AWS-based remote backend configuration that supports state locking?

- [ ] A. Amazon S3 bucket for state storage + DynamoDB table for state locking.
- [ ] B. Amazon EBS volume mounted across network instances.
- [ ] C. Amazon SQS queue + Amazon SNS topic.
- [ ] D. Amazon RDS PostgreSQL instance alone without S3.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
In AWS, standard practice uses an Amazon S3 bucket (with versioning and encryption) for storing the 'terraform.tfstate' file and an Amazon DynamoDB table (with a primary key named 'LockID') for distributed state locking.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 11 `[q1_11]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

What is the purpose of the '.terraform.lock.hcl' file committed to version control?

- [ ] A. It holds the active state lock during an apply execution.
- [ ] B. It records the exact provider versions and cryptographic checksums selected for the configuration (Dependency Lock File).
- [ ] C. It contains encrypted backend secrets and master database credentials.
- [ ] D. It prevents unauthorized developers from executing 'terraform destroy'.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
The dependency lock file (.terraform.lock.hcl) pins the exact provider versions and their cryptographic hashes (hashes of provider binaries). Committing it to VCS guarantees that all team members and CI pipelines use identical provider versions.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 12 `[q1_12]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the function of the lifecycle rule 'create_before_destroy = true'?

- [ ] A. It creates a backup of the state file before executing any destroy command.
- [ ] B. It reverses the default replacement order: Terraform creates the new replacement resource first before destroying the existing resource.
- [ ] C. It prevents any user from ever destroying the resource.
- [ ] D. It automatically rolls back failed deployments to the prior commit.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Normally, when a resource requires replacement, Terraform destroys the old resource first, then creates the new one. 'create_before_destroy = true' inverts this lifecycle, provisioning the replacement first to reduce service downtime.

🔗 **Recommended Hands-on Exercise:** [`exercises/07-lifecycle-rules`](../exercises/07-lifecycle-rules)

</details>

---

### Question 13 `[q1_13]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

A junior engineer sets 'prevent_destroy = true' inside a database resource's lifecycle block. What happens if someone runs 'terraform destroy'?

- [ ] A. Terraform destroys all other resources and leaves the database unmanaged.
- [ ] B. Terraform halts with an error and refuses to execute the plan that would destroy the protected resource.
- [ ] C. Terraform ignores the rule if the user passes '-auto-approve'.
- [ ] D. Terraform deletes the database but saves a snapshot in AWS S3.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'prevent_destroy = true' causes Terraform to reject with an error any execution plan that would destroy the resource (including 'terraform destroy' or replacement plans). It is a safety measure against accidental deletion.

🔗 **Recommended Hands-on Exercise:** [`exercises/07-lifecycle-rules`](../exercises/07-lifecycle-rules)

</details>

---

### Question 14 `[q1_14]`
*🏷️ Domain 5: Interact with Terraform Modules*

You want to reference an output named 'vpc_id' defined inside a child module called 'network'. How do you reference it from the root module?

- [ ] A. vpc_id
- [ ] B. module.network.vpc_id
- [ ] C. child.network.outputs.vpc_id
- [ ] D. module.network.outputs.vpc_id

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Outputs from child modules are accessed using the syntax 'module.<MODULE_NAME>.<OUTPUT_NAME>'. For example: 'module.network.vpc_id'.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 15 `[q1_15]`
*🏷️ Domain 5: Interact with Terraform Modules*

Can you specify a 'version' argument when calling a local child module with 'source = "./modules/storage"'?

- [ ] A. Yes, version constraints can be applied to local path modules.
- [ ] B. No, the 'version' argument is only supported for modules sourced from a module registry.
- [ ] C. Yes, but only if the local folder is a Git submodule.
- [ ] D. Yes, as long as the version matches a Git tag.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform only supports the 'version' meta-argument for modules sourced from a registry (public or private). Local filesystem directory sources ('./' or '../') do not support the 'version' argument.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 16 `[q1_16]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the key difference between a 'data' source block and a 'resource' block?

- [ ] A. 'data' blocks provision new infrastructure, while 'resource' blocks only read existing infrastructure.
- [ ] B. 'data' blocks allow Terraform to read and use information defined outside of Terraform or by another configuration, without managing its lifecycle.
- [ ] C. 'data' blocks are executed during 'terraform init', while 'resource' blocks are executed during 'terraform apply'.
- [ ] D. 'data' blocks cannot accept any input arguments.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Data sources ('data' blocks) fetch read-only data from an external API or file (e.g. looking up an existing AMI ID or VPC). They do not create or destroy infrastructure; resource blocks manage infrastructure lifecycle.

🔗 **Recommended Hands-on Exercise:** [`exercises/05-data-sources`](../exercises/05-data-sources)

</details>

---

### Question 17 `[q1_17]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What modern Terraform feature (introduced in Terraform 1.1+) allows you to rename a resource in your HCL code without Terraform planning to destroy and recreate it?

- [ ] A. alias block
- [ ] B. moved block
- [ ] C. rename block
- [ ] D. lifecycle { replace_triggered_by = ... }

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
The 'moved' block allows declarative state refactoring: 'moved { from = local_file.old to = local_file.new }'. During plan, Terraform recognizes the rename and updates state without destroying the live asset.

🔗 **Recommended Hands-on Exercise:** [`exercises/15-refactoring-with-moved-blocks`](../exercises/15-refactoring-with-moved-blocks)

</details>

---

### Question 18 `[q1_18]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

You have an existing cloud resource created manually via the Web Console. How can you bring it under Terraform management using Terraform 1.5+ declarative syntax?

- [ ] A. Use an 'import' block specifying 'to' (the resource address) and 'id' (the provider's resource ID).
- [ ] B. You must manually edit the 'terraform.tfstate' JSON file in a text editor.
- [ ] C. Run 'terraform init -import' with the cloud ARN.
- [ ] D. It is impossible to import resources once created outside Terraform.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Terraform 1.5+ introduced the declarative 'import' block ('import { to = aws_s3_bucket.bucket id = "my-bucket-name" }'). Running 'terraform plan' previews the import and can generate HCL with '-generate-config-out'.

🔗 **Recommended Hands-on Exercise:** [`exercises/16-declarative-import`](../exercises/16-declarative-import)

</details>

---

### Question 19 `[q1_19]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

Which command allows you to view the detailed attributes of a specific resource tracked in your state file?

- [ ] A. terraform state list
- [ ] B. terraform state show <RESOURCE_ADDRESS>
- [ ] C. terraform plan -inspect
- [ ] D. terraform state dump

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform state show <address>' displays single-resource attributes stored in state. 'terraform state list' only lists the resource addresses without attributes.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 20 `[q1_20]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the modern built-in resource introduced in Terraform 1.4 that replaces the external 'null_resource' without requiring third-party provider downloads?

- [ ] A. terraform_data
- [ ] B. local_exec
- [ ] C. core_resource
- [ ] D. generic_resource

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'terraform_data' is built directly into Terraform (no provider plugin required). It stores arbitrary values, participates in the graph, and supports 'triggers_replace' to force replacement.

🔗 **Recommended Hands-on Exercise:** [`exercises/14-terraform-data-and-provisioners`](../exercises/14-terraform-data-and-provisioners)

</details>

---

### Question 21 `[q1_21]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What is a 'speculative plan' in Terraform Cloud?

- [ ] A. A plan that randomly chooses instance sizes to test cost variations.
- [ ] B. A plan triggered automatically by a pull request to test if code merges cleanly and plan succeeds, without saving state or modifying infrastructure.
- [ ] C. A plan generated without verifying provider credentials.
- [ ] D. An unverified plan scheduled to run overnight.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
In Terraform Cloud, when a developer opens a Pull Request on a connected VCS repo, a speculative plan runs automatically. It verifies that the plan succeeds and shows what would change, but cannot be applied and does not lock state.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 22 `[q1_22]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

What file extension is used by the native Terraform test framework introduced in Terraform 1.6+?

- [ ] A. .test.tf
- [ ] B. .tftest.hcl (or .tftest.json)
- [ ] C. .spec.tf
- [ ] D. .unit.hcl

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform 1.6+ native testing discovers test files ending in '.tftest.hcl' or '.tftest.json' in the current directory or a 'tests/' subdirectory when running 'terraform test'.

🔗 **Recommended Hands-on Exercise:** [`exercises/19-testing-framework-tftest`](../exercises/19-testing-framework-tftest)

</details>

---

### Question 23 `[q1_23]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

You need to configure an active-passive disaster recovery setup where resources are provisioned in two different AWS regions (us-east-1 and us-west-2). How do you configure the provider?

- [ ] A. You must create two completely separate git repositories; Terraform cannot manage multiple regions in one workspace.
- [ ] B. Declare multiple provider "aws" blocks and assign an 'alias' argument to the secondary provider.
- [ ] C. Use the '-region' CLI parameter during apply.
- [ ] D. Declare provider "aws_secondary".

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
To define multiple configurations for the same provider, define one default provider block and additional aliased blocks using 'alias = "dr_region"'. Resources reference the alias using 'provider = aws.dr_region'.

🔗 **Recommended Hands-on Exercise:** [`exercises/18-multi-provider-aliasing`](../exercises/18-multi-provider-aliasing)

</details>

---

### Question 24 `[q1_24]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Which HCL expression returns 'staging' if var.env is an empty string, but returns var.env otherwise?

- [ ] A. lookup(var.env, "staging")
- [ ] B. var.env != "" ? var.env : "staging"
- [ ] C. if var.env == "" then "staging" else var.env
- [ ] D. coalesce(var.env, "staging") -- wait, only if var.env is null or empty

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
The ternary conditional expression syntax is: 'condition ? true_val : false_val'. Therefore, 'var.env != "" ? var.env : "staging"' cleanly handles checking for an empty string.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 25 `[q1_25]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

You suspect that an EC2 instance managed by Terraform has become corrupted and need Terraform to recreate it on the next apply without recreating any other resources. What is the recommended modern approach?

- [ ] A. Run 'terraform taint aws_instance.web' (legacy approach).
- [ ] B. Run 'terraform apply -replace="aws_instance.web"'.
- [ ] C. Delete the instance from the state file using 'terraform state rm'.
- [ ] D. Change the resource name in HCL.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
While 'terraform taint' existed in older versions, HashiCorp officially recommends using 'terraform apply -replace="ADDRESS"' (or 'terraform plan -replace=...'). It does not immediately modify state and integrates safely with the plan workflow.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---
