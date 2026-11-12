# 📝 Practice Exam 05: Modules, Registries & Architecture

**Domain Focus:** Domain 5  
**Total Questions:** 25 | **Passing Score:** 70% | **Time Limit:** 60 Minutes

> Complete examination on child modules, encapsulation, registries, sources, versioning, and architectural patterns.

---

## 📖 Instructions
1. Read each question carefully and select your answer.
2. Click the collapsible **Answer & In-Depth Explanation** toggle to check your answer on the fly.
3. Note any weak domains and review the recommended hands-on exercises.

---

### Question 01 `[q5_01]`
*🏷️ Domain 5: Interact with Terraform Modules*

What constitutes a 'Root Module' in Terraform?

- [ ] A. A special module downloaded from the HashiCorp private registry.
- [ ] B. The working directory containing the .tf files where the Terraform CLI is executed.
- [ ] C. The module located at '/root/' on Linux.
- [ ] D. A module that does not declare any input variables.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Every Terraform configuration has at least one module known as the root module, which consists of the resources and files in the directory where 'terraform' CLI commands are run.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 02 `[q5_02]`
*🏷️ Domain 5: Interact with Terraform Modules*

What is the standard naming convention for a repository to be published to the public Terraform Registry?

- [ ] A. terraform-<PROVIDER>-<NAME>
- [ ] B. module-<NAME>-<PROVIDER>
- [ ] C. tf-module-<NAME>
- [ ] D. hashicorp-<NAME>

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
The public Terraform Registry requires repository names to follow the exact format 'terraform-<PROVIDER>-<NAME>', such as 'terraform-aws-vpc'.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 03 `[q5_03]`
*🏷️ Domain 5: Interact with Terraform Modules*

You want to call a module from a Git repository and pin it to a specific tag 'v2.1.0'. What is the correct syntax for the 'source' argument?

- [ ] A. source = "git::https://github.com/org/repo.git?ref=v2.1.0"
- [ ] B. source = "git::https://github.com/org/repo.git#v2.1.0"
- [ ] C. source = "https://github.com/org/repo.git/tags/v2.1.0"
- [ ] D. source = "git::https://github.com/org/repo.git@v2.1.0"

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
For Git repositories, the '?ref=' query parameter specifies the branch, tag, or commit hash to check out: 'git::https://github.com/org/repo.git?ref=v2.1.0'.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 04 `[q5_04]`
*🏷️ Domain 5: Interact with Terraform Modules*

In a monorepo containing multiple modules in subdirectories, what syntax points to a specific subdirectory within a Git source?

- [ ] A. git::https://example.com/repo.git//modules/vpc
- [ ] B. git::https://example.com/repo.git/modules/vpc
- [ ] C. git::https://example.com/repo.git#subdir=modules/vpc
- [ ] D. git::https://example.com/repo.git:modules/vpc

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Terraform uses a special double-slash '//' separator to indicate a subdirectory inside a Git repository clone: 'git::https://example.com/repo.git//modules/vpc'.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 05 `[q5_05]`
*🏷️ Domain 5: Interact with Terraform Modules*

Why is it an anti-pattern to declare provider blocks inside reusable shared child modules?

- [ ] A. Providers inside child modules increase network bandwidth.
- [ ] B. Child modules should inherit providers from the root module; declaring providers inside child modules makes them difficult to reuse, complicates provider aliasing, and breaks destruction order.
- [ ] C. Terraform CLI throws a compilation error if any provider is in a child module.
- [ ] D. Providers can only be downloaded in the root module directory.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Reusable child modules should only declare 'required_providers' (specifying version and source constraints). Declaring concrete 'provider' blocks with credentials or regions inside child modules couples them tightly and prevents clean provider inheritance.

🔗 **Recommended Hands-on Exercise:** [`exercises/18-multi-provider-aliasing`](../exercises/18-multi-provider-aliasing)

</details>

---

### Question 06 `[q5_06]`
*🏷️ Domain 5: Interact with Terraform Modules*

How do you pass an aliased provider 'aws.west' from the root module to a child module expecting provider 'aws'?

