# 📝 Practice Exam 07: Terraform 004 Modern Features

**Domain Focus:** Domain 4, 8  
**Total Questions:** 25 | **Passing Score:** 70% | **Time Limit:** 60 Minutes

> Direct focus on Terraform 004 updates: declarative import blocks, moved blocks, check blocks, terraform test (.tftest.hcl), and terraform_data.

---

## 📖 Instructions
1. Read each question carefully and select your answer.
2. Click the collapsible **Answer & In-Depth Explanation** toggle to check your answer on the fly.
3. Note any weak domains and review the recommended hands-on exercises.

---

### Question 01 `[q7_01]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

What is the declarative 'import' block syntax introduced in Terraform 1.5+?

- [ ] A. import { to = <RESOURCE_ADDRESS> id = "<RESOURCE_ID>" }
- [ ] B. resource_import <RESOURCE_ADDRESS> { id = "<RESOURCE_ID>" }
- [ ] C. import <RESOURCE_ID> as <RESOURCE_ADDRESS>
- [ ] D. terraform_import { target = <RESOURCE_ADDRESS> }

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Terraform 1.5 introduced declarative import blocks in HCL: 'import { to = aws_s3_bucket.my_bucket id = "my-bucket-name" }'. This replaces the imperative CLI-only workflow.

🔗 **Recommended Hands-on Exercise:** [`exercises/16-declarative-import`](../exercises/16-declarative-import)

</details>

---

### Question 02 `[q7_02]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

When using declarative import blocks, how can Terraform 1.5+ automatically generate the initial HCL resource code for imported resources?

- [ ] A. terraform import -auto-generate
- [ ] B. terraform plan -generate-config-out=<FILENAME>.tf
- [ ] C. terraform generate code
- [ ] D. terraform validate -write-hcl

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform plan -generate-config-out=generated.tf' instructs Terraform to inspect the imported resource IDs, query the provider, and generate valid HCL configuration definitions into the specified file.

🔗 **Recommended Hands-on Exercise:** [`exercises/16-declarative-import`](../exercises/16-declarative-import)

</details>

---

### Question 03 `[q7_03]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the syntax of the declarative 'moved' block introduced in Terraform 1.1+?

- [ ] A. moved { from = <SOURCE_ADDRESS> to = <DEST_ADDRESS> }
- [ ] B. rename { old = <SOURCE> new = <DEST> }
- [ ] C. state_mv { source = <SOURCE> destination = <DEST> }
- [ ] D. migrate { <SOURCE> => <DEST> }

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Declarative refactoring uses 'moved { from = local_file.old to = local_file.new }'. During plan, Terraform reconciles state without planning destroys.

🔗 **Recommended Hands-on Exercise:** [`exercises/15-refactoring-with-moved-blocks`](../exercises/15-refactoring-with-moved-blocks)

</details>

---

### Question 04 `[q7_04]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Can 'moved' blocks be used to record the migration of a single standalone resource into a 'for_each' map?

- [ ] A. No, moved blocks only work between standalone resources.
- [ ] B. Yes, using indexing in the 'to' address: moved { from = aws_subnet.public to = aws_subnet.subnets["public"] }.
- [ ] C. Only if the provider supports it.
- [ ] D. Only in Terraform Enterprise.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Moved blocks fully support mapping between single resources and 'for_each' instances: 'moved { from = aws_subnet.a to = aws_subnet.all["a"] }'.

🔗 **Recommended Hands-on Exercise:** [`exercises/15-refactoring-with-moved-blocks`](../exercises/15-refactoring-with-moved-blocks)

</details>

---

### Question 05 `[q7_05]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

What is a 'check' block introduced in Terraform 1.5+?

- [ ] A. A block that compiles HCL into Go binaries.
- [ ] B. A non-blocking continuous validation block that evaluates assertions against overall infrastructure health without halting execution plans.
- [ ] C. A syntax checker that replaces 'terraform validate'.
- [ ] D. An integrity check for the .git repository.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'check' blocks allow continuous validation of infrastructure health (like verifying a website URL returns HTTP 200). Unlike preconditions, check failures produce warnings and do NOT halt the plan or apply.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 06 `[q7_06]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

What happens if an assertion inside a 'check' block fails during 'terraform apply'?

- [ ] A. The entire apply is immediately terminated and rolled back.
- [ ] B. Terraform prints a warning with the error_message, but continues applying other resources normally.
- [ ] C. The resource is marked tainted.
- [ ] D. The state file is deleted.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Check blocks are intentionally non-blocking. If an assertion in a check block fails, Terraform issues a prominent warning message in the terminal output, but continues provisioning.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 07 `[q7_07]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

