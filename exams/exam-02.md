# 📝 Practice Exam 02: Core Workflow & CLI Deep Dive

**Domain Focus:** Domain 3, 4, 6  
**Total Questions:** 25 | **Passing Score:** 70% | **Time Limit:** 60 Minutes

> Exhaustive testing of CLI commands, flags, init mechanics, plan serialization, log levels, and workflow edge cases.

---

## 📖 Instructions
1. Read each question carefully and select your answer.
2. Click the collapsible **Answer & In-Depth Explanation** toggle to check your answer on the fly.
3. Note any weak domains and review the recommended hands-on exercises.

---

### Question 01 `[q2_01]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

During 'terraform init', which of the following operations are performed? (Select all that apply / Choose most comprehensive)

- [ ] A. Initializes backend storage, downloads referenced child modules, and downloads required provider plugins.
- [ ] B. Applies state modifications directly to the cloud provider.
- [ ] C. Destroys all untracked resources.
- [ ] D. Creates cryptographic SSH keys on the local machine.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'terraform init' initializes the working directory by: 1. Configuring and initializing the backend; 2. Sourcing and installing child modules; 3. Downloading and caching provider plugins and verifying checksums against the lock file.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 02 `[q2_02]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

You run 'terraform plan -out=tfplan.binary'. What is an important security consideration regarding this saved plan file?

- [ ] A. The file is automatically encrypted with the user's GPG key.
- [ ] B. The plan file is stored in cleartext (binary serialized JSON) and may contain sensitive variable values or passwords.
- [ ] C. The file can only be read on the same machine after running 'terraform decrypt'.
- [ ] D. The plan file expires after 5 minutes.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Saved plan files generated with '-out' contain the full proposed state and configuration values, which may include plaintext sensitive attributes and secrets. It must be protected with appropriate file permissions and not committed to public repositories.

🔗 **Recommended Hands-on Exercise:** [`exercises/02-variables-and-outputs`](../exercises/02-variables-and-outputs)

</details>

---

### Question 03 `[q2_03]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

What is the difference between running 'terraform apply' and 'terraform apply tfplan'?

- [ ] A. 'terraform apply tfplan' applies the exact pre-computed plan without re-prompting for confirmation or recalculating diffs, whereas 'terraform apply' calculates a new plan and prompts for interactive approval.
- [ ] B. 'terraform apply tfplan' can only be executed in Terraform Cloud.
- [ ] C. 'terraform apply' is faster because it skips the refresh phase.
- [ ] D. There is no difference; tfplan is ignored.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
When given a saved plan file ('terraform apply tfplan'), Terraform does not generate a new plan or prompt for user confirmation ('yes'). It guarantees that only the exact changes evaluated when 'plan -out' was executed will be applied.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 04 `[q2_04]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

What exit code does 'terraform plan -detailed-exitcode' return when the plan succeeded and there are infrastructural changes to apply?

- [ ] A. 0
- [ ] B. 1
- [ ] C. 2
- [ ] D. 255

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `C`

**Explanation:**  
With '-detailed-exitcode': 0 = Succeeded with no changes; 1 = Error occurred; 2 = Succeeded with non-empty diff (changes present). This is widely used in CI/CD pipeline scripts to decide whether to prompt for approvals.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 05 `[q2_05]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

You need to update your state to reflect out-of-band changes without modifying any real cloud resources. What command should you use in modern Terraform?

- [ ] A. terraform apply -refresh-only
- [ ] B. terraform refresh (legacy standalone command)
- [ ] C. terraform plan -force
- [ ] D. terraform sync

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
In modern Terraform, 'terraform apply -refresh-only' inspects real infrastructure and updates the state file to match reality, presenting a plan of state-only changes for approval without making changes to real resources. The old 'terraform refresh' command is discouraged.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 06 `[q2_06]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

Under what circumstance should the '-target' option ('terraform apply -target=...') be used?

- [ ] A. As the standard everyday way to deploy microservices independently.
- [ ] B. Solely for exceptional troubleshooting or recovery from errors where dependencies are broken.
- [ ] C. To speed up daily production deployments.
- [ ] D. Whenever deploying to non-default regions.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
HashiCorp explicitly warns that '-target' should only be used for exceptional circumstances or disaster recovery (e.g., when a dependency cycle or dead resource prevents regular plans). Regular use leads to state drift and hidden dependency failures.

🔗 **Recommended Hands-on Exercise:** [`exercises/04-resource-dependencies`](../exercises/04-resource-dependencies)

</details>

---

### Question 07 `[q2_07]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

Which command checks whether HCL syntax is valid and whether internal resource references match, without querying remote cloud APIs?

- [ ] A. terraform init
- [ ] B. terraform validate
- [ ] C. terraform plan
- [ ] D. terraform lint

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform validate' verifies syntax, variable declarations, module arguments, and attribute references in HCL files. It does not contact remote APIs or examine existing state files, making it extremely fast for pre-commit hooks.

