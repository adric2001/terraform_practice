# 📝 Practice Exam 08: Security, Secrets & State Hygiene

**Domain Focus:** Domain 7, 8, 9  
**Total Questions:** 25 | **Passing Score:** 70% | **Time Limit:** 60 Minutes

> Security engineering: sensitive values masking, state encryption, Vault integration, Sentinel/OPA governance, and least-privilege IAM.

---

## 📖 Instructions
1. Read each question carefully and select your answer.
2. Click the collapsible **Answer & In-Depth Explanation** toggle to check your answer on the fly.
3. Note any weak domains and review the recommended hands-on exercises.

---

### Question 01 `[q8_01]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

A variable has 'sensitive = true'. How is its value rendered in the terminal output of 'terraform plan'?

- [ ] A. Plaintext
- [ ] B. (sensitive value)
- [ ] C. ********
- [ ] D. Base64 encoded

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform replaces sensitive values in terminal plan and apply output with the redaction placeholder '(sensitive value)'.

🔗 **Recommended Hands-on Exercise:** [`exercises/02-variables-and-outputs`](../exercises/02-variables-and-outputs)

</details>

---

### Question 02 `[q8_02]`
*🏷️ Domain 7: Implement and Maintain State*

True or False: Marking a variable as 'sensitive = true' encrypts its value within the 'terraform.tfstate' file.

- [ ] A. True, Terraform uses AES-256 state encryption by default.
- [ ] B. False, the 'sensitive' flag only affects CLI display outputs; the value is still stored in plaintext JSON inside the state file.
- [ ] C. True, but only if using AWS S3.
- [ ] D. True, if using Terraform 1.5+.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
This is one of the most critical security points tested on the exam. The 'sensitive' flag ONLY masks terminal console output; it does NOT encrypt values in the state file. State storage must be encrypted via backend mechanisms.

🔗 **Recommended Hands-on Exercise:** [`exercises/20-secrets-and-sensitive-data`](../exercises/20-secrets-and-sensitive-data)

</details>

---

### Question 03 `[q8_03]`
*🏷️ Domain 3: Understand Terraform Basics*

Which of the following is considered an insecure anti-pattern for authenticating the AWS provider?

- [ ] A. Hardcoding 'access_key' and 'secret_key' directly inside the provider "aws" block in HCL code.
- [ ] B. Using environment variables: AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.
- [ ] C. Using an AWS IAM Instance Profile on an EC2 build agent.
- [ ] D. Using OpenID Connect (OIDC) between GitHub Actions and AWS IAM.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Hardcoding cleartext cloud credentials into '.tf' files exposes secrets to anyone with repository access and risks accidental leakage to public version control.

🔗 **Recommended Hands-on Exercise:** [`exercises/20-secrets-and-sensitive-data`](../exercises/20-secrets-and-sensitive-data)

</details>

---

### Question 04 `[q8_04]`
*🏷️ Domain 7: Implement and Maintain State*

What measures should be implemented to protect a remote Amazon S3 state backend? (Select the most complete security baseline)

- [ ] A. Enable default Server-Side Encryption (KMS or AES-256), enable S3 Bucket Versioning, enable S3 Block Public Access, and enforce TLS via bucket policy.
- [ ] B. Set S3 bucket permissions to public read.
- [ ] C. Disable versioning to save money.
- [ ] D. Store the S3 secret key in a local text file.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Standard security baseline for S3 state storage: 1. Server-side encryption (KMS/AES); 2. S3 versioning (for rollback & recovery); 3. Block all public access; 4. Bucket policy enforcing aws:SecureTransport (TLS); 5. Principle of least privilege IAM.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 05 `[q8_05]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

You attempt to write an output value that references a database password: output "pwd" { value = aws_db_instance.db.password }. Why does 'terraform plan' fail?

- [ ] A. Output variables cannot reference databases.
- [ ] B. Because the database password attribute is marked sensitive by the provider, Terraform requires the output block to also specify 'sensitive = true'.
- [ ] C. Passwords can only be exported as integers.
- [ ] D. Database passwords cannot be managed by Terraform.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform enforces sensitive attribute propagation: any output that exposes a sensitive value must explicitly acknowledge it by declaring 'sensitive = true'.

🔗 **Recommended Hands-on Exercise:** [`exercises/02-variables-and-outputs`](../exercises/02-variables-and-outputs)

</details>

---

### Question 06 `[q8_06]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

