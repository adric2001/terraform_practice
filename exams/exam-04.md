# 📝 Practice Exam 04: State Architecture, Backends & State Surgery

**Domain Focus:** Domain 7  
**Total Questions:** 25 | **Passing Score:** 70% | **Time Limit:** 60 Minutes

> In-depth testing on remote backends, state locking, state manipulation commands, and drift management.

---

## 📖 Instructions
1. Read each question carefully and select your answer.
2. Click the collapsible **Answer & In-Depth Explanation** toggle to check your answer on the fly.
3. Note any weak domains and review the recommended hands-on exercises.

---

### Question 01 `[q4_01]`
*🏷️ Domain 7: Implement and Maintain State*

Why does Terraform store state? Which purpose is NOT handled by the state file?

- [ ] A. Mapping HCL configuration declarations to real-world cloud resource IDs.
- [ ] B. Caching resource metadata and attributes for fast planning.
- [ ] C. Tracking resource dependency order for accurate deletion plans.
- [ ] D. Acting as a source code control system to replace Git.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `D`

**Explanation:**  
Terraform state maps HCL resources to real world API IDs, records cached attributes, and tracks dependencies. It does NOT replace version control systems (like Git).

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 02 `[q4_02]`
*🏷️ Domain 7: Implement and Maintain State*

If sensitive variables or passwords are used to configure resources, where are they stored in plaintext?

- [ ] A. They are never stored anywhere once apply finishes.
- [ ] B. In the 'terraform.tfstate' file.
- [ ] C. Only inside the cloud provider's API logs.
- [ ] D. In '.terraform.lock.hcl'.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform state stores the full state of every managed resource, including attributes marked 'sensitive = true'. Therefore, anyone with read access to the state file can read secrets in plaintext. Securing the backend is critical.

🔗 **Recommended Hands-on Exercise:** [`exercises/20-secrets-and-sensitive-data`](../exercises/20-secrets-and-sensitive-data)

</details>

---

### Question 03 `[q4_03]`
*🏷️ Domain 7: Implement and Maintain State*

What is partial backend configuration?

- [ ] A. A backend where only some resources are stored in state.
- [ ] B. Omitting sensitive parameters (like credentials, bucket names, regions) from the HCL 'backend' block and providing them at runtime via '-backend-config' CLI flags or files.
- [ ] C. A backend that syncs once every 24 hours.
- [ ] D. Storing state partially in Git and partially in AWS.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Partial configuration allows you to leave backend configuration settings empty or omitted in HCL code to prevent hardcoding environment-specific or secret parameters, supplying them during 'terraform init -backend-config=...' instead.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 04 `[q4_04]`
*🏷️ Domain 7: Implement and Maintain State*

You execute 'terraform state mv aws_instance.old_web aws_instance.new_web'. What happens to the running EC2 instance?

- [ ] A. AWS restarts the instance with the new tag.
- [ ] B. The instance is stopped, renamed, and started.
- [ ] C. The instance continues running untouched; only its tracking address in the state file is renamed.
- [ ] D. The instance is deleted and recreated.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `C`

**Explanation:**  
'terraform state mv' operates purely on the state file's internal mapping index. It does not contact the cloud provider API and does not alter the physical resource.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 05 `[q4_05]`
*🏷️ Domain 7: Implement and Maintain State*

How can Configuration B read outputs exported by Configuration A without directly sharing configuration files?

- [ ] A. Use the 'data "terraform_remote_state"' data source to read Configuration A's state file.
- [ ] B. Use Git submodules.
- [ ] C. Copy paste outputs.tf from Configuration A.
- [ ] D. Configuration files cannot read outputs from another state.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'data "terraform_remote_state"' allows a Terraform workspace to access the root module output values of another separate Terraform state file, establishing read-only decoupled integration.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 06 `[q4_06]`
*🏷️ Domain 7: Implement and Maintain State*

