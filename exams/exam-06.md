# 📝 Practice Exam 06: Resource Dependencies, Lifecycles & Dynamic Blocks

**Domain Focus:** Domain 4, 8  
**Total Questions:** 25 | **Passing Score:** 70% | **Time Limit:** 60 Minutes

> In-depth testing on implicit/explicit dependencies, lifecycle rules, zero-downtime updates, and dynamic blocks.

---

## 📖 Instructions
1. Read each question carefully and select your answer.
2. Click the collapsible **Answer & In-Depth Explanation** toggle to check your answer on the fly.
3. Note any weak domains and review the recommended hands-on exercises.

---

### Question 01 `[q6_01]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is an implicit dependency in Terraform?

- [ ] A. A dependency declared using the 'depends_on' meta-argument.
- [ ] B. A dependency inferred automatically by Terraform when an attribute of one resource is referenced in the configuration of another resource.
- [ ] C. A dependency specified in the provider documentation.
- [ ] D. A dependency configured via an external shell script.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform automatically analyzes expressions across resources. If Resource B references 'aws_instance.web.id', Terraform infers that Resource A must be created before Resource B. This is an implicit dependency.

🔗 **Recommended Hands-on Exercise:** [`exercises/04-resource-dependencies`](../exercises/04-resource-dependencies)

</details>

---

### Question 02 `[q6_02]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

When is the 'depends_on' meta-argument necessary?

- [ ] A. For every resource created in Terraform.
- [ ] B. Only when an ordering dependency exists between two resources or modules that is NOT captured by attribute references (e.g. an IAM policy must be attached before an application tries to use it).
- [ ] C. To prevent a resource from ever being destroyed.
- [ ] D. To import existing resources into state.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'depends_on' is an explicit dependency tool. It should only be used when there is an invisible dependency between resources that Terraform's graph cannot see through direct attribute interpolation.

🔗 **Recommended Hands-on Exercise:** [`exercises/04-resource-dependencies`](../exercises/04-resource-dependencies)

</details>

---

### Question 03 `[q6_03]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What error occurs if Resource A depends on Resource B, and Resource B depends on Resource A?

- [ ] A. Deadlock exception
- [ ] B. Cycle error (Cyclic dependency)
- [ ] C. Timeout error
- [ ] D. State corruption error

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform represents dependencies as a Directed Acyclic Graph (DAG). If a circular reference exists (A -> B -> A), Terraform detects the cycle during validation/planning and halts with a 'Cycle:' error.

🔗 **Recommended Hands-on Exercise:** [`exercises/04-resource-dependencies`](../exercises/04-resource-dependencies)

</details>

---

### Question 04 `[q6_04]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What does 'lifecycle { ignore_changes = [tags["Environment"]] }' do?

- [ ] A. Deletes the Environment tag immediately.
- [ ] B. Prevents Terraform from updating or reverting changes made to the 'Environment' tag key if it is modified out-of-band by an external system or cloud console.
- [ ] C. Ignores all tags across all resources.
- [ ] D. Sets the tag to null.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'ignore_changes' instructs Terraform to ignore differences between the configuration and the real-world attribute during planning. Specifying a map key ignores only that specific tag key.

🔗 **Recommended Hands-on Exercise:** [`exercises/07-lifecycle-rules`](../exercises/07-lifecycle-rules)

</details>

---

### Question 05 `[q6_05]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

How can you ignore all attribute changes made to a resource after its initial creation?

- [ ] A. lifecycle { ignore_changes = all }
- [ ] B. lifecycle { ignore_changes = ["*"] }
- [ ] C. lifecycle { static = true }
- [ ] D. lifecycle { frozen = true }

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Setting 'ignore_changes = all' causes Terraform to ignore all changes made to the resource after creation, effectively treating it as static unmanaged configuration once provisioned.

🔗 **Recommended Hands-on Exercise:** [`exercises/07-lifecycle-rules`](../exercises/07-lifecycle-rules)

</details>

---

### Question 06 `[q6_06]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the purpose of 'replace_triggered_by' in a resource's lifecycle block (introduced in Terraform 1.2+)?

- [ ] A. Replaces the resource whenever a specified attribute of another resource or terraform_data changes.
- [ ] B. Forces replacement once every 30 days.
- [ ] C. Replaces the resource if CPU usage exceeds 80%.
- [ ] D. Replaces the provider plugin binary.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'replace_triggered_by = [aws_app_config.cfg.version]' forces the resource to be replaced whenever the referenced resource or attribute changes, eliminating the need for complex taint scripts.