- [ ] A. providers = { aws = aws.west }
- [ ] B. provider = aws.west
- [ ] C. alias = aws.west
- [ ] D. aws_provider = aws.west

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Child modules accept provider configurations via the 'providers' map argument: 'module "app" { source = "..." providers = { aws = aws.west } }'.

🔗 **Recommended Hands-on Exercise:** [`exercises/18-multi-provider-aliasing`](../exercises/18-multi-provider-aliasing)

</details>

---

### Question 07 `[q5_07]`
*🏷️ Domain 5: Interact with Terraform Modules*

Can you use 'for_each' on a 'module' block in modern Terraform?

- [ ] A. No, for_each is only allowed on resource blocks.
- [ ] B. Yes, for_each can instantiate multiple instances of a module based on a map or set.
- [ ] C. Yes, but only with local modules, not registry modules.
- [ ] D. Yes, but only in Terraform Enterprise.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform 0.13+ introduced support for 'for_each' and 'count' on 'module' blocks. Each module instance is keyed by the map key (e.g. 'module.service["auth"]').

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 08 `[q5_08]`
*🏷️ Domain 5: Interact with Terraform Modules*

What is the purpose of the 'required_providers' block inside a child module?

- [ ] A. It specifies credentials for the cloud provider.
- [ ] B. It defines the source and version requirements for provider plugins that the child module requires to operate properly.
- [ ] C. It downloads providers immediately without needing 'terraform init'.
- [ ] D. It replaces the root module's provider configuration.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
A child module's 'required_providers' block specifies the provider local name, FQCN source (e.g. 'hashicorp/aws'), and version constraints required by the module.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 09 `[q5_09]`
*🏷️ Domain 5: Interact with Terraform Modules*

What is the effect of setting 'depends_on = [module.database]' inside a 'module.backend' block?

- [ ] A. It compiles both modules into a single binary.
- [ ] B. It ensures that all resources inside module.database are completely provisioned before any resource inside module.backend begins creation.
- [ ] C. It shares variables automatically between both modules.
- [ ] D. It merges the state files of both modules.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Setting 'depends_on' on a module block creates an explicit module-to-module dependency. All resources inside the upstream module must complete provisioning before any resource in the downstream module begins.

🔗 **Recommended Hands-on Exercise:** [`exercises/04-resource-dependencies`](../exercises/04-resource-dependencies)

</details>

---

### Question 10 `[q5_10]`
*🏷️ Domain 5: Interact with Terraform Modules*

Which files are considered standard conventions for any well-structured Terraform module?

- [ ] A. main.tf, variables.tf, outputs.tf, README.md
- [ ] B. index.js, package.json, docker-compose.yml
- [ ] C. terraform.exe, config.yaml, setup.sh
- [ ] D. app.tf, run.tf, end.tf

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
HashiCorp's official standard module structure recommends: 'main.tf' (primary resources), 'variables.tf' (input variable declarations), 'outputs.tf' (exported outputs), and 'README.md' (documentation).

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 11 `[q5_11]`
*🏷️ Domain 5: Interact with Terraform Modules*

How are resources inside a child module addressed in state?

- [ ] A. module.<MODULE_NAME>.<RESOURCE_TYPE>.<RESOURCE_NAME>
- [ ] B. <RESOURCE_TYPE>.<RESOURCE_NAME>
- [ ] C. <MODULE_NAME>#<RESOURCE_NAME>
- [ ] D. child.<MODULE_NAME>.<RESOURCE_NAME>

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Resources managed within a child module are prefixed with 'module.<MODULE_NAME>.', e.g. 'module.vpc.aws_subnet.public_1'. If nested, they chain: 'module.outer.module.inner.resource_type.name'.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 12 `[q5_12]`
*🏷️ Domain 5: Interact with Terraform Modules*

What happens if a child module has an input variable with no default value and the root module does not provide a value when calling it?

