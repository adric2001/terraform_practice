# 📝 Practice Exam 03: HCL Syntax, Variables, Collections & Functions

**Domain Focus:** Domain 8  
**Total Questions:** 25 | **Passing Score:** 70% | **Time Limit:** 60 Minutes

> Rigorous evaluation of complex types, validations, built-in functions, splat syntax, and expressions.

---

## 📖 Instructions
1. Read each question carefully and select your answer.
2. Click the collapsible **Answer & In-Depth Explanation** toggle to check your answer on the fly.
3. Note any weak domains and review the recommended hands-on exercises.

---

### Question 01 `[q3_01]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Which of the following is considered a structural type in Terraform HCL rather than a collection type?

- [ ] A. list
- [ ] B. map
- [ ] C. object
- [ ] D. set

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `C`

**Explanation:**  
Terraform distinguishes between collections (list, map, set) where all elements must be of the identical type, and structural types (object, tuple) which can combine elements of differing types with explicit schemas.

🔗 **Recommended Hands-on Exercise:** [`exercises/03-collections-and-types`](../exercises/03-collections-and-types)

</details>

---

### Question 02 `[q3_02]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

In a variable validation block, which built-in function is commonly paired with 'regex()' to ensure invalid values do not throw unhandled runtime errors?

- [ ] A. try()
- [ ] B. can()
- [ ] C. match()
- [ ] D. valid()

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'can(regex("...", var.input))' evaluates the expression and returns true if it evaluates without an error, or false if it errors. It is the canonical pattern for custom validation blocks.

🔗 **Recommended Hands-on Exercise:** [`exercises/13-validations-and-conditions`](../exercises/13-validations-and-conditions)

</details>

---

### Question 03 `[q3_03]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Given the list: var.ips = ["10.0.0.1", "10.0.0.2", "10.0.0.3"]. How do you access the second element in HCL?

- [ ] A. var.ips[1]
- [ ] B. var.ips[2]
- [ ] C. var.ips.1
- [ ] D. get(var.ips, 1)

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Terraform lists are zero-indexed. The first item is index [0], the second is index [1], and the third is index [2].

🔗 **Recommended Hands-on Exercise:** [`exercises/03-collections-and-types`](../exercises/03-collections-and-types)

</details>

---

### Question 04 `[q3_04]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the result of the function call: lookup({ a = 1, b = 2 }, "c", 99)?

- [ ] A. 1
- [ ] B. null
- [ ] C. 99
- [ ] D. Error: Key 'c' not found

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `C`

**Explanation:**  
'lookup(map, key, default)' retrieves the value of a key from a map. If the key does not exist, it safely returns the specified default value (99 in this case) instead of raising an error.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 05 `[q3_05]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What does the function 'flatten([["a", "b"], ["c", ["d"]]])' produce?

- [ ] A. ["a", "b", "c", "d"]
- [ ] B. ["a", "b", "c", ["d"]]
- [ ] C. [["a", "b", "c", "d"]]
- [ ] D. { a = "b", c = "d" }

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'flatten()' takes a list of lists and eliminates all nested list layers, returning a single, flat list containing all the individual scalar elements.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 06 `[q3_06]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

You have a list of strings: var.raw = ["web", "", "db", null, "cache"]. Which built-in function removes empty strings and null entries?

- [ ] A. filter(var.raw)
- [ ] B. compact(var.raw)
- [ ] C. strip(var.raw)
- [ ] D. trim(var.raw)

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'compact()' takes a list of strings and returns a new list with any empty strings ("" or null) removed.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 07 `[q3_07]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

How do you write a 'for' expression that transforms a list of strings '["alpha", "beta"]' into uppercase strings?

- [ ] A. [for s in ["alpha", "beta"] : upper(s)]
- [ ] B. {for s in ["alpha", "beta"] => upper(s)}
- [ ] C. map(upper, ["alpha", "beta"])
- [ ] D. ["alpha", "beta"].map(upper)

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
List comprehensions in HCL use square brackets: '[for item in list : expression]'. To produce a map, curly braces '{for k, v in map : k => v}' are used.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 08 `[q3_08]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What function computes a subnet address from a VPC CIDR prefix? Example: cidrsubnet("10.0.0.0/16", 8, 2)?

- [ ] A. cidrnet()
- [ ] B. cidrsubnet()
- [ ] C. subnet()
- [ ] D. ipcalc()

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'cidrsubnet(prefix, newbits, netnum)' calculates a subnet address within given IP network prefix. Adding 8 bits to /16 yields /24, and index 2 yields '10.0.2.0/24'.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 09 `[q3_09]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the difference between 'locals' and 'variables' in Terraform?

- [ ] A. Variables can be passed from outside the module (CLI, files, caller); locals are private expressions defined strictly within the module and can compute dynamic expressions.
- [ ] B. Locals can be changed during terraform apply; variables are constant.
- [ ] C. Variables support expressions and function calls; locals only support static string literals.
- [ ] D. There is no functional difference; they are aliases.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
Variables serve as module input parameters provided by the caller. Local values ('locals') are internal module constants and intermediate variables that can reference other resources and evaluate functions.

🔗 **Recommended Hands-on Exercise:** [`exercises/05-data-sources`](../exercises/05-data-sources)

</details>

---

### Question 10 `[q3_10]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the output of 'merge({ a = 1, b = 2 }, { b = 99, c = 3 })'?

