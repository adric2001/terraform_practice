# 📝 Practice Exam 09: Terraform Cloud, Enterprise & Team Workflows

**Domain Focus:** Domain 9  
**Total Questions:** 25 | **Passing Score:** 70% | **Time Limit:** 60 Minutes

> Mastery of Terraform Cloud/Enterprise: workspaces, VCS triggers, speculative plans, agents, run triggers, and private registries.

---

## 📖 Instructions
1. Read each question carefully and select your answer.
2. Click the collapsible **Answer & In-Depth Explanation** toggle to check your answer on the fly.
3. Note any weak domains and review the recommended hands-on exercises.

---

### Question 01 `[q9_01]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What is the difference between a workspace in the Terraform CLI and a workspace in Terraform Cloud?

- [ ] A. There is no difference; they are identical.
- [ ] B. In the CLI, workspaces are simply alternate named state files in the same directory. In Terraform Cloud, workspaces contain state, environment variables, HCL variables, run histories, VCS connections, and access controls.
- [ ] C. CLI workspaces are only for AWS; Cloud workspaces are for Azure.
- [ ] D. Cloud workspaces do not store state.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
In CLI, a workspace is just a separate state file. In Terraform Cloud, a workspace is an entire execution environment with its own variables, state history, VCS triggers, team permissions, and run queues.

🔗 **Recommended Hands-on Exercise:** [`exercises/11-workspaces`](../exercises/11-workspaces)

</details>

---

### Question 02 `[q9_02]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What are the three execution modes supported by Terraform Cloud workspaces?