Which command runs native test files (.tftest.hcl) in modern Terraform (1.6+)?

- [ ] A. terraform run-tests
- [ ] B. terraform test
- [ ] C. terraform verify
- [ ] D. terratest

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform test' is the native test runner introduced in Terraform 1.6+, discovering and executing '.tftest.hcl' test files without needing Go or third-party frameworks.

🔗 **Recommended Hands-on Exercise:** [`exercises/19-testing-framework-tftest`](../exercises/19-testing-framework-tftest)

</details>

---

### Question 08 `[q7_08]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

Inside a '.tftest.hcl' test file, what are the two supported values for the 'command' argument in a 'run' block?

- [ ] A. 'plan' and 'apply'
- [ ] B. 'init' and 'destroy'
- [ ] C. 'build' and 'test'
- [ ] D. 'validate' and 'format'

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
In '.tftest.hcl', each 'run' block specifies 'command = plan' (for fast unit-style assertion checks without creating real infrastructure) or 'command = apply' (for integration tests that create real resources and tear them down).

🔗 **Recommended Hands-on Exercise:** [`exercises/19-testing-framework-tftest`](../exercises/19-testing-framework-tftest)

</details>

---

### Question 09 `[q7_09]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the primary difference between a 'precondition' and a 'postcondition' inside a resource's lifecycle block?

- [ ] A. Preconditions evaluate before evaluating and provisioning the resource; postconditions evaluate after the resource has been provisioned using its computed attributes.
- [ ] B. Preconditions run on destroy; postconditions run on plan.
- [ ] C. Preconditions only work on data sources.
- [ ] D. There is no difference; they are aliases.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'precondition' checks assumptions (such as checking input variables or upstream attributes) BEFORE the resource action runs. 'postcondition' checks guarantees (such as confirming the returned AMI ID or IP address) AFTER the resource action runs.

🔗 **Recommended Hands-on Exercise:** [`exercises/13-validations-and-conditions`](../exercises/13-validations-and-conditions)

</details>

---

### Question 10 `[q7_10]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Which argument in 'terraform_data' triggers resource replacement whenever its value changes?

- [ ] A. replace_on_change
- [ ] B. triggers_replace
- [ ] C. recompute
- [ ] D. force_new

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'triggers_replace' in 'terraform_data' (and lifecycle blocks) accepts an arbitrary list of values or expressions. If any value changes between plans, the resource is marked for replacement.

🔗 **Recommended Hands-on Exercise:** [`exercises/14-terraform-data-and-provisioners`](../exercises/14-terraform-data-and-provisioners)

</details>

---

### Question 11 `[q7_11]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What built-in function safely converts a sensitive value into a non-sensitive value when you explicitly need to expose or hash it?

- [ ] A. decrypt()
- [ ] B. nonsensitive()
- [ ] C. unmask()
- [ ] D. reveal()

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'nonsensitive(var.secret)' removes the sensitive flag from a value, allowing it to be used in non-sensitive contexts (such as hashing with sha256) where Terraform would otherwise block it.

🔗 **Recommended Hands-on Exercise:** [`exercises/20-secrets-and-sensitive-data`](../exercises/20-secrets-and-sensitive-data)

</details>

---

### Question 12 `[q7_12]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the 'sensitive()' function used for in HCL?

- [ ] A. Encrypts a string using TLS.
- [ ] B. Explicitly marks an arbitrary expression or string as sensitive so Terraform will mask it in console output.
- [ ] C. Deletes the string from memory.
- [ ] D. Hides the variable from code editors.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'sensitive(expr)' tags any value as sensitive in Terraform's type system, ensuring that its cleartext value will be redacted from CLI plan and apply output.

🔗 **Recommended Hands-on Exercise:** [`exercises/20-secrets-and-sensitive-data`](../exercises/20-secrets-and-sensitive-data)

</details>

---

### Question 13 `[q7_13]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