- [ ] A. { a = 1, b = 2, c = 3 }
- [ ] B. { a = 1, b = 99, c = 3 }
- [ ] C. Error: Duplicate key 'b'
- [ ] D. { a = 1, c = 3 }

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'merge()' takes multiple maps and merges them into one. If the same key exists in multiple maps, the value from the rightmost (latest) map wins.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 11 `[q3_11]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the purpose of the 'templatefile()' function?

- [ ] A. It writes an HCL template to disk.
- [ ] B. It reads a file from disk and renders its content using supplied variables according to HCL template syntax.
- [ ] C. It formats JSON files according to Prettier standards.
- [ ] D. It generates cloudformation templates.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'templatefile(path, vars)' reads a template file from the filesystem and evaluates it using HCL template syntax (supporting loops %{ for ... } and conditionals %{ if ... }) with the supplied map of variables.

🔗 **Recommended Hands-on Exercise:** [`exercises/09-dynamic-blocks`](../exercises/09-dynamic-blocks)

</details>

---

### Question 12 `[q3_12]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

How do you strip leading whitespace and indentation in a heredoc string literal in Terraform?

- [ ] A. <<EOT
- [ ] B. <<-EOT
- [ ] C. <~EOT
- [ ] D. <!EOT

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Using '<<-EOT' (with a hyphen) instructs Terraform to strip any leading whitespace before lines that match the indentation of the closing delimiter. Standard '<<EOT' preserves all leading spaces literally.

🔗 **Recommended Hands-on Exercise:** [`exercises/02-variables-and-outputs`](../exercises/02-variables-and-outputs)

</details>

---

### Question 13 `[q3_13]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Which operator performs safe navigation / short-circuit fallbacks if an object attribute might not exist or might fail?