How can you view the actual plaintext value of a sensitive output from the command line after applying?

- [ ] A. terraform output -reveal <NAME>
- [ ] B. terraform output -raw <NAME> (or terraform output -json)
- [ ] C. terraform decrypt
- [ ] D. Sensitive outputs cannot ever be viewed from the CLI.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
While 'terraform output' masks sensitive outputs in human-readable summary view, passing '-raw <NAME>' or '-json' explicitly extracts the actual value for automated workflows.

🔗 **Recommended Hands-on Exercise:** [`exercises/02-variables-and-outputs`](../exercises/02-variables-and-outputs)

</details>

---

### Question 07 `[q8_07]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

What Policy as Code engines are natively integrated into Terraform Cloud / Enterprise for security compliance guardrails?

- [ ] A. Sentinel and Open Policy Agent (OPA)
- [ ] B. Ansible Lint
- [ ] C. SonarQube only
- [ ] D. ESLint

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Terraform Cloud/Enterprise supports two native Policy as Code frameworks: HashiCorp Sentinel and Open Policy Agent (OPA using Rego). Both inspect planned changes before apply.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 08 `[q8_08]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

In Sentinel, what are the three policy enforcement levels?

- [ ] A. Low, Medium, High
- [ ] B. Advisory, Soft Mandatory, Hard Mandatory
- [ ] C. Optional, Strict, Enforced
- [ ] D. Warning, Block, Delete

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Sentinel policies have three levels: Advisory (prints warning, never blocks), Soft Mandatory (blocks apply unless an authorized user overrides), and Hard Mandatory (strictly blocks apply, cannot be overridden).

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 09 `[q8_09]`
*🏷️ Domain 3: Understand Terraform Basics*

Which file should ALWAYS be added to .gitignore in every Terraform project to prevent leaking secrets?

- [ ] A. main.tf
- [ ] B. *.tfvars and *.tfvars.json (except .example files), along with *.tfstate
- [ ] C. README.md
- [ ] D. outputs.tf

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform.tfvars' files often contain real database passwords, API keys, and environment tokens. They should be ignored by Git; only sanitized templates (e.g. 'terraform.tfvars.example') should be committed.

🔗 **Recommended Hands-on Exercise:** [`exercises/02-variables-and-outputs`](../exercises/02-variables-and-outputs)

</details>

---

### Question 10 `[q8_10]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

You need to retrieve database credentials dynamically from HashiCorp Vault at runtime. What Terraform construct should you use?

- [ ] A. Hardcode the Vault root token in main.tf.
- [ ] B. Use the HashiCorp Vault provider with a data source (e.g. data "vault_generic_secret" or data "vault_kv_secret_v2").
- [ ] C. Store credentials in local text files.
- [ ] D. Terraform cannot integrate with Vault.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Integrating with HashiCorp Vault via the 'hashicorp/vault' provider allows fetching ephemeral, rotated secrets via data sources directly during plan/apply without storing static credentials in HCL.

🔗 **Recommended Hands-on Exercise:** [`exercises/20-secrets-and-sensitive-data`](../exercises/20-secrets-and-sensitive-data)

</details>

---

### Question 11 `[q8_11]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the purpose of setting 'file_permission = "0600"' when managing local credentials files with the 'local_file' provider?

- [ ] A. Allows anyone on the network to read the file.
- [ ] B. Restricts read/write permissions strictly to the file owner, preventing other local system users from viewing secrets.
- [ ] C. Encrypts the file with GPG.
- [ ] D. Marks the file as read-only.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
On Unix systems, permissions '0600' (rw-------) restrict read and write access exclusively to the file owner, following principle of least privilege on shared build agents.

🔗 **Recommended Hands-on Exercise:** [`exercises/04-resource-dependencies`](../exercises/04-resource-dependencies)

</details>

---

### Question 12 `[q8_12]`
*🏷️ Domain 7: Implement and Maintain State*

What feature introduced in Terraform 1.4+ provides state file encryption at rest in HCP Terraform?