- [ ] A. Fast, Normal, Slow
- [ ] B. Remote, Local, Agent
- [ ] C. Direct, Indirect, Proxy
- [ ] D. Cloud, On-Premise, Hybrid

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform Cloud workspaces support three execution modes: Remote (runs on HashiCorp hosted runners), Local (runs on the user's CLI and syncs state to Cloud), and Agent (runs on self-hosted agents within private networks).

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 03 `[q9_03]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What is a 'VCS-driven workflow' in Terraform Cloud?

- [ ] A. Terraform runs exclusively inside Git submodules.
- [ ] B. A workflow where Terraform Cloud is connected to a version control repository (GitHub, GitLab), automatically triggering plans on Pull Requests and applies on merges to main.
- [ ] C. A workflow where developers run plans via email.
- [ ] D. Manually running terraform apply on a laptop.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
In VCS-driven workflows, Terraform Cloud monitors repository webhooks. Committing to branches triggers speculative plans, and merging to the default branch triggers an apply queue.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 04 `[q9_04]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What feature allows you to share reusable sets of variables across multiple workspaces in Terraform Cloud?

- [ ] A. Global tfvars files
- [ ] B. Variable Sets
- [ ] C. Shared Workspaces
- [ ] D. Organization Secrets

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'Variable Sets' in Terraform Cloud allow defining groups of environment or Terraform variables once and applying them automatically to all or selected workspaces across an organization.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 05 `[q9_05]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What are 'Run Triggers' in Terraform Cloud?

- [ ] A. Cron jobs that run every hour.
- [ ] B. A mechanism that automatically triggers a run in a downstream workspace whenever an upstream workspace successfully finishes applying changes.
- [ ] C. Webhooks that alert Slack.
- [ ] D. Shell scripts that execute during init.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Run Triggers establish workspace dependencies. For example, applying changes to a 'networking' workspace can automatically trigger a plan in an 'applications' workspace.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 06 `[q9_06]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

When does Cost Estimation occur during a Terraform Cloud run?

- [ ] A. After the apply has finished and billing is calculated.
- [ ] B. Between the plan phase and the apply phase, allowing teams to review monthly cost impacts before committing changes.
- [ ] C. Only once a month.
- [ ] D. During terraform init.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Cost Estimation runs immediately after the plan is generated. It calculates delta monthly costs for supported cloud resources (AWS, Azure, GCP) so operators can review cost impacts before approving the apply.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 07 `[q9_07]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What is the purpose of 'Cloud Agents' in Terraform Cloud?

- [ ] A. Chatbots that answer Terraform questions.
- [ ] B. Lightweight binaries deployed inside private, isolated data centers or VPCs that execute Terraform plans and applies without exposing private networks to the public internet.
- [ ] C. Background cron jobs.
- [ ] D. Customer support agents.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform Cloud Agents enable managing infrastructure in isolated private networks (e.g. on-prem or private VPCs) without opening inbound firewall ports to the public internet.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 08 `[q9_08]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What is the difference between Terraform Cloud and Terraform Enterprise?

- [ ] A. Terraform Cloud is a SaaS hosted by HashiCorp; Terraform Enterprise is a self-hosted, customer-managed private installation for enterprises with strict data residency requirements.
- [ ] B. Terraform Enterprise is open-source; Terraform Cloud is closed-source.
- [ ] C. Terraform Cloud does not support Sentinel.
- [ ] D. There is no difference.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Terraform Cloud is HashiCorp's fully managed multi-tenant SaaS offering. Terraform Enterprise is the self-hosted distribution that customers install in their own private data centers or clouds.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 09 `[q9_09]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

Which workflow allows developers to run 'terraform plan' and 'terraform apply' locally on their laptops while execution runs remotely on Terraform Cloud?

- [ ] A. CLI-driven workflow
- [ ] B. API-driven workflow
- [ ] C. VCS-driven workflow
- [ ] D. Docker workflow

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
In a CLI-driven workflow, developers use familiar terminal commands ('terraform plan', 'terraform apply'), but execution streams live output from remote Terraform Cloud runners.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 10 `[q9_10]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

How do you configure the Terraform CLI to log in to Terraform Cloud / HCP Terraform?

- [ ] A. terraform auth
- [ ] B. terraform login
- [ ] C. terraform connect
- [ ] D. terraform signup

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform login' opens a browser window to generate an API user token and saves it locally in '~/.terraform.d/credentials.tfrc.json'.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 11 `[q9_11]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

In Terraform Cloud, who can override a 'Soft Mandatory' Sentinel policy violation?

- [ ] A. Any team member with read access.
- [ ] B. Only users belonging to an authorized team with policy override permissions.
- [ ] C. No one; soft mandatory policies can never be overridden.
- [ ] D. The cloud provider.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Soft Mandatory policies halt execution, but permit authorized administrators or designated compliance team members to override the block and proceed with apply.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 12 `[q9_12]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What is the Private Module Registry in Terraform Cloud?

- [ ] A. A registry visible to all HashiCorp customers.
- [ ] B. A secure, internal registry allowing organizations to curate, version, and share approved internal modules across teams while keeping source code private.
- [ ] C. An npm mirror.
- [ ] D. A Docker hub clone.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
The Private Module Registry enables enterprise teams to publish internal modules with semantic versioning and auto-generated documentation, accessible only to organization members.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 13 `[q9_13]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What is an 'API-driven workflow' in Terraform Cloud?

- [ ] A. Using Terraform to build REST APIs.
- [ ] B. Orchestrating workspace runs, variable updates, and applies via external automation tools (like Jenkins, GitHub Actions, or custom scripts) using Terraform Cloud's REST API.
- [ ] C. An obsolete feature.
- [ ] D. Sourcing providers via API.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
An API-driven workflow allows third-party orchestrators (like Jenkins, CircleCI, or custom scripts) to programmatically create workspaces, upload configuration archives, and monitor runs via API.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 14 `[q9_14]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What block in HCL connects a local root module directly to Terraform Cloud?

- [ ] A. cloud block: terraform { cloud { organization = "org" workspaces { name = "ws" } } }
- [ ] B. connect block
- [ ] C. remote_exec block
- [ ] D. registry block

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Terraform 1.1+ introduced the dedicated 'cloud' block inside the 'terraform' block: 'terraform { cloud { organization = "my-org" workspaces { name = "my-app-prod" } } }'.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 15 `[q9_15]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

Can the 'cloud' block and a 'backend' block be declared simultaneously in the same configuration?

- [ ] A. Yes, cloud mirrors to backend.
- [ ] B. No, 'cloud' and 'backend' are mutually exclusive; declaring both produces an error.
- [ ] C. Only if using local backend.
- [ ] D. Yes, in Terraform Enterprise.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
The 'cloud' block is a specialized cloud backend integration. Defining both 'cloud' and 'backend' blocks simultaneously is forbidden.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 16 `[q9_16]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What is 'Drift Detection' in Terraform Cloud?

- [ ] A. Alerts when code formatting is inconsistent.
- [ ] B. Scheduled background assessments that regularly refresh state against real-world infrastructure and notify teams if out-of-band changes occur.
- [ ] C. Automatic deletion of modified resources.
- [ ] D. Upgrading provider versions overnight.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Health / Drift Assessment runs periodic scheduled refreshes without user intervention, alerting teams via Slack, email, or webhooks if infrastructure drifts from code.

🔗 **Recommended Hands-on Exercise:** [`exercises/07-lifecycle-rules`](../exercises/07-lifecycle-rules)

</details>

---

### Question 17 `[q9_17]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

How does Terraform Cloud prevent conflicting concurrent runs in the same workspace?

- [ ] A. It merges concurrent runs together automatically.
- [ ] B. It queues subsequent runs sequentially; only one active run can execute at a time per workspace.
- [ ] C. It cancels the earlier run.
- [ ] D. It generates duplicate cloud resources.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform Cloud workspaces serialize execution: if a run is currently applying, subsequent runs are placed into a queue until the active run finishes and the state lock is released.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 18 `[q9_18]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What is an 'Organization' in Terraform Cloud?

- [ ] A. A Git branch.
- [ ] B. The top-level shared workspace container representing a company or business unit, containing workspaces, teams, policies, and registries.
- [ ] C. A provider plugin.
- [ ] D. An AWS account.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
An Organization is the top-level tenancy boundary in Terraform Cloud. Workspaces, team memberships, billing, variable sets, and policies all belong to an Organization.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 19 `[q9_19]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

Can you use Terraform Cloud for free?

- [ ] A. No, it requires an enterprise subscription.
- [ ] B. Yes, HashiCorp provides a Free Tier that includes state management, VCS integration, and up to 500 managed resources.
- [ ] C. Only for a 14-day trial.
- [ ] D. Only for academic use.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform Cloud offers a generous Free tier suitable for individuals and small teams, including remote state storage, VCS triggers, and up to 500 managed resources.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 20 `[q9_20]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

How do you lock a Terraform Cloud workspace to prevent any applies during maintenance?

- [ ] A. Click 'Lock Workspace' in the workspace settings, which stops all future runs from executing until unlocked.
- [ ] B. Delete the workspace.
- [ ] C. Disconnect Git.
- [ ] D. Set plan = false in HCL.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Administrators can manually lock a workspace in the UI/API, preventing any queued or newly triggered runs from applying until manually unlocked.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 21 `[q9_21]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What is the function of the 'Team & Governance' tier in Terraform Cloud?

- [ ] A. Adds Role-Based Access Control (RBAC), team-based workspace permissions, and Sentinel/OPA policy management.
- [ ] B. Writes code for developers.
- [ ] C. Decreases cloud hosting costs.
- [ ] D. Uninstalls unused modules.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Governance capabilities allow enterprises to enforce granular RBAC (assigning teams to workspaces with read, plan, or admin rights) and Policy as Code compliance gates.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 22 `[q9_22]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

Where does Terraform Cloud store previous versions of your state files?

- [ ] A. Only the latest state is kept; prior versions are discarded.
- [ ] B. It automatically maintains an immutable historical ledger of every state version produced by every run, viewable in the 'States' tab.
- [ ] C. In a local .bak file.
- [ ] D. On floppy disk.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform Cloud stores every state version generated over the life of a workspace, allowing teams to audit changes, view historical diffs, or roll back if necessary.

🔗 **Recommended Hands-on Exercise:** [`exercises/12-state-manipulation`](../exercises/12-state-manipulation)

</details>

---

### Question 23 `[q9_23]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What is a 'Workspace Tag' in Terraform Cloud?

- [ ] A. An AWS tag applied to EC2.
- [ ] B. Metadata labels applied to workspaces for filtering, searching, and scoping variable sets.
- [ ] C. Git commit tag.
- [ ] D. A compiler flag.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Workspace tags are organizational labels in Terraform Cloud (e.g. 'env:prod', 'team:payments') used to filter workspaces and assign targeted Variable Sets.

🔗 **Recommended Hands-on Exercise:** [`exercises/11-workspaces`](../exercises/11-workspaces)

</details>

---

### Question 24 `[q9_24]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What is 'No-Code Provisioning' in HCP Terraform?

- [ ] A. Writing bash scripts instead of Terraform.
- [ ] B. A feature enabling non-technical users to deploy standardized, pre-approved modules from the Private Registry via a web form without writing HCL.
- [ ] C. Using ChatGPT to write plans.
- [ ] D. An obsolete plugin.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
No-Code Provisioning allows platform teams to publish curated modules so developers or operations staff can provision standard environments through a self-service UI.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 25 `[q9_25]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

In a VCS-driven workspace, what happens when you create a branch and open a Pull Request?

- [ ] A. Terraform applies the changes immediately to production.
- [ ] B. A speculative plan runs and the results are posted directly to the PR comments without modifying state.
- [ ] C. Nothing happens until the branch is merged.
- [ ] D. State file is destroyed.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Speculative plans run automatically on PRs, giving reviewers immediate insight into whether code passes plan, what resources will be created/modified, and whether policies pass.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---