- [ ] A. try(local.config.port, 8080)
- [ ] B. fallback(local.config.port, 8080)
- [ ] C. coalesce(local.config.port, 8080)
- [ ] D. rescue(local.config.port, 8080)

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
'try(expr1, expr2, ...)' evaluates arguments in sequence and returns the first expression that succeeds without raising an error. If 'local.config.port' fails (e.g. key doesn't exist), it falls back to 8080.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 14 `[q3_14]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

You have a list of EC2 instance objects: instances = [{ id = "i-1", name = "web" }, { id = "i-2", name = "api" }]. What expression extracts a list of all IDs using splat syntax?

- [ ] A. var.instances.*.id
- [ ] B. var.instances[*].id
- [ ] C. var.instances.id[*]
- [ ] D. var.instances->id

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Full splat operator syntax in modern Terraform is '[*]': 'var.instances[*].id'. Legacy attribute-only splat '.*' is deprecated.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 15 `[q3_15]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the difference between 'set' and 'list' collection types in Terraform?

- [ ] A. Sets are ordered; lists are unordered.
- [ ] B. Sets hold only unique values and have no index ordering; lists maintain insertion order and permit duplicate values.
- [ ] C. Lists can only hold numbers; sets can hold any type.
- [ ] D. Sets can be indexed by number like var.set[0].

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
A set is an unordered collection of unique values (duplicates are automatically eliminated and elements cannot be accessed via numeric index). A list preserves exact index ordering and allows duplicates.

🔗 **Recommended Hands-on Exercise:** [`exercises/03-collections-and-types`](../exercises/03-collections-and-types)

</details>

---

### Question 16 `[q3_16]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Which function converts a native HCL object into a formatted JSON string?

- [ ] A. to_json()
- [ ] B. jsonencode()
- [ ] C. format_json()
- [ ] D. jsonstringify()

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'jsonencode()' serializes any Terraform HCL data structure (lists, maps, objects) into a valid JSON string. Its counterpart is 'jsondecode()'.

🔗 **Recommended Hands-on Exercise:** [`exercises/03-collections-and-types`](../exercises/03-collections-and-types)

</details>

---

### Question 17 `[q3_17]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

You have a variable: variable "env" { type = string, default = "dev" }. You define TF_VAR_env="prod" in your shell, and your terraform.tfvars contains env = "stage". What is the evaluated value of var.env?

- [ ] A. dev
- [ ] B. prod
- [ ] C. stage
- [ ] D. Error: Duplicate variable assignment

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `C`

**Explanation:**  
Variable definitions in 'terraform.tfvars' take precedence over environment variables ('TF_VAR_*'). Precedence order: default (dev) < TF_VAR_* (prod) < terraform.tfvars (stage). Hence, 'stage' wins.

🔗 **Recommended Hands-on Exercise:** [`exercises/02-variables-and-outputs`](../exercises/02-variables-and-outputs)

</details>

---

### Question 18 `[q3_18]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What will 'keys({ name = "Alice", age = 30 })' return?

- [ ] A. ["Alice", 30]
- [ ] B. ["age", "name"] (lexicographically sorted list)
- [ ] C. "name, age"
- [ ] D. { 0 = "name", 1 = "age" }

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'keys(map)' returns a list containing all the keys in the map, sorted alphabetically (lexicographically).

🔗 **Recommended Hands-on Exercise:** [`exercises/09-dynamic-blocks`](../exercises/09-dynamic-blocks)

</details>

---

### Question 19 `[q3_19]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the return type of 'toset(["b", "a", "b"])'?

- [ ] A. A list: ["b", "a", "b"]
- [ ] B. A set of unique elements: ["a", "b"]
- [ ] C. A tuple: ("b", "a", "b")
- [ ] D. A map with numeric keys

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'toset()' converts a list into a set, deduplicating any repeated items and discarding list index positions.

🔗 **Recommended Hands-on Exercise:** [`exercises/06-count-and-foreach`](../exercises/06-count-and-foreach)

</details>

---

### Question 20 `[q3_20]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Can you define an input variable inside a child module that takes an object with optional attributes in Terraform 1.3+?

- [ ] A. No, all attributes in an object type constraint must be explicitly supplied.
- [ ] B. Yes, using the 'optional()' modifier in the type constraint: object({ port = number, desc = optional(string, "default desc") }).
- [ ] C. Yes, but only if the variable is marked sensitive.
- [ ] D. Yes, by using the 'any' type.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
Terraform 1.3+ added GA support for 'optional()' in object type constraints: 'object({ name = string, port = optional(number, 80) })'. If the caller omits that attribute, the default value is used.

🔗 **Recommended Hands-on Exercise:** [`exercises/03-collections-and-types`](../exercises/03-collections-and-types)

</details>

---

### Question 21 `[q3_21]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What function calculates a host IP within a CIDR subnet block? Example: cidrhost("10.0.1.0/24", 5)?

- [ ] A. host()
- [ ] B. cidrhost()
- [ ] C. iphost()
- [ ] D. subnet_host()

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'cidrhost(prefix, hostnum)' calculates a host IP address within the given CIDR prefix. For 10.0.1.0/24 with hostnum 5, it returns '10.0.1.5'.

🔗 **Recommended Hands-on Exercise:** [`exercises/21-capstone-production-system`](../exercises/21-capstone-production-system)

</details>

---

### Question 22 `[q3_22]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

Which expression produces a map from a list of strings: ["apple", "banana"], where the key is the string and the value is its string length?

- [ ] A. { for item in ["apple", "banana"] : item => length(item) }
- [ ] B. [ for item in ["apple", "banana"] : item = length(item) ]
- [ ] C. map(["apple", "banana"], length)
- [ ] D. { item : length(item) for item in ["apple", "banana"] }

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `A`

**Explanation:**  
HCL map comprehensions use curly braces: '{ for item in list : key_expr => value_expr }'. Thus, '{ for item in ["apple", "banana"] : item => length(item) }' creates the desired map.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---

### Question 23 `[q3_23]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What does 'file("${path.module}/hello.txt")' do?

- [ ] A. Creates a file named hello.txt on disk.
- [ ] B. Reads the contents of hello.txt at that path and returns it as a string.
- [ ] C. Checks if hello.txt exists and returns a boolean.
- [ ] D. Returns the file size in bytes.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
The 'file(path)' function reads the file at the specified path and returns its contents as a raw string. If the file cannot be read, Terraform raises an error.

🔗 **Recommended Hands-on Exercise:** [`exercises/05-data-sources`](../exercises/05-data-sources)

</details>

---

### Question 24 `[q3_24]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What is the purpose of 'filesha256(path)'?

- [ ] A. Encrypts the file using SHA256.
- [ ] B. Reads the file and calculates its SHA256 cryptographic checksum, useful for detecting content modifications in deployment triggers.
- [ ] C. Compresses the file to a zip archive.
- [ ] D. Computes the base64 encoded text.

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'filesha256(path)' calculates the SHA-256 hash of the file's raw contents without loading the entire file into memory as a string. It is commonly used with 'triggers_replace' or Lambda code hashes.

🔗 **Recommended Hands-on Exercise:** [`exercises/14-terraform-data-and-provisioners`](../exercises/14-terraform-data-and-provisioners)

</details>

---

### Question 25 `[q3_25]`
*🏷️ Domain 8: Read, Generate, and Modify Configuration*

What function checks whether a string contains a specific substring in Terraform?

- [ ] A. contains()
- [ ] B. strcontains()
- [ ] C. has_substr()
- [ ] D. substring()

<details>
<summary><b>🔍 View Correct Answer & Explanation</b></summary>

**Correct Answer:** `B`

**Explanation:**  
'strcontains(string, substr)' checks whether a string contains a substring (introduced in Terraform 1.5+). In contrast, 'contains(list, element)' checks whether a collection contains a specific element.

🔗 **Recommended Hands-on Exercise:** [`exercises/08-builtin-functions`](../exercises/08-builtin-functions)

</details>

---