Can native 'terraform test' tests mock provider responses without contacting real cloud providers (Terraform 1.7+)?

- [ ] A. No, terraform test must always make real cloud API calls.
- [ ] B. Yes, Terraform 1.7+ introduced mock providers and mock data sources for unit testing without cloud credentials.
- [ ] C. Only with AWS, not with other providers.
- [ ] D. Only in Terraform Enterprise.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform 1.7+ supports provider mocking in '.tftest.hcl' ('mock_provider "aws" { ... }'), allowing comprehensive unit tests of module logic and validations without real cloud credentials.

🔗 **Recommended Hands-on Exercise:** [`exercises/19-testing-framework-tftest`](../exercises/19-testing-framework-tftest)

</details>

---

### Question 14 `[q7_14]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

In Terraform 1.4+, what is the recommended way to store intermediate state or trigger provisioners without external provider dependencies?

- [ ] A. null_resource from hashicorp/null
- [ ] B. terraform_data built-in resource
- [ ] C. dummy_resource
- [ ] D. local_file

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform_data' is a core built-in resource in Terraform 1.4+ that replaces the legacy 'null_resource', eliminating the need to download the external 'hashicorp/null' provider plugin.

🔗 **Recommended Hands-on Exercise:** [`exercises/14-terraform-data-and-provisioners`](../exercises/14-terraform-data-and-provisioners)

</details>

---

### Question 15 `[q7_15]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

How do you specify a custom error message for variable validation?

- [ ] A. msg = "Error text"
- [ ] B. error_message = "The variable must be ... and must start with an uppercase letter and end with a period."
- [ ] C. failure_text = "..."
- [ ] D. on_error = "..."

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Inside a 'validation' block, the 'error_message' attribute provides the custom string printed to the user if 'condition' evaluates to false. HashiCorp convention advises full grammatical sentences.

🔗 **Recommended Hands-on Exercise:** [`exercises/13-validations-and-conditions`](../exercises/13-validations-and-conditions)

</details>

---

### Question 16 `[q7_16]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the purpose of the 'can()' function in validation conditions?

- [ ] A. Grants IAM permissions.
- [ ] B. Evaluates an expression and returns true if it executes without any runtime errors, or false if it errors.
- [ ] C. Checks if the cloud provider is online.
- [ ] D. Tests file permissions.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'can(expr)' suppresses runtime errors and turns them into boolean false. This allows safe probing of functions that would otherwise fail fatally on invalid input (like regex matching).

🔗 **Recommended Hands-on Exercise:** [`exercises/13-validations-and-conditions`](../exercises/13-validations-and-conditions)

</details>

---

### Question 17 `[q7_17]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

You want to refactor a module: you moved 'aws_instance.app' from the root module into 'module.compute.aws_instance.app'. What 'moved' block achieves this?

- [ ] A. moved { from = aws_instance.app to = module.compute.aws_instance.app }
- [ ] B. moved { from = module.compute.aws_instance.app to = aws_instance.app }
- [ ] C. migrate { source = aws_instance.app target = module.compute.aws_instance.app }
- [ ] D. moved aws_instance.app -> module.compute.aws_instance.app

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Declarative 'moved' syntax sets 'from = <OLD_ADDRESS>' and 'to = <NEW_ADDRESS>'. Here, 'from = aws_instance.app to = module.compute.aws_instance.app' safely migrates the state record into the module.

🔗 **Recommended Hands-on Exercise:** [`exercises/15-refactoring-with-moved-blocks`](../exercises/15-refactoring-with-moved-blocks)

</details>

---

### Question 18 `[q7_18]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

What is the result of running 'terraform test' when all assertions pass?

- [ ] A. An exit code of 0 and a summary showing each test file and run block as PASS.
- [ ] B. It automatically applies the changes to production.
- [ ] C. It commits the changes to Git.
- [ ] D. It generates a tfplan.binary.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
On success, 'terraform test' prints green PASS indicators for each '.tftest.hcl' run block, reports total passed runs, and exits with code 0.

🔗 **Recommended Hands-on Exercise:** [`exercises/19-testing-framework-tftest`](../exercises/19-testing-framework-tftest)

</details>

---

### Question 19 `[q7_19]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

In Terraform 1.6+, how can you define an assertion in a '.tftest.hcl' run block?