🔗 **Recommended Hands-on Exercise:** [`exercises/07-lifecycle-rules`](../exercises/07-lifecycle-rules)

</details>

---

### Question 07 `[q6_07]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What does a 'dynamic' block generate in Terraform HCL?

- [ ] A. Dynamic AWS Lambda functions.
- [ ] B. Repeating nested configuration blocks (like ingress, egress, tag, or setting) inside a single top-level resource block.
- [ ] C. Multiple top-level resource blocks.
- [ ] D. Dynamic CLI environment variables.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
A 'dynamic' block generates repeated nested blocks inside a resource or data source block based on a collection (list or map), acting like an inner loop for nested block configuration.

🔗 **Recommended Hands-on Exercise:** [`exercises/09-dynamic-blocks`](../exercises/09-dynamic-blocks)

</details>

---

### Question 08 `[q6_08]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Within a dynamic block named 'dynamic "ingress" { for_each = var.ports }', how do you access the current element's value if no 'iterator' is specified?

- [ ] A. each.value
- [ ] B. ingress.value
- [ ] C. this.value
- [ ] D. item.value

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
By default, the iterator variable inside a dynamic block matches the label of the dynamic block itself. For 'dynamic "ingress"', the current object is accessed via 'ingress.value'.

🔗 **Recommended Hands-on Exercise:** [`exercises/09-dynamic-blocks`](../exercises/09-dynamic-blocks)

</details>

---

### Question 09 `[q6_09]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

You define: dynamic "setting" { for_each = var.settings iterator = item content { name = item.key ... } }. What did the 'iterator' argument do?

- [ ] A. Set the loop speed.
- [ ] B. Customizes the name of the iterator variable used within the 'content' block to 'item' instead of defaulting to 'setting'.
- [ ] C. Enables reverse iteration.
- [ ] D. Skips the first element.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
The 'iterator' argument allows overriding the default iterator symbol (which would otherwise be 'setting') with a custom identifier (such as 'item'), which is especially helpful when nesting dynamic blocks.

🔗 **Recommended Hands-on Exercise:** [`exercises/09-dynamic-blocks`](../exercises/09-dynamic-blocks)

</details>

---

### Question 10 `[q6_10]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Can dynamic blocks be used to generate top-level 'resource' or 'module' blocks?

- [ ] A. Yes, dynamic blocks can generate any block in HCL.
- [ ] B. No, dynamic blocks can ONLY generate nested configuration blocks inside resources, data sources, providers, or provisioners. Top-level blocks use 'for_each'.
- [ ] C. Yes, if prefixed with 'global'.
- [ ] D. Yes, in Terraform Enterprise only.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Dynamic blocks are strictly designed for repeating nested blocks within a resource/module/provider. To create multiple top-level resources or modules, use the 'for_each' or 'count' meta-arguments.

🔗 **Recommended Hands-on Exercise:** [`exercises/09-dynamic-blocks`](../exercises/09-dynamic-blocks)

</details>

---

### Question 11 `[q6_11]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the danger of abusing dynamic blocks throughout your codebase?

- [ ] A. They make configuration harder to read, maintain, and debug, hiding declarative structure under programmatic loops.
- [ ] B. They increase the cost of cloud resources.
- [ ] C. They corrupt the state lock.
- [ ] D. They bypass variable type validations.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
HashiCorp explicitly cautions against overusing dynamic blocks. Overuse turns clean, readable declarative HCL into complex imperative code that is difficult for team members to understand and review.

🔗 **Recommended Hands-on Exercise:** [`exercises/09-dynamic-blocks`](../exercises/09-dynamic-blocks)

</details>

---

### Question 12 `[q6_12]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

How can you conditionally generate a single nested block using a dynamic block?

- [ ] A. Pass a list of one item when enabled, or an empty list [] when disabled: for_each = var.enable_logging ? [1] : []
- [ ] B. Use an if statement outside the resource.
- [ ] C. Set condition = true inside the content block.
- [ ] D. Dynamic blocks cannot be conditional.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
The canonical pattern to make a nested block conditional in HCL is: 'for_each = var.enable ? [1] : []'. If true, it iterates once; if false, it iterates zero times (no block rendered).