Where does Terraform store workspace state files when using the default 'local' backend?

- [ ] A. In the root directory named 'terraform.tfstate.<workspace_name>'
- [ ] B. In a subfolder named 'terraform.tfstate.d/<workspace_name>/terraform.tfstate'
- [ ] C. In '~/.terraform/workspaces/'
- [ ] D. In the .git folder

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
For the local backend, non-default workspaces store their state inside the directory 'terraform.tfstate.d/<workspace_name>/terraform.tfstate'. The default workspace is stored at './terraform.tfstate'.

🔗 **Recommended Hands-on Exercise:** [`exercises/11-workspaces`](../exercises/11-workspaces)

</details>

---

### Question 07 `[q4_07]`
*🏷️ Domain 7: Implement and Maintain State*

When using the AWS S3 backend, how are workspaces partitioned inside the S3 bucket?

- [ ] A. A separate AWS account is required for each workspace.
- [ ] B. Under the prefix 'env:/<workspace_name>/<key>'.
- [ ] C. In separate S3 buckets named <bucket>-<workspace>.
- [ ] D. S3 backend does not support workspaces.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
When using remote backends like S3, non-default workspaces are automatically saved under an 'env:/' prefix inside the bucket, e.g. 's3://mybucket/env:/prod/terraform.tfstate'.

🔗 **Recommended Hands-on Exercise:** [`exercises/11-workspaces`](../exercises/11-workspaces)

</details>

---

### Question 08 `[q4_08]`
*🏷️ Domain 7: Implement and Maintain State*

When is using Terraform Workspaces NOT recommended according to HashiCorp best practices?

- [ ] A. For testing feature branches of the same infrastructure.
- [ ] B. For separating distinct deployment environments (dev, staging, prod) that require different credentials, access policies, regions, or backends.
- [ ] C. For fast ephemeral test environments.
- [ ] D. When using local state.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
HashiCorp guidelines recommend distinct directory/backend configurations (not workspaces) for production vs staging/dev environments because they share the same backend credentials and access boundaries, increasing blast radius risk.

🔗 **Recommended Hands-on Exercise:** [`exercises/11-workspaces`](../exercises/11-workspaces)

</details>

---

### Question 09 `[q4_09]`
*🏷️ Domain 7: Implement and Maintain State*

What is 'state drift' in Infrastructure as Code?

- [ ] A. When the Terraform CLI is upgraded to a newer binary.
- [ ] B. The divergence between the real-world infrastructure attributes and the records stored in the Terraform state file (e.g. from manual changes in the web console).
- [ ] C. Moving state files between local and remote backends.
- [ ] D. When Git branches have conflicting merge conflicts.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
State drift occurs when real infrastructure changes outside of Terraform's knowledge (such as manual edits in the cloud console or automated autoscaling), causing the actual state to differ from the recorded state.

🔗 **Recommended Hands-on Exercise:** [`exercises/07-lifecycle-rules`](../exercises/07-lifecycle-rules)

</details>

---

### Question 10 `[q4_10]`
*🏷️ Domain 7: Implement and Maintain State*

What happens when you run 'terraform state list'?

- [ ] A. Displays all Terraform configurations in your organization.
- [ ] B. Lists all resource addresses currently recorded in the active state file.
- [ ] C. Displays all available provider versions in the registry.
- [ ] D. Displays the history of all changes ever applied.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform state list' outputs a list of all resource addresses currently tracked in the state file (e.g. 'aws_instance.web', 'module.vpc.aws_subnet.public[0]').

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 11 `[q4_11]`
*🏷️ Domain 7: Implement and Maintain State*

A team member wants to push a modified state file back to the remote backend after manual inspection. Which command does this?

- [ ] A. terraform state upload
- [ ] B. terraform state push
- [ ] C. terraform apply -state
- [ ] D. terraform push

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform state push' writes a state file from local disk to the remote backend. Because this can overwrite team state and cause corruption, it should be used with extreme caution.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 12 `[q4_12]`
*🏷️ Domain 7: Implement and Maintain State*