- [ ] A. Native Vault KMS encryption with customer-managed keys.
- [ ] B. Password protected zip files.
- [ ] C. Git commit signing.
- [ ] D. TLS 1.0.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
HCP Terraform encrypts state files both in transit and at rest using HashiCorp Vault, and supports Customer-Managed Encryption Keys (CMEK) for enterprise regulatory compliance.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 13 `[q8_13]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

A team uses 'provisioner "local-exec"' that logs a database connection string containing a password. What is the security consequence?

- [ ] A. The password is automatically hidden.
- [ ] B. The password will be printed in plaintext in console stdout, appearing in CI/CD pipeline build logs and log aggregators.
- [ ] C. The build agent crashes.
- [ ] D. The cloud provider rejects the connection.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Commands executed in 'local-exec' print their stdout/stderr directly to the terminal and CI build logs. If secrets are passed as arguments or printed by scripts, they are exposed in CI logs.

🔗 **Recommended Hands-on Exercise:** [`exercises/14-terraform-data-and-provisioners`](../exercises/14-terraform-data-and-provisioners)

</details>

---

### Question 14 `[q8_14]`
*🏷️ Domain 3: Understand Terraform Basics*

What is the purpose of the 'TF_CLI_CONFIG_FILE' environment variable?

- [ ] A. Overrides the default location of the CLI configuration file (~/.terraformrc or terraform.rc).
- [ ] B. Sets the cloud API URL.
- [ ] C. Defines the Git repository URL.
- [ ] D. Points to terraform.tfstate.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'TF_CLI_CONFIG_FILE' specifies a custom file path for the CLI configuration file, useful in automated CI containers where home directory write access is restricted.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 15 `[q8_15]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

How can you securely generate a cryptographic private key directly in Terraform without installing external OpenSSL utilities?

- [ ] A. Use the 'hashicorp/tls' provider with 'tls_private_key'.
- [ ] B. Use bash scripts with local-exec.
- [ ] C. Generate keys in the AWS console manually.
- [ ] D. Terraform cannot generate keys.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
The official 'hashicorp/tls' provider provides resources like 'tls_private_key' and 'tls_self_signed_cert' to manage in-memory cryptographic keys and certificates natively.

🔗 **Recommended Hands-on Exercise:** [`exercises/20-secrets-and-sensitive-data`](../exercises/20-secrets-and-sensitive-data)

</details>

---

### Question 16 `[q8_16]`
*🏷️ Domain 7: Implement and Maintain State*

Who should be granted IAM write access to the S3 bucket hosting your production Terraform state?

- [ ] A. Every developer in the company.
- [ ] B. Only the dedicated CI/CD execution pipeline role and designated break-glass administrators.
- [ ] C. Anonymous public internet users.
- [ ] D. All AWS Lambda functions in the account.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Strict least privilege: only the CI/CD pipeline identity (and a break-glass IAM role) should have write access to production state. Individual developers should have read-only access or access restricted through Terraform Cloud.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 17 `[q8_17]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What happens if you mark an input variable as sensitive: variable "api_key" { type = string, sensitive = true }, and reference it in a non-sensitive local?

- [ ] A. The local value automatically inherits the sensitive designation.
- [ ] B. The sensitive flag is dropped.
- [ ] C. Terraform throws a compilation error.
- [ ] D. The local becomes null.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Terraform tracks sensitivity through expressions. Any derived value, local, or resource argument that incorporates a sensitive value automatically becomes sensitive itself.

🔗 **Recommended Hands-on Exercise:** [`exercises/20-secrets-and-sensitive-data`](../exercises/20-secrets-and-sensitive-data)

</details>

---

### Question 18 `[q8_18]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

What is the security risk of sharing the output of 'terraform graph' on a public forum?

- [ ] A. It exposes your private SSH keys.
- [ ] B. It maps out your entire internal architectural topology, resource names, subnets, and dependency relationships.
- [ ] C. It permits anyone to execute terraform apply.
- [ ] D. There is zero risk.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform graph' produces a detailed schematic of all internal infrastructure components, security groups, database tiers, and interconnections, which constitutes sensitive architectural intelligence.

🔗 **Recommended Hands-on Exercise:** [`exercises/04-resource-dependencies`](../exercises/04-resource-dependencies)

</details>

---

### Question 19 `[q8_19]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Which of the following functions can be used to generate a non-sensitive hash of a sensitive secret for audit tracking without revealing the secret?

- [ ] A. sha256(nonsensitive(var.db_password))
- [ ] B. reveal(var.db_password)
- [ ] C. unmask(var.db_password)
- [ ] D. hash(var.db_password)

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Because 'sha256()' cannot directly take a sensitive string without keeping the output sensitive, wrapping the secret in 'nonsensitive()' allows calculating a non-sensitive cryptographic fingerprint.