🔗 **Recommended Hands-on Exercise:** [`exercises/13-validations-and-conditions`](../exercises/13-validations-and-conditions)

</details>

---

### Question 08 `[q2_08]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

Which environment variable configures verbose logging levels for the Terraform CLI?

- [ ] A. TERRAFORM_DEBUG
- [ ] B. TF_LOG
- [ ] C. HASHICORP_VERBOSE
- [ ] D. TF_VERBOSITY

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'TF_LOG' sets the logging level. Valid values are (in increasing verbosity): TRACE, DEBUG, INFO, WARN, ERROR, or OFF. To write logs to a file, use 'TF_LOG_PATH'.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 09 `[q2_09]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

What is the highest verbosity logging level available in Terraform?

- [ ] A. ALL
- [ ] B. DEBUG
- [ ] C. TRACE
- [ ] D. MAX

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `C`

**Explanation:**  
TRACE is the most verbose log level. It outputs internal engine operations, full HTTP request/response payloads to and from providers, and graph resolution steps.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 10 `[q2_010]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

If you send a single SIGINT (Ctrl+C) to a running 'terraform apply' process, what does Terraform do?

- [ ] A. Immediately kills all API connections and leaves state corrupted.
- [ ] B. Gracefully waits for currently in-flight resource operations to finish, saves the updated state, and then stops.
- [ ] C. Immediately executes a rollback by destroying all created resources.
- [ ] D. Ignores the signal completely until all plan items finish.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
On receiving a single SIGINT, Terraform enters a graceful shutdown: it stops starting new operations, allows in-flight provider API calls to conclude, updates the state file with completed work, and safely exits. Sending a second SIGINT forces an immediate abort with risk of state inconsistency.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 11 `[q2_011]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

You want to test HCL expressions and evaluate functions interactively. Which Terraform CLI command opens an interactive REPL console?

- [ ] A. terraform repl
- [ ] B. terraform console
- [ ] C. terraform test -i
- [ ] D. terraform eval

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform console' opens an interactive shell where you can evaluate functions, inspect state variables, test ternary operators, and view data source returns against the current state.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 12 `[q2_012]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

Can 'terraform console' be used to modify infrastructure or mutate resources in state?

- [ ] A. Yes, using the 'set' command inside the console.
- [ ] B. No, 'terraform console' is strictly read-only and cannot mutate state or resources.
- [ ] C. Yes, if launched with 'terraform console -write'.
- [ ] D. Yes, but only for local file resources.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform console' provides read-only evaluation. It cannot modify real infrastructure, alter state attributes, or perform creates/updates.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 13 `[q2_013]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

You change the backend configuration block from 'local' to 's3' in your root module. What command must you run next to transfer state?

- [ ] A. terraform state push s3
- [ ] B. terraform init -migrate-state
- [ ] C. terraform plan -backend
- [ ] D. terraform apply -sync

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Whenever you change backend blocks, you must run 'terraform init'. Adding '-migrate-state' instructs Terraform to copy the existing state file from the prior backend to the new backend location.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 14 `[q2_014]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

A previous run was killed abruptly and left a stale state lock in DynamoDB. How can an administrator clear the lock?

- [ ] A. terraform unlock -all
- [ ] B. terraform force-unlock <LOCK_ID>
- [ ] C. terraform state rm lock
- [ ] D. You must delete the S3 state file and start over.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
If a lock is stuck and you have verified no other process is running, you can release it using 'terraform force-unlock <LOCK_ID>', passing the Lock ID displayed in the original lock error message.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 15 `[q2_015]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

How do you extract a single raw string value of an output variable named 'api_token' without surrounding quotes in shell automation?

- [ ] A. terraform output -raw api_token
- [ ] B. terraform output -plain api_token
- [ ] C. terraform output -no-quotes api_token
- [ ] D. terraform output api_token | tr -d '"'

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'terraform output -raw <NAME>' prints the raw, unquoted string value directly to standard output, making it ideal for piping into shell environment variables or file scripts.

🔗 **Recommended Hands-on Exercise:** [`exercises/02-variables-and-outputs`](../exercises/02-variables-and-outputs)

</details>

---

### Question 16 `[q2_016]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

What happens if a resource creation fails midway through 'terraform apply' due to an invalid cloud API parameter?

- [ ] A. Terraform rolls back and destroys all previously created resources from that run.
- [ ] B. Successfully created resources prior to the failure are recorded in the state file; failed resources are not added.
- [ ] C. The entire state file is erased.
- [ ] D. Terraform pauses for 24 hours waiting for API recovery.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform does NOT perform automatic rollbacks on failure. Instead, it records all successfully provisioned resources in the state file so subsequent runs can resume cleanly without orphaned infrastructure.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 17 `[q2_017]`
*🏷️ Domain 3: Understand Terraform Basics*

