# 📝 Practice Exam 10: Final Comprehensive Mock Exam (004 Blueprint)

**Domain Focus:** All 9 Domains  
**Total Questions:** 25 | **Passing Score:** 70% | **Time Limit:** 60 Minutes

> Realistic full-length exam simulation matching HashiCorp Terraform Associate 004 domain weighting, tricky questions, and scenarios.

---

## 📖 Instructions
1. Read each question carefully and select your answer.
2. Click the collapsible **Answer & In-Depth Explanation** toggle to check your answer on the fly.
3. Note any weak domains and review the recommended hands-on exercises.

---

### Question 01 `[q10_01]`
*🏷️ Domain 1: Understand Infrastructure as Code (IaC) Concepts*

Which of the following is a primary characteristic of immutable infrastructure?

- [ ] A. Servers are SSH'd into and updated in place repeatedly over several years.
- [ ] B. Infrastructure components are never modified in place; updates are achieved by provisioning entirely new components and terminating the old ones.
- [ ] C. State files cannot be deleted.
- [ ] D. Infrastructure that does not require networking.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Immutable infrastructure treats servers as disposable. Instead of patching or modifying running servers (mutable), new machine images or containers are deployed and old instances terminated.

🔗 **Recommended Hands-on Exercise:** [`exercises/07-lifecycle-rules`](../exercises/07-lifecycle-rules)

</details>

---

### Question 02 `[q10_02]`
*🏷️ Domain 2: Understand the Purpose of Terraform*

How does Terraform differ from configuration management tools like Ansible, Puppet, or Chef?

- [ ] A. Terraform focuses primarily on provisioning the underlying infrastructure components (cloud VMs, networks, storage), whereas configuration management tools focus on configuring software inside running operating systems.
- [ ] B. Terraform cannot run on Linux.
- [ ] C. Ansible cannot create AWS resources.
- [ ] D. Configuration management tools do not use code.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Terraform is fundamentally an infrastructure orchestrator (provisioning cloud services, networking, IAM). Configuration management tools specialize in configuring packages, files, and daemons on already-provisioned servers.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 03 `[q10_03]`
*🏷️ Domain 3: Understand Terraform Basics*

What is the purpose of the 'required_version' setting in the 'terraform' block?

- [ ] A. Enforces that only compatible versions of the Terraform CLI binary can execute the configuration, preventing unexpected behavior from unsupported versions.
- [ ] B. Sets the Linux kernel version.
- [ ] C. Sets the AWS provider version.
- [ ] D. Configures the Git version.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'required_version' (e.g. '>= 1.5.0, < 2.0.0') pins the allowed Terraform CLI binary versions, preventing team members with older or newer incompatible CLI versions from running.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 04 `[q10_04]`
*🏷️ Domain 3: Understand Terraform Basics*

Where does Terraform check for provider plugins if an offline network mirror is configured?

- [ ] A. It always queries registry.terraform.io regardless of config.
- [ ] B. In the directory or network URL specified in the CLI config 'provider_installation' block.
- [ ] C. Inside GitHub releases.
- [ ] D. In the system /tmp folder.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
In air-gapped or enterprise networks, the CLI configuration's 'provider_installation' block can redirect provider discovery to a filesystem mirror or internal network mirror.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 05 `[q10_05]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

You execute 'terraform taint aws_instance.api'. What does Terraform do?

- [ ] A. Destroys the instance immediately.
- [ ] B. Marks the resource in the state file as degraded/tainted, instructing the next 'terraform apply' to destroy and recreate it.
- [ ] C. Removes it from state.
- [ ] D. Stops the EC2 instance.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform taint' marks an existing resource in state as tainted. During the next plan/apply, Terraform plans to replace it. In modern Terraform, 'terraform apply -replace=...' is preferred.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 06 `[q10_06]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

What command undoes the effect of 'terraform taint' before an apply is executed?

- [ ] A. terraform clean
- [ ] B. terraform untaint <ADDRESS>
- [ ] C. terraform restore
- [ ] D. terraform state reset

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform untaint <ADDRESS>' clears the tainted status from a resource in state, restoring it to healthy status so it will not be replaced on the next apply.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 07 `[q10_07]`
*🏷️ Domain 5: Interact with Terraform Modules*

You want to pass a list of subnets into a child module. In the child module's 'variables.tf', how should the variable be declared?

- [ ] A. variable "subnet_ids" { type = list(string) }
- [ ] B. input "subnet_ids" { list }
- [ ] C. param "subnet_ids" {}
- [ ] D. arg "subnet_ids" { type = array }

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Module inputs are declared using standard 'variable' blocks. Declaring 'type = list(string)' enforces that callers must supply a list of strings.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 08 `[q10_08]`
*🏷️ Domain 5: Interact with Terraform Modules*