Which backend feature is supported natively by Terraform Cloud / HCP Terraform without requiring additional cloud services?

- [ ] A. Automated state locking and remote execution.
- [ ] B. Manual FTP state synchronization.
- [ ] C. Unencrypted plain-text state logging.
- [ ] D. Hardcoded IP whitelisting only.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Terraform Cloud provides managed remote state storage, built-in non-blocking and blocking state locks, and optional remote execution (running plan/apply on HashiCorp agents) out of the box.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 13 `[q4_13]`
*🏷️ Domain 7: Implement and Maintain State*

How can you disable state locking during an emergency 'terraform plan' execution?

- [ ] A. terraform plan -no-lock
- [ ] B. terraform plan -lock=false
- [ ] C. terraform plan --bypass
- [ ] D. terraform plan -force

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
The '-lock=false' flag disables state locking for the current CLI execution. It is dangerous if others are writing concurrently, but helpful for read-only inspection if a lock is stuck.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 14 `[q4_14]`
*🏷️ Domain 7: Implement and Maintain State*

You need to wait up to 3 minutes for an active state lock to be released before timing out. Which flag achieves this?

- [ ] A. -wait=180s
- [ ] B. -lock-timeout=180s
- [ ] C. -timeout=3m
- [ ] D. -retry=180

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'-lock-timeout=180s' instructs Terraform to keep retrying to acquire the state lock for up to 180 seconds before failing with a lock acquisition error.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 15 `[q4_15]`
*🏷️ Domain 7: Implement and Maintain State*

What is the consequence of deleting the 'terraform.tfstate' file from a project that already has active infrastructure running in the cloud?

- [ ] A. The cloud provider automatically terminates all the active resources.
- [ ] B. Terraform loses all tracking of the resources; running 'terraform apply' will attempt to recreate them, causing conflict errors or duplicate infrastructure.
- [ ] C. Terraform automatically rebuilds the state file by scanning your AWS account.
- [ ] D. Nothing; Terraform does not require state.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
If state is lost, Terraform does not know those resources exist. On the next apply, it attempts to recreate them, leading to collision errors (e.g. S3 bucket already exists) or costly duplicate infrastructure.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 16 `[q4_16]`
*🏷️ Domain 7: Implement and Maintain State*

Where does Terraform keep backup copies of the local state file when changes are applied?

- [ ] A. In the cloud console.
- [ ] B. In 'terraform.tfstate.backup'.
- [ ] C. Inside '.terraform/backups/'.
- [ ] D. In the Git reflog.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
When using the local backend, Terraform writes the previous state to 'terraform.tfstate.backup' before saving the newly applied state, enabling manual disaster recovery if needed.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 17 `[q4_17]`
*🏷️ Domain 7: Implement and Maintain State*

Can a single Terraform configuration block declare multiple 'backend' blocks simultaneously?

- [ ] A. Yes, for redundant state mirroring.
- [ ] B. No, a configuration can only define exactly one backend block.
- [ ] C. Yes, one local and one remote.
- [ ] D. Yes, up to three backends.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform allows only one backend block per configuration. Redundant multi-backend state writes are not supported by the core engine.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 18 `[q4_18]`
*🏷️ Domain 7: Implement and Maintain State*

You want to refactor resource 'aws_security_group.sg' into a child module 'module.network.aws_security_group.sg'. Which CLI command moves the state address without recreation?

- [ ] A. terraform state cp aws_security_group.sg module.network.aws_security_group.sg
- [ ] B. terraform state mv aws_security_group.sg module.network.aws_security_group.sg
- [ ] C. terraform module migrate
- [ ] D. terraform refactor

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform state mv <SOURCE> <DEST>' moves the state tracking record to the new address inside the child module.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 19 `[q4_19]`
*🏷️ Domain 7: Implement and Maintain State*