You specify provider version constraints: version = "~> 3.2.0". Which of the following provider versions will Terraform accept?

- [ ] A. 3.2.5
- [ ] B. 3.3.0
- [ ] C. 4.0.0
- [ ] D. 3.1.9

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
The pessimistic constraint operator '~> 3.2.0' allows only patch updates: versions >= 3.2.0 and < 3.3.0. Version 3.2.5 falls in this range. If it had been '~> 3.2', it would have allowed up to < 4.0.0.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 18 `[q2_018]`
*🏷️ Domain 3: Understand Terraform Basics*

How can you upgrade all installed providers to the newest allowed versions matching configuration constraints?

- [ ] A. terraform get -upgrade
- [ ] B. terraform init -upgrade
- [ ] C. terraform update --providers
- [ ] D. Delete main.tf and re-create it

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform init -upgrade' checks the configured source registries for newer provider versions matching version constraints in HCL and updates '.terraform.lock.hcl'.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 19 `[q2_019]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

Which command permanently deletes all infrastructure managed by the current configuration directory?

- [ ] A. terraform clean
- [ ] B. terraform destroy
- [ ] C. terraform state delete --all
- [ ] D. rm -rf .terraform/

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform destroy' creates a plan to terminate and delete all resources managed by the current state file, prompting for confirmation before executing API deletions.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 20 `[q2_020]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

You need to export your complete current state file to standard output in JSON format for analysis. Which command should you execute?

- [ ] A. terraform state pull
- [ ] B. terraform state export
- [ ] C. terraform plan -json
- [ ] D. cat .terraform/state.json

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'terraform state pull' fetches the current state directly from the configured backend (local or remote) and outputs raw state JSON to stdout.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 21 `[q2_021]`
*🏷️ Domain 3: Understand Terraform Basics*

What is the purpose of the 'plugin_cache_dir' setting in a user's CLI configuration file (~/.terraformrc)?

- [ ] A. It prevents Terraform from downloading plugins entirely.
- [ ] B. It stores provider binaries in a single centralized folder across all projects to save disk space and network bandwidth.
- [ ] C. It stores compiled HCL bytecode.
- [ ] D. It accelerates DNS resolution.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
By default, every project downloads its own copy of provider binaries into '.terraform/providers'. Defining 'plugin_cache_dir' in '~/.terraformrc' allows multiple projects on the same machine to share cached provider binaries.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 22 `[q2_022]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

What happens when you add '-auto-approve' to 'terraform apply'?

- [ ] A. Terraform bypasses plan evaluation and executes blind writes.
- [ ] B. Terraform skips the interactive confirmation prompt ('Do you want to perform these actions?') and proceeds directly with the apply.
- [ ] C. Terraform ignores any errors returned by the provider.
- [ ] D. Terraform auto-commits the code changes to Git.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'-auto-approve' instructs Terraform to skip the interactive terminal prompt asking for 'yes' before applying changes. Commonly used in CI/CD automation pipelines.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 23 `[q2_023]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

Which command generates a visual representation of the Directed Acyclic Graph (DAG) for your configuration?

- [ ] A. terraform dag
- [ ] B. terraform graph
- [ ] C. terraform visualize
- [ ] D. terraform tree

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform graph' generates a visual representation of the dependency graph in Graphviz DOT format. It can be piped into 'dot -Tpng > graph.png'.

🔗 **Recommended Hands-on Exercise:** [`exercises/04-resource-dependencies`](../exercises/04-resource-dependencies)

</details>

---

### Question 24 `[q2_024]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

What occurs when you run 'terraform state rm <address>' on a live cloud database?

- [ ] A. Terraform sends an API request to delete the cloud database immediately.
- [ ] B. Terraform stops tracking the database in state, but the live cloud database continues running untouched.
- [ ] C. The database is moved to the recycle bin.
- [ ] D. The command fails if the database is running.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform state rm' purely removes the target resource from the state file. It makes zero API calls to delete or modify the real physical resource, allowing it to become unmanaged.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 25 `[q2_025]`
*🏷️ Domain 6: Use the Core Terraform Workflow*

You want to run a plan that explicitly sets a variable from the command line. Which syntax is valid?

- [ ] A. terraform plan --var app_port=8080
- [ ] B. terraform plan -var="app_port=8080"
- [ ] C. terraform plan -set app_port:8080
- [ ] D. terraform plan /var:app_port=8080

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Command line variables are supplied with '-var' flag: 'terraform plan -var="app_port=8080"' or multiple '-var' flags or with a file using '-var-file="custom.tfvars"'.

🔗 **Recommended Hands-on Exercise:** [`exercises/02-variables-and-outputs`](../exercises/02-variables-and-outputs)

</details>

---