- [ ] A. assert { condition = output.status == "active" error_message = "Status must be active." }
- [ ] B. expect { output.status == "active" }
- [ ] C. verify { condition = ... }
- [ ] D. test_assert(output.status == "active")

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Each 'run' block contains one or more 'assert' blocks with 'condition' (boolean expression) and 'error_message' (string message shown if condition is false).

🔗 **Recommended Hands-on Exercise:** [`exercises/19-testing-framework-tftest`](../exercises/19-testing-framework-tftest)

</details>

---

### Question 20 `[q7_20]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What happens if a 'precondition' inside a resource block fails during 'terraform plan'?

- [ ] A. Terraform issues a warning and proceeds with apply.
- [ ] B. Terraform halts immediately with an error displaying the custom error_message, preventing an invalid plan.
- [ ] C. Terraform retries 3 times.
- [ ] D. The resource is destroyed.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Preconditions are guardrails. If a precondition evaluates to false, planning halts immediately with an error, preventing misconfigured resources from ever reaching the apply stage.

🔗 **Recommended Hands-on Exercise:** [`exercises/13-validations-and-conditions`](../exercises/13-validations-and-conditions)

</details>

---

### Question 21 `[q7_21]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

Can declarative 'import' blocks import multiple resources in the same execution plan?

- [ ] A. No, only one resource per plan.
- [ ] B. Yes, you can declare as many 'import' blocks as needed in your configuration, and Terraform will plan all imports concurrently.
- [ ] C. Only up to 5.
- [ ] D. Only if all resources share the same ID.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Unlike the legacy single-resource CLI 'terraform import', declarative 'import' blocks can be declared multiple times in HCL, allowing batch imports across entire infrastructures in a single plan/apply.

🔗 **Recommended Hands-on Exercise:** [`exercises/16-declarative-import`](../exercises/16-declarative-import)

</details>

---

### Question 22 `[q7_22]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Where can a 'check' block be defined in a Terraform configuration?

- [ ] A. Only inside a resource block.
- [ ] B. As a top-level block in any .tf file in the root module.
- [ ] C. Only inside terraform.tfstate.
- [ ] D. Only inside .tftest.hcl.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'check' is a top-level block (e.g. 'check "health_check" { ... }') defined in '.tf' files alongside resources, data sources, and modules.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 23 `[q7_23]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the benefit of committing 'moved' blocks to your Git repository?

- [ ] A. It documents architectural renames in code and ensures that all other team members and automated CI/CD pipelines will automatically update their state without manual state surgery.
- [ ] B. It encrypts the Git commit.
- [ ] C. It speeds up provider downloads.
- [ ] D. It prevents git merge conflicts.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Because 'moved' blocks live directly in version-controlled HCL code, every team member and automated pipeline gets the state migration applied automatically during their next 'terraform apply', eliminating coordinated manual CLI migrations.

🔗 **Recommended Hands-on Exercise:** [`exercises/15-refactoring-with-moved-blocks`](../exercises/15-refactoring-with-moved-blocks)

</details>

---

### Question 24 `[q7_24]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What happens once all team members have applied a 'moved' block migration?

- [ ] A. The moved block must remain in the code forever or state is lost.
- [ ] B. The moved block can safely be deleted in a future release once all environments have applied the change.
- [ ] C. Terraform locks the file.
- [ ] D. The resource must be tainted.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'moved' blocks are only needed while environments are transitioning from the old address to the new address. Once all environments (dev, stage, prod) have applied the move, the 'moved' block can be safely removed.

🔗 **Recommended Hands-on Exercise:** [`exercises/15-refactoring-with-moved-blocks`](../exercises/15-refactoring-with-moved-blocks)

</details>

---

### Question 25 `[q7_25]`
*🏷️ Domain 4: Use Terraform Outside the Core Workflow*

What does 'terraform plan -generate-config-out' do if the target file already exists?

- [ ] A. Overwrites it silently.
- [ ] B. Halts with an error to prevent accidental overwriting of existing code.
- [ ] C. Appends code to the end.
- [ ] D. Creates a backup file.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
To prevent accidental loss of existing code, Terraform returns an error if the file path specified in '-generate-config-out' already exists.

🔗 **Recommended Hands-on Exercise:** [`exercises/16-declarative-import`](../exercises/16-declarative-import)

</details>

---