🔗 **Recommended Hands-on Exercise:** [`exercises/20-secrets-and-sensitive-data`](../exercises/20-secrets-and-sensitive-data)

</details>

---

### Question 20 `[q8_20]`
*🏷️ Domain 3: Understand Terraform Basics*

What does Terraform do if a downloaded provider binary's checksum does not match the checksums recorded in '.terraform.lock.hcl'?

- [ ] A. Automatically updates the lock file.
- [ ] B. Halts 'terraform init' with a security verification error indicating possible tampering or supply-chain attack.
- [ ] C. Prompts for an administrator password.
- [ ] D. Deletes the provider.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
The lock file verifies cryptographic integrity. A mismatch triggers a security error ('Provider checksum mismatch'), preventing malicious or corrupted binaries from executing.

🔗 **Recommended Hands-on Exercise:** [`exercises/01-first-resource`](../exercises/01-first-resource)

</details>

---

### Question 21 `[q8_21]`
*🏷️ Domain 9: Understand Terraform Cloud/Enterprise Capabilities*

How are environment variables and Terraform variables secured in Terraform Cloud workspaces?

- [ ] A. They can be marked as 'Sensitive', which masks them in the UI and encrypts them using HashiCorp Vault.
- [ ] B. They are saved in git commits.
- [ ] C. They are written to cleartext text files.
- [ ] D. They are shared publicly with all users.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Variables configured in Terraform Cloud workspaces can be toggled as 'Sensitive'. Once saved, their values cannot be viewed by anyone in the UI or API and are encrypted at rest with Vault.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 22 `[q8_22]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Can resource lifecycle rules be configured to ignore drift caused by automated cloud security scanners updating instance tags?

- [ ] A. Yes, using lifecycle { ignore_changes = [tags, tags_all] }.
- [ ] B. No, Terraform must always enforce tags.
- [ ] C. Only by running terraform destroy.
- [ ] D. Only with local providers.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'ignore_changes = [tags, tags_all]' prevents Terraform from attempting to strip out tags added out-of-band by cloud security scanners, cost tracking agents, or IT compliance tools.

🔗 **Recommended Hands-on Exercise:** [`exercises/07-lifecycle-rules`](../exercises/07-lifecycle-rules)

</details>

---

### Question 23 `[q8_23]`
*🏷️ Domain 7: Implement and Maintain State*

What is the purpose of rotating state backend credentials periodically?

- [ ] A. It reduces the size of the state file.
- [ ] B. Limits the lifespan of credentials in the event of accidental exposure or compromise.
- [ ] C. Required by the HCL compiler every 90 days.
- [ ] D. Improves apply performance.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Rotating credentials limits the attack window if an access key is inadvertently logged or exposed, conforming to defense-in-depth principles.

🔗 **Recommended Hands-on Exercise:** [`exercises/17-remote-backends-and-locking`](../exercises/17-remote-backends-and-locking)

</details>

---

### Question 24 `[q8_24]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Why should you avoid using plain 'exec' provisioners with credentials passed as raw strings in command arguments?

- [ ] A. Exec provisioners are slow.
- [ ] B. Command arguments appear in system process tables ('ps aux') on the executing machine, which can be inspected by other users.
- [ ] C. Terraform CLI disables all provisioners by default.
- [ ] D. Passwords cannot contain numbers.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
On Unix systems, arguments passed to shell commands are visible in the process table to other local users via 'ps' or monitoring utilities, creating a local credential exposure vulnerability.

🔗 **Recommended Hands-on Exercise:** [`exercises/14-terraform-data-and-provisioners`](../exercises/14-terraform-data-and-provisioners)

</details>

---

### Question 25 `[q8_25]`
*🏷️ Domain 7: Implement and Maintain State*

What should you do if an unencrypted state file was accidentally committed to a public Git repository?

- [ ] A. Delete the commit using git rm and assume it is safe.
- [ ] B. Treat all credentials, certificates, and secrets contained in that state file as fully compromised: immediately rotate all credentials, rewrite Git history, and invalidate exposed keys.
- [ ] C. Rename the file to .txt.
- [ ] D. Mark the repository private.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Once a secret is committed to a public repository, bots index it within seconds. Simply deleting the file or making the repo private is insufficient; all exposed credentials must be treated as compromised and immediately rotated.

🔗 **Recommended Hands-on Exercise:** [`exercises/20-secrets-and-sensitive-data`](../exercises/20-secrets-and-sensitive-data)

</details>

---