How does Terraform detect if another user is actively modifying a remote S3 backend state?

- [ ] A. S3 bucket versioning timestamps.
- [ ] B. By checking for a LockID item in the associated DynamoDB table.
- [ ] C. By pinging the user's IP address.
- [ ] D. Through IAM role lease locks.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
The AWS S3 backend integrates with DynamoDB for state locking. Before any write, Terraform writes an item with a unique 'LockID' (containing md5, operation, user, created timestamp).

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 20 `[q4_20]`
*🏷️ Domain 7: Implement and Maintain State*

What is the recommended best practice for managing blast radius in enterprise Terraform architectures?

- [ ] A. Place the entire enterprise infrastructure into a single massive main.tf with 1,000 resources.
- [ ] B. Break infrastructure into smaller, decoupled state configurations (e.g. networking, databases, applications) with independent state files.
- [ ] C. Never use state files.
- [ ] D. Store state in public GitHub repos.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Smaller state files limit the blast radius: a mistake or failed apply in an application deployment cannot inadvertently corrupt or destroy core network or database state.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 21 `[q4_21]`
*🏷️ Domain 7: Implement and Maintain State*

What is the purpose of 'terraform state replace-provider'?

- [ ] A. Upgrades a provider to the newest version.
- [ ] B. Changes the provider source for existing resources in state (e.g. migrating from hashicorp/aws to an internal fork or renamed provider).
- [ ] C. Uninstalls unused provider binaries.
- [ ] D. Generates mock provider test fixtures.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform state replace-provider <FROM_PROVIDER> <TO_PROVIDER>' updates the provider FQCN for all matching resources in state without requiring manual JSON editing.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 22 `[q4_22]`
*🏷️ Domain 7: Implement and Maintain State*

Does 'terraform plan' require read access to the state file?

- [ ] A. No, plan only inspects HCL files.
- [ ] B. Yes, plan must read existing state to determine what changes are required to reach the desired configuration.
- [ ] C. Only if resources use provisioners.
- [ ] D. Only when using Terraform Cloud.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform plan requires read access to state because the execution plan is calculated by diffing the desired configuration against the current state.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 23 `[q4_23]`
*🏷️ Domain 7: Implement and Maintain State*

What is the default state storage backend when no 'backend' block is declared?

- [ ] A. cloud
- [ ] B. local
- [ ] C. memory
- [ ] D. consul

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
If no backend is declared, Terraform defaults to the 'local' backend, creating and reading 'terraform.tfstate' on the local filesystem.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 24 `[q4_24]`
*🏷️ Domain 7: Implement and Maintain State*

Why is committing 'terraform.tfstate' directly to a public Git repository a major security violation?

- [ ] A. Git cannot parse JSON files.
- [ ] B. State files contain unencrypted sensitive attributes, passwords, and private keys, making them accessible to anyone with repository access.
- [ ] C. Git locks prevent Terraform from applying changes.
- [ ] D. The file size exceeds Git limits.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform state stores raw resource attributes in unencrypted JSON, which frequently contains initial passwords, API tokens, TLS keys, and sensitive database strings.

🔗 **Recommended Hands-on Exercise:** [`exercises/20-secrets-and-sensitive-data`](../exercises/20-secrets-and-sensitive-data)

</details>

---

### Question 25 `[q4_25]`
*🏷️ Domain 7: Implement and Maintain State*

What happens if two operators attempt to run 'terraform apply' simultaneously against a backend with state locking enabled?

- [ ] A. Both executions merge their changes simultaneously.
- [ ] B. The first operator acquires the lock; the second operator's execution fails immediately with an error (or waits if lock-timeout is set).
- [ ] C. The second operator cancels the first operator's run.
- [ ] D. Both runs are aborted.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
State locking ensures mutual exclusion. The second process detects the existing lock and terminates with an error (e.g. 'Error acquiring the state lock'), protecting state consistency.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---