- [ ] A. The variable defaults to null.
- [ ] B. Terraform halts during plan/validation with an error stating that a required argument is missing.
- [ ] C. Terraform prompts interactively on the command line for the child module variable.
- [ ] D. The resource inside the module is skipped.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
If a child module variable does not specify a 'default' attribute, it is a required input. Omitting it when calling the module results in an immediate validation error during plan.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 13 `[q5_13]`
*🏷️ Domain 5: Interact with Terraform Modules*

You want to download and install new versions of Git-based child modules without re-initializing the backend. Which command is quickest?

- [ ] A. terraform get -update
- [ ] B. terraform sync
- [ ] C. terraform pull
- [ ] D. git pull

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'terraform get -update' downloads and updates all referenced child modules according to their source settings without running full backend configuration.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 14 `[q5_14]`
*🏷️ Domain 5: Interact with Terraform Modules*

What is the three-part source identifier format for a module hosted on the official public Terraform Registry?

- [ ] A. <NAMESPACE>/<NAME>/<PROVIDER>
- [ ] B. <NAME>/<VERSION>/<REGION>
- [ ] C. <AUTHOR>/<MODULE>
- [ ] D. <REGISTRY>/<PROJECT>/<RESOURCE>

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Modules on the public registry use '<NAMESPACE>/<NAME>/<PROVIDER>', e.g. 'terraform-aws-modules/vpc/aws'.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 15 `[q5_15]`
*🏷️ Domain 5: Interact with Terraform Modules*

How does Terraform treat an internal resource declared inside a child module that is NOT defined in outputs.tf?

- [ ] A. The resource is public and accessible anywhere in root.
- [ ] B. The resource is encapsulated (private) within the child module and cannot be accessed by the calling module.
- [ ] C. The resource is deleted during apply.
- [ ] D. The resource cannot be provisioned.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Encapsulation is a core module principle: resources inside a child module are completely private to that module. The only way the calling root module can access any value is if the child module explicitly exports it via an 'output' block.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 16 `[q5_16]`
*🏷️ Domain 5: Interact with Terraform Modules*

What happens if you run 'terraform apply' on a configuration where a child module source path does not exist?

- [ ] A. Terraform skips that module.
- [ ] B. 'terraform init' will fail during the module installation phase with a missing source error.
- [ ] C. Terraform builds a blank placeholder module.
- [ ] D. Terraform searches GitHub for a matching name.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Module installation occurs during 'terraform init'. If a module source path cannot be resolved or found on disk/remotely, initialization terminates with a fatal error.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 17 `[q5_17]`
*🏷️ Domain 5: Interact with Terraform Modules*

Can child modules access local values ('locals') defined in the root module?

- [ ] A. Yes, all locals are globally scoped across all modules.
- [ ] B. No, locals are scoped strictly to the module in which they are declared; they must be passed explicitly as variable inputs.
- [ ] C. Yes, if referenced as root.local.<NAME>.
- [ ] D. Only if defined in a file named global.tf.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Locals have strictly local module scope. They are not inherited by child modules. To share a local value with a child module, pass it explicitly as an input variable argument.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 18 `[q5_18]`
*🏷️ Domain 5: Interact with Terraform Modules*

Which of the following source strings represents a module hosted on a private Terraform Cloud / Enterprise registry?

- [ ] A. app.terraform.io/my-org/vpc/aws
- [ ] B. registry://my-org-vpc-aws
- [ ] C. terraform-cloud::vpc/aws
- [ ] D. private.registry/vpc

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Modules in private registries (such as Terraform Cloud) include the registry hostname as the first component: '<HOSTNAME>/<ORGANIZATION>/<NAME>/<PROVIDER>'.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 19 `[q5_19]`
*🏷️ Domain 5: Interact with Terraform Modules*

What is the recommended practice when calling registry modules in production configurations?

- [ ] A. Omit the version argument so you always automatically pull the latest untested code.
- [ ] B. Always pin the module to an exact or constrained semantic version (e.g. version = "~> 5.1.0").
- [ ] C. Copy the entire registry code manually into your root main.tf.
- [ ] D. Pin to version = "latest".

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Always pin module versions in production. If you omit the version, 'terraform init' downloads the newest release, which may introduce breaking changes unexpectedly.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 20 `[q5_20]`
*🏷️ Domain 5: Interact with Terraform Modules*