Can a child module define its own 'backend' block?

- [ ] A. Yes, each child module can write to its own backend.
- [ ] B. No, only the root module may define a backend block. Child modules must never declare backends.
- [ ] C. Yes, if it is a local backend.
- [ ] D. Only if sourced from Git.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Backend blocks are strictly reserved for the root module. Child modules are purely containers for resources and must never specify a backend.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 09 `[q10_09]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

What is the primary purpose of the 'refresh' phase in 'terraform plan'?

- [ ] A. To download the newest Terraform CLI version.
- [ ] B. To query provider APIs and update the in-memory state with real-world infrastructure attributes before computing diffs.
- [ ] C. To reboot all running cloud instances.
- [ ] D. To clear out expired cache entries.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
During the refresh phase, Terraform queries the cloud APIs for every managed resource to synchronize its in-memory view of reality before diffing against HCL configuration.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 10 `[q10_10]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

What happens if you run 'terraform apply' and type anything other than 'yes' at the confirmation prompt?

- [ ] A. Terraform pauses for 10 minutes.
- [ ] B. Terraform cancels the apply immediately and leaves existing infrastructure and state untouched.
- [ ] C. Terraform applies the changes anyway.
- [ ] D. Terraform deletes the plan.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform strictly requires the literal string 'yes' (case-sensitive) to proceed. Entering anything else (e.g. 'y', 'Y', 'YES', or 'no') safely aborts the apply.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 11 `[q10_11]`
*🏷️ Domain 7: Implement and Maintain State*

What does 'terraform state pull' output?

- [ ] A. Git commits.
- [ ] B. The raw state content directly from the remote backend in JSON format to stdout.
- [ ] C. A list of modules.
- [ ] D. Provider API logs.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform state pull' retrieves the state from the active backend and streams the raw JSON structure to standard output.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 12 `[q10_12]`
*🏷️ Domain 7: Implement and Maintain State*

You need to rename an entire module in state: from 'module.old_vpc' to 'module.new_vpc'. Which command achieves this?

- [ ] A. terraform state mv module.old_vpc module.new_vpc
- [ ] B. terraform state rename module.old_vpc module.new_vpc
- [ ] C. terraform module move old_vpc new_vpc
- [ ] D. terraform plan -rename

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'terraform state mv' works on both individual resources and entire modules. Moving 'module.old_vpc' to 'module.new_vpc' re-keys all nested resources in one command.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 13 `[q10_13]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What does the 'trimspace("  hello world  \n")' function return?

- [ ] A. "hello world"
- [ ] B. "helloworld"
- [ ] C. "hello world  "
- [ ] D. "  hello world"

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'trimspace()' strips all leading and trailing whitespace characters (spaces, tabs, newlines) from a string, returning 'hello world'.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 14 `[q10_14]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What will 'element(["a", "b", "c"], 4)' return in Terraform?

- [ ] A. Error: Index out of bounds
- [ ] B. "b" (it wraps around using modulo arithmetic)
- [ ] C. null
- [ ] D. "a"

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Unlike standard bracket indexing 'list[index]' (which errors if the index is out of bounds), the 'element(list, index)' function wraps around using modulo arithmetic: index 4 in a 3-element list evaluates to 4 % 3 = index 1 ("b").

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 15 `[q10_15]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Given: locals { tags = { Env = "prod", Owner = "DevOps" } }. How do you access the value of 'Owner'?

- [ ] A. local.tags["Owner"] or local.tags.Owner
- [ ] B. locals.tags.Owner
- [ ] C. var.tags.Owner
- [ ] D. tags["Owner"]

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Local values are referenced using the singular prefix 'local.' (not 'locals.'). Map keys can be accessed with dot notation ('local.tags.Owner') or square brackets ('local.tags["Owner"]').

🔗 **Recommended Hands-on Exercise:** [`exercises/03-collections-and-types`](../exercises/03-collections-and-types)

</details>

---

### Question 16 `[q10_16]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Which of the following expressions checks whether a variable string is NOT null and NOT empty?

- [ ] A. var.name != null && var.name != ""
- [ ] B. var.name.exists()
- [ ] C. is_valid(var.name)
- [ ] D. !empty(var.name)

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Standard HCL boolean operators '&&' (AND), '||' (OR), and '!=' (not equal) are used: 'var.name != null && var.name != ""'.

🔗 **Recommended Hands-on Exercise:** [`exercises/13-validations-and-conditions`](../exercises/13-validations-and-conditions)

</details>

---

### Question 17 `[q10_17]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

What is the primary role of 'terraform test' compared to external tools like Terratest?