🔗 **Recommended Hands-on Exercise:** [`exercises/09-dynamic-blocks`](../exercises/09-dynamic-blocks)

</details>

---

### Question 13 `[q6_13]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

If Resource A has 'create_before_destroy = true', what must be true for any resource that Resource A depends on?

- [ ] A. They must also have 'create_before_destroy = true' (or must not require recreation), otherwise a dependency inversion error occurs.
- [ ] B. They must be destroyed first.
- [ ] C. They must use count.
- [ ] D. They must be data sources.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
If Resource A has 'create_before_destroy = true', any upstream resource it depends on must also use 'create_before_destroy = true' if it gets replaced; otherwise Terraform detects an impossible cycle where A needs B before B can be destroyed.

🔗 **Recommended Hands-on Exercise:** [`exercises/07-lifecycle-rules`](../exercises/07-lifecycle-rules)

</details>

---

### Question 14 `[q6_14]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

In a resource block using 'count = 3', what expression gives the zero-based index of the current instance?

- [ ] A. count.id
- [ ] B. count.index
- [ ] C. this.index
- [ ] D. count.number

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'count.index' provides the distinct numeric index (0, 1, 2, ...) of each instance created by the 'count' meta-argument.

🔗 **Recommended Hands-on Exercise:** [`exercises/06-count-and-foreach`](../exercises/06-count-and-foreach)

</details>

---

### Question 15 `[q6_15]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

In a resource block using 'for_each = var.services', how do you access the map key and map value of the current item?

- [ ] A. each.key and each.value
- [ ] B. item.key and item.value
- [ ] C. this.key and this.value
- [ ] D. map.key and map.value

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
In a 'for_each' block, the object 'each' is available in scope, providing 'each.key' (the map key or set string) and 'each.value' (the map value or set string).

🔗 **Recommended Hands-on Exercise:** [`exercises/06-count-and-foreach`](../exercises/06-count-and-foreach)

</details>

---

### Question 16 `[q6_16]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What happens if you pass a list containing duplicate strings to 'for_each' without using 'toset()'?

- [ ] A. Terraform deduplicates them silently.
- [ ] B. Terraform raises a type mismatch error because 'for_each' requires a map or a set of strings, not a list.
- [ ] C. Terraform creates two identical resources.
- [ ] D. The plan succeeds but apply fails.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'for_each' only accepts maps or sets of strings. Passing a raw list(string) results in a validation error: 'Invalid for_each argument. The given "for_each" argument value is unsuitable: must be a map or set of strings'.

🔗 **Recommended Hands-on Exercise:** [`exercises/06-count-and-foreach`](../exercises/06-count-and-foreach)

</details>

---

### Question 17 `[q6_17]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

You have 'resource "aws_instance" "server" { count = 3 }'. How do you reference the public IP addresses of all 3 instances as a list?

- [ ] A. aws_instance.server.public_ip
- [ ] B. aws_instance.server[*].public_ip
- [ ] C. aws_instance.server[all].public_ip
- [ ] D. list(aws_instance.server.public_ip)

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Using the splat operator '[*]', 'aws_instance.server[*].public_ip' evaluates to a list containing the 'public_ip' attribute from every instance.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 18 `[q6_18]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

You have 'resource "aws_instance" "server" { for_each = toset(["a", "b"]) }'. What is the correct expression to reference all private IPs as a list?

- [ ] A. [for s in aws_instance.server : s.private_ip]
- [ ] B. aws_instance.server[*].private_ip
- [ ] C. aws_instance.server.private_ip
- [ ] D. aws_instance.server.all.private_ip

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Because 'for_each' creates a map of resource instances (not a list), the standard splat operator '[*]' cannot be used directly. You use a 'for' expression: '[for s in aws_instance.server : s.private_ip]' or 'values(aws_instance.server)[*].private_ip'.

🔗 **Recommended Hands-on Exercise:** [`exercises/06-count-and-foreach`](../exercises/06-count-and-foreach)

</details>

---

### Question 19 `[q6_19]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Can you use both 'count' and 'for_each' inside the same resource block?

- [ ] A. Yes, to create a multi-dimensional matrix of resources.
- [ ] B. No, 'count' and 'for_each' are mutually exclusive meta-arguments within a single resource block.
- [ ] C. Yes, if count is less than 5.
- [ ] D. Only in modules.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'count' and 'for_each' cannot be used simultaneously within the same resource or module block. A block must use either count or for_each (or neither).