What is an 'embedded module' or 'submodule'?

- [ ] A. A module embedded inside a compiled Go binary.
- [ ] B. A child module contained within a subfolder of another parent module (often located in a 'modules/' subdirectory).
- [ ] C. A module that can only run in Docker.
- [ ] D. A deprecated feature in Terraform 1.0.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
A submodule is a child module located within a subfolder of a larger parent repository (commonly in a 'modules/' directory), providing optional specialized capabilities (e.g. 'terraform-aws-vpc/modules/vpc-endpoints').

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 21 `[q5_21]`
*🏷️ Domain 5: Interact with Terraform Modules*

Can a child module declare outputs without any descriptions?

- [ ] A. Yes, but providing a description is considered an industry best practice for documentation.
- [ ] B. No, Terraform raises an error if an output lacks a description.
- [ ] C. Only if the output is sensitive.
- [ ] D. Only in root modules.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
While 'description' is optional in HCL syntax, documenting outputs is strongly recommended because registry documentation generators (like terraform-docs) use them to create module documentation.

🔗 **Recommended Hands-on Exercise:** [`exercises/02-variables-and-outputs`](../exercises/02-variables-and-outputs)

</details>

---

### Question 22 `[q5_22]`
*🏷️ Domain 5: Interact with Terraform Modules*

You have a module call: module "cluster" { source = "..." count = 3 }. How do you access the 'endpoint' output of the second instance?

- [ ] A. module.cluster[1].endpoint
- [ ] B. module.cluster.endpoint[1]
- [ ] C. module.cluster.1.endpoint
- [ ] D. module[1].cluster.endpoint

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
When 'count' is applied to a module, the module instances are indexed like a list: 'module.<NAME>[<INDEX>].<OUTPUT>'. The second instance is index [1]: 'module.cluster[1].endpoint'.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 23 `[q5_23]`
*🏷️ Domain 5: Interact with Terraform Modules*

What happens if two child modules create a resource with the same local name, for example: resource "aws_s3_bucket" "logs" inside module A and module B?

- [ ] A. Terraform raises a duplicate resource declaration error.
- [ ] B. It is completely valid because resource names are scoped to their respective modules: module.a.aws_s3_bucket.logs vs module.b.aws_s3_bucket.logs.
- [ ] C. The second module overwrites the first.
- [ ] D. S3 buckets cannot have the same resource name.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Resource names are namespaced by their module path. Two different modules can each declare an 'aws_s3_bucket.logs' without collision, provided the physical cloud bucket names differ.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 24 `[q5_24]`
*🏷️ Domain 5: Interact with Terraform Modules*

What is the purpose of the 'terraform-docs' utility commonly used in module workflows?

- [ ] A. It compiles HCL code into PDF manuals.
- [ ] B. It inspects a module's inputs, outputs, providers, and requirements, and automatically generates formatted Markdown documentation tables.
- [ ] C. It connects to HashiCorp support.
- [ ] D. It generates Terraform Cloud billing statements.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'terraform-docs' is a widely used DevOps tool that reads Terraform modules and automatically generates comprehensive README markdown tables documenting inputs, outputs, requirements, and resources.

🔗 **Recommended Hands-on Exercise:** [`exercises/10-child-modules`](../exercises/10-child-modules)

</details>

---

### Question 25 `[q5_25]`
*🏷️ Domain 5: Interact with Terraform Modules*

Which of the following is an architectural anti-pattern when designing reusable Terraform modules?

- [ ] A. Making modules composable and focused on a single logical responsibility (e.g. VPC module, Database module).
- [ ] B. Creating a monolithic 'god module' that bundles VPC, Kubernetes, Databases, DNS, and Alerting into one giant un-configurable configuration.
- [ ] C. Exposing key resource IDs via outputs.
- [ ] D. Declaring type constraints on all input variables.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Monolithic 'kitchen sink' modules that try to provision everything are inflexible, difficult to test, slow to plan, and create high blast-radius risks. Clean, composable, single-purpose modules are the gold standard.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---