- [ ] A. 'terraform test' runs directly inside Terraform using pure HCL (.tftest.hcl), requiring no Go compiler, no external testing frameworks, and supporting fast mock planning.
- [ ] B. Terratest is deprecated.
- [ ] C. 'terraform test' only works on Windows.
- [ ] D. 'terraform test' tests network bandwidth.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Native 'terraform test' allows authoring unit and integration tests directly in HCL without needing Go programming knowledge, third-party libraries, or complex test harnesses.

🔗 **Recommended Hands-on Exercise:** [`exercises/19-testing-framework-tftest`](../exercises/19-testing-framework-tftest)

</details>

---

### Question 18 `[q10_18]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

You want to refactor resource 'aws_instance.server[0]' to 'aws_instance.server["web"]'. What 'moved' block is required?

- [ ] A. moved { from = aws_instance.server[0] to = aws_instance.server["web"] }
- [ ] B. moved { from = aws_instance.server[0] to = aws_instance.web }
- [ ] C. state_rename server[0] -> server["web"]
- [ ] D. moved { 0 => "web" }

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Moved blocks can transition between count indices and for_each string keys seamlessly: 'moved { from = aws_instance.server[0] to = aws_instance.server["web"] }'.

🔗 **Recommended Hands-on Exercise:** [`exercises/15-refactoring-with-moved-blocks`](../exercises/15-refactoring-with-moved-blocks)

</details>

---

### Question 19 `[q10_19]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What does the 'coalesce()' function do?

- [ ] A. Combines two strings.
- [ ] B. Takes any number of arguments and returns the first one that is NOT null and NOT empty string ("").
- [ ] C. Formats numbers into currency.
- [ ] D. Merges two sets.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'coalesce(val1, val2, ...)' inspects arguments from left to right and returns the first argument that is non-null and non-empty, commonly used for fallback defaults.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 20 `[q10_20]`
*🏷️ Domain 7: Implement and Maintain State*

When is it appropriate to delete a state lock manually using 'terraform force-unlock'?

- [ ] A. Every time before running 'terraform apply'.
- [ ] B. ONLY after you have verified with 100% certainty that the process that acquired the lock is dead and no other engineer or pipeline is actively applying changes.
- [ ] C. Whenever an apply takes more than 1 minute.
- [ ] D. When you want to speed up deployments.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Force-unlocking an active running apply will allow concurrent writes, corrupting the state file. It must only ever be used after confirming that the previous process was abruptly killed.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 21 `[q10_21]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What happens if a 'Hard Mandatory' Sentinel policy fails in Terraform Cloud?

- [ ] A. The plan can be overridden by a team lead.
- [ ] B. The run is immediately stopped and CANNOT be applied under any circumstances; the violation must be fixed in code.
- [ ] C. The changes are applied with a warning.
- [ ] D. The user's account is locked.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Hard Mandatory is the strictest enforcement tier. Unlike Soft Mandatory, no user (not even an organization owner) can override a Hard Mandatory failure.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 22 `[q10_22]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the return value of 'jsondecode("{\"port\": 8080}")'?

- [ ] A. A string "8080"
- [ ] B. A native HCL object/map: { port = 8080 }
- [ ] C. A list of characters
- [ ] D. An error

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'jsondecode()' takes a valid JSON string and parses it into corresponding HCL maps, objects, numbers, and lists.

🔗 **Recommended Hands-on Exercise:** [`exercises/05-data-sources`](../exercises/05-data-sources)

</details>

---

### Question 23 `[q10_23]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

What is the effect of running 'terraform init -reconfigure'?

- [ ] A. Upgrades all provider versions.
- [ ] B. Disregards any existing backend configuration and reinitializes backend from scratch, ignoring previous state migration questions.
- [ ] C. Erases all .tf files.
- [ ] D. Cleans Git history.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'-reconfigure' forces Terraform to reconfigure the backend from scratch, ignoring any existing state file or prior settings, without offering to migrate existing state.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 24 `[q10_24]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What does 'distinct(["a", "b", "a", "c"])' return?

- [ ] A. ["a", "b", "c"]
- [ ] B. ["a", "a"]
- [ ] C. ["b", "c"]
- [ ] D. 3

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'distinct(list)' returns a new list with any duplicate elements removed, preserving the relative order of first appearance.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 25 `[q10_25]`
*🏷️ Domain 1: Understand Infrastructure as Code (IaC) Concepts*

What is the core definition of 'Idempotency' in Infrastructure as Code?

- [ ] A. The system runs 10 times faster with each execution.
- [ ] B. Executing the same configuration multiple times results in the exact same infrastructure state, without unintended side effects or duplicate resource creation.
- [ ] C. All code is converted into immutable Docker images.
- [ ] D. Changes require manual approval.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Idempotency means that executing 'terraform apply' once or a hundred times against an unchanged environment results in the exact same infrastructure state without altering or duplicating resources.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---