🔗 **Recommended Hands-on Exercise:** [`exercises/06-count-and-foreach`](../exercises/06-count-and-foreach)

</details>

---

### Question 20 `[q6_20]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the primary risk of using 'depends_on' excessively instead of implicit dependencies?

- [ ] A. It reduces the opportunity for Terraform to provision resources in parallel, needlessly slowing down planning and applies.
- [ ] B. It encrypts the resource definitions.
- [ ] C. It disables plan logs.
- [ ] D. It corrupts state files.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Terraform builds a DAG and parallelizes all independent operations. Excessive or premature 'depends_on' creates artificial serial bottlenecks, forcing resources to wait unnecessarily and increasing execution times.

🔗 **Recommended Hands-on Exercise:** [`exercises/04-resource-dependencies`](../exercises/04-resource-dependencies)

</details>

---

### Question 21 `[q6_21]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

How do you specify that a resource should be provisioned only if var.create_resource is true?

- [ ] A. count = var.create_resource ? 1 : 0
- [ ] B. if var.create_resource == true
- [ ] C. enabled = var.create_resource
- [ ] D. condition = var.create_resource

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
The standard ternary conditional pattern for conditional resources is 'count = var.create_resource ? 1 : 0'. If true, 1 instance is provisioned; if false, 0 instances are provisioned.

🔗 **Recommended Hands-on Exercise:** [`exercises/06-count-and-foreach`](../exercises/06-count-and-foreach)

</details>

---

### Question 22 `[q6_22]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

You have a resource with 'lifecycle { prevent_destroy = true }'. Can you delete the entire resource block from your .tf file and run 'terraform apply'?

- [ ] A. Yes, removing the code disables prevent_destroy.
- [ ] B. No, Terraform will still detect that applying the plan would destroy the resource recorded in state and will reject the plan with an error.
- [ ] C. Yes, if you delete the provider.
- [ ] D. Yes, if you pass -force.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Because 'prevent_destroy = true' is recorded in the configuration/state rules, removing the block from code still results in a plan that would destroy the physical resource, triggering the error. You must first set 'prevent_destroy = false', apply, and then remove the block.

🔗 **Recommended Hands-on Exercise:** [`exercises/07-lifecycle-rules`](../exercises/07-lifecycle-rules)

</details>

---

### Question 23 `[q6_23]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What does 'self' refer to in provisioner blocks or lifecycle postconditions?

- [ ] A. The root module.
- [ ] B. The current resource instance being provisioned or evaluated.
- [ ] C. The Terraform CLI binary.
- [ ] D. The user's workstation.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'self' is a special reference object available inside provisioner blocks and resource lifecycle postconditions representing the resource instance itself and its exported attributes.

🔗 **Recommended Hands-on Exercise:** [`exercises/13-validations-and-conditions`](../exercises/13-validations-and-conditions)

</details>

---

### Question 24 `[q6_24]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Can data sources use the 'depends_on' meta-argument?

- [ ] A. No, depends_on is only for resources.
- [ ] B. Yes, data sources support 'depends_on' to ensure they do not attempt to read data until a specified resource has finished provisioning.
- [ ] C. Only if the data source is local.
- [ ] D. Only in Terraform Enterprise.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Data sources support 'depends_on'. This is crucial when a data source must read an attribute or file created by an upstream resource during the same apply.

🔗 **Recommended Hands-on Exercise:** [`exercises/04-resource-dependencies`](../exercises/04-resource-dependencies)

</details>

---

### Question 25 `[q6_25]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

You define: lifecycle { ignore_changes = [ami] } on an EC2 instance. The AMI is updated in HCL code to a new image. What does 'terraform plan' do?

- [ ] A. Terraform destroys and recreates the EC2 instance with the new AMI.
- [ ] B. Terraform ignores the change to the AMI attribute and reports 'No changes'.
- [ ] C. Terraform throws a validation error.
- [ ] D. Terraform updates the tag only.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Because 'ami' is listed in 'ignore_changes', Terraform disregards differences between the code and state for that attribute, avoiding the destructive replacement plan.

🔗 **Recommended Hands-on Exercise:** [`exercises/07-lifecycle-rules`](../exercises/07-lifecycle-rules)

</details>

---
