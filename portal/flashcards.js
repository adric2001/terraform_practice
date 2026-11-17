/**
 * 50 High-Yield Flashcards for HashiCorp Certified: Terraform Associate (004)
 */

window.FLASHCARD_DATA = [
  {
    id: 1,
    category: "Core IaC & Architecture",
    question: "What is the difference between declarative and imperative IaC, and which model does Terraform use?",
    answer: "Declarative (Terraform): You specify the desired end-state ('I want 3 VMs and a VPC'), and Terraform calculates the delta and steps needed to achieve that state.\n\nImperative (Bash scripts, procedural Ansible): You specify explicit step-by-step commands to create the infrastructure."
  },
  {
    id: 2,
    category: "Core IaC & Architecture",
    question: "What does idempotency mean in the context of Terraform?",
    answer: "Executing 'terraform apply' multiple times with the exact same configuration produces the same result without unintended side effects or duplicate resources. If no drift has occurred, subsequent applies make 0 changes."
  },
  {
    id: 3,
    category: "Core IaC & Architecture",
    question: "What are Day 1 vs. Day 2 operations in Terraform?",
    answer: "Day 1 Operations: Initial infrastructure provisioning, VPC creation, bootstrapping initial servers.\n\nDay 2 Operations: Ongoing maintenance, resizing instances, updating firewall rules, refactoring code, and eventual decommission/destroy."
  },
  {
    id: 4,
    category: "Core IaC & Architecture",
    question: "What is the architectural relationship between Terraform Core and Terraform Plugins (Providers)?",
    answer: "Terraform Core is the open-source Go binary that parses HCL, manages state, and builds the Directed Acyclic Graph (DAG).\n\nProviders are independent gRPC plugins that translate Core's CRUD requests into API calls for cloud providers (AWS, Azure, GCP, etc.)."
  },
  {
    id: 5,
    category: "CLI Workflow",
    question: "What are the four core steps of the standard Terraform CLI workflow?",
    answer: "1. terraform init (install providers/modules, configure backend)\n2. terraform validate (check HCL syntax and internal consistency)\n3. terraform plan (preview changes without applying)\n4. terraform apply (execute changes to reach desired state)"
  },
  {
    id: 6,
    category: "CLI Workflow",
    question: "Does 'terraform validate' check cloud credentials or verify if an AMI exists in AWS?",
    answer: "NO. 'terraform validate' only verifies HCL syntax and internal attribute consistency. It does NOT make remote API calls or check cloud credentials."
  },
  {
    id: 7,
    category: "CLI Workflow",
    question: "How do you guarantee that the exact plan reviewed is the plan executed in CI/CD automation?",
    answer: "Save the plan to a binary file:\n\nterraform plan -out=tfplan\nterraform apply tfplan\n\nWhen passing a saved plan, apply does not re-read remote state or ask for interactive confirmation."
  },
  {
    id: 8,
    category: "CLI Workflow",
    question: "What is the recommended modern replacement for the deprecated 'terraform taint'?",
    answer: "Use the '-replace' flag with terraform apply:\n\nterraform apply -replace='aws_instance.web'\n\n('terraform taint' is deprecated since Terraform 0.15.2)."
  },
  {
    id: 9,
    category: "CLI Workflow",
    question: "What is the modern replacement for the standalone 'terraform refresh' command?",
    answer: "Use:\n\nterraform apply -refresh-only\n(or terraform plan -refresh-only)\n\nThis safely inspects real-world drift against the state file interactively before committing changes."
  },
  {
    id: 10,
    category: "CLI Workflow",
    question: "Which command automatically formats configuration files to standard conventions recursively?",
    answer: "terraform fmt -recursive"
  },
  {
    id: 11,
    category: "State Management",
    question: "Why is remote backend state locking critical in team environments?",
    answer: "It prevents concurrent applies from corrupting the state file. If a backend supports locking (AWS S3 + DynamoDB, Terraform Cloud, GCS, Azure Blob), Terraform acquires a mutex lock during write operations."
  },
  {
    id: 12,
    category: "State Management",
    question: "Does marking a variable with 'sensitive = true' prevent its value from being written in plain text to the state file?",
    answer: "NO! 'sensitive = true' only masks values from CLI output and console logs. The secret IS STILL STORED IN PLAIN TEXT inside terraform.tfstate! State must be protected with encrypted backends and strict IAM RBAC."
  },
  {
    id: 13,
    category: "State Management",
    question: "How do you stop Terraform from managing a resource without deleting it from the cloud?",
    answer: "terraform state rm <resource_address>\n\nExample: terraform state rm aws_s3_bucket.data_vault\n(Removes it from state while leaving the physical cloud resource intact)."
  },
  {
    id: 14,
    category: "State Management",
    question: "What command renames a resource address in state without destroying the physical infrastructure?",
    answer: "terraform state mv <old_address> <new_address>\n\n(Or preferably in Terraform 1.1+, use a declarative 'moved { from = ... to = ... }' block in HCL code!)"
  },
  {
    id: 15,
    category: "Variables & Precedence",
    question: "Rank variable definition sources from HIGHEST priority (wins) to LOWEST priority.",
    answer: "1. CLI flags (-var or -var-file) [HIGHEST]\n2. *.auto.tfvars or *.auto.tfvars.json (alphabetical)\n3. terraform.tfvars.json\n4. terraform.tfvars\n5. Environment variables (TF_VAR_<name>)\n6. Default value in variable declaration [LOWEST]"
  },
  {
    id: 16,
    category: "Variables & Precedence",
    question: "Which variable filenames are automatically loaded by Terraform without passing -var-file?",
    answer: "- terraform.tfvars\n- terraform.tfvars.json\n- Any file ending in .auto.tfvars\n- Any file ending in .auto.tfvars.json"
  },
  {
    id: 17,
    category: "Variables & Precedence",
    question: "What two arguments are required inside a variable 'validation' block?",
    answer: "1. condition = (boolean expression)\n2. error_message = (string explaining why the value was invalid)"
  },
  {
    id: 18,
    category: "HCL Syntax & Functions",
    question: "Why is 'for_each' preferred over 'count' when managing independent cloud resources?",
    answer: "'count' indexes items by integer ([0], [1], [2]). Deleting an item in the middle causes all subsequent items to re-index, leading to destructive recreation.\n\n'for_each' indexes by unique map keys or string sets, making additions and removals completely safe."
  },
  {
    id: 19,
    category: "HCL Syntax & Functions",
    question: "What does 'lookup(map, key, default)' do if the key does not exist?",
    answer: "It safely returns the 'default' value without throwing a runtime error."
  },
  {
    id: 20,
    category: "HCL Syntax & Functions",
    question: "What is the result of merge({ a = 1, b = 2 }, { b = 99, c = 3 })?",
    answer: "{ a = 1, b = 99, c = 3 }\n\n(Keys in later maps overwrite keys in earlier maps)."
  },
  {
    id: 21,
    category: "HCL Syntax & Functions",
    question: "How do you extract private IPs from 3 instances using count into a single list?",
    answer: "aws_instance.web[*].private_ip (Splat expression)."
  },
  {
    id: 22,
    category: "Modules",
    question: "What is the syntax for specifying a public Terraform Registry module source?",
    answer: "source = '<NAMESPACE>/<NAME>/<PROVIDER>'\n\nExample: source = 'terraform-aws-modules/vpc/aws'"
  },
  {
    id: 23,
    category: "Modules",
    question: "Can you specify the 'version' argument for local child modules (source = './modules/vpc')?",
    answer: "NO. The 'version' argument is only supported for registry-based modules. Local modules inherit their version directly from the local directory or git ref."
  },
  {
    id: 24,
    category: "Modules",
    question: "What does the '.terraform.lock.hcl' file record, and should it be committed to Git?",
    answer: "It records exact versions and cryptographically hashed checksums of all provider plugins.\n\nYES! It should ALWAYS be committed to Git to guarantee reproducible builds across the entire team and CI/CD."
  },
  {
    id: 25,
    category: "004 Modern Features",
    question: "How do you import existing infrastructure declaratively in Terraform 1.5+ without the CLI 'terraform import'?",
    answer: "Declare an import block in HCL:\n\nimport {\n  to = aws_s3_bucket.legacy\n  id = 'my-existing-bucket-name'\n}\n\nUse 'terraform plan -generate-config-out=generated.tf' to auto-generate the resource code!"
  },
  {
    id: 26,
    category: "004 Modern Features",
    question: "What does a declarative 'moved' block do in Terraform 1.1+?",
    answer: "It records resource address changes or refactoring in code so that when teammates run 'terraform apply', their state updates automatically without recreating physical resources or running 'terraform state mv':\n\nmoved {\n  from = aws_instance.web\n  to   = aws_instance.frontend\n}"
  },
  {
    id: 27,
    category: "004 Modern Features",
    question: "What file extension is used for native Terraform tests in Terraform 1.6+, and what command runs them?",
    answer: "File extension: *.tftest.hcl (e.g., tests/website.tftest.hcl)\nCommand: terraform test"
  },
  {
    id: 28,
    category: "004 Modern Features",
    question: "What is the difference in behavior between a 'check' block assertion and a 'precondition'?",
    answer: "- 'check' block assertion failure: Outputs a non-blocking WARNING during plan/apply; execution proceeds.\n- 'precondition' failure: IMMEDIATELY HALTS execution with an ERROR."
  },
  {
    id: 29,
    category: "004 Modern Features",
    question: "What built-in resource in Terraform 1.4+ replaces the external 'null_resource'?",
    answer: "terraform_data (Built directly into Terraform Core; requires no external provider download)."
  },
  {
    id: 30,
    category: "Cloud & Enterprise",
    question: "What are the three run execution modes available in Terraform Cloud workspaces?",
    answer: "1. Remote: Runs in Terraform Cloud VMs (managed runner).\n2. Local: Runs on developer CLI, using Cloud for remote state storage.\n3. Agent: Runs on self-hosted Terraform Cloud Agents deployed in private networks."
  },
  {
    id: 31,
    category: "Cloud & Enterprise",
    question: "What two Policy as Code frameworks are supported in Terraform Cloud?",
    answer: "1. HashiCorp Sentinel (proprietary, advisory/soft-mandatory/hard-mandatory).\n2. Open Policy Agent (OPA) (industry standard using Rego query language)."
  },
  {
    id: 32,
    category: "Cloud & Enterprise",
    question: "What data source reads output values from another Terraform workspace's state file?",
    answer: "terraform_remote_state data source."
  },
  {
    id: 33,
    category: "Lifecycle Rules",
    question: "Which lifecycle argument forces Terraform to provision a new replacement resource before destroying the old one?",
    answer: "create_before_destroy = true"
  },
  {
    id: 34,
    category: "Lifecycle Rules",
    question: "Which lifecycle argument prevents accidental destruction of production infrastructure?",
    answer: "prevent_destroy = true (Terraform will halt with an error if a plan attempts to destroy it)."
  },
  {
    id: 35,
    category: "Lifecycle Rules",
    question: "Which lifecycle argument ignores real-world changes to attributes like tags or external scaling?",
    answer: "ignore_changes = [tags, ami]"
  },
  {
    id: 36,
    category: "CLI Workflow",
    question: "Which environment variable enables detailed debug logging, and which levels are supported?",
    answer: "TF_LOG=DEBUG (or TRACE, INFO, WARN, ERROR). TF_LOG_PATH directs output to a log file."
  },
  {
    id: 37,
    category: "CLI Workflow",
    question: "What command provides an interactive REPL console to test HCL expressions and functions?",
    answer: "terraform console"
  },
  {
    id: 38,
    category: "CLI Workflow",
    question: "How do you upgrade provider versions within configuration constraints?",
    answer: "terraform init -upgrade"
  },
  {
    id: 39,
    category: "Variables & Outputs",
    question: "How does a root module access an output named 'vpc_id' from a child module called 'network'?",
    answer: "module.network.vpc_id"
  },
  {
    id: 40,
    category: "Variables & Outputs",
    question: "What attribute inside an output block prevents values from being printed in apply logs?",
    answer: "sensitive = true"
  },
  {
    id: 41,
    category: "HCL Syntax & Functions",
    question: "What is the function 'try(expression1, expression2, ...)' used for?",
    answer: "It evaluates multiple expressions sequentially and returns the first one that does not produce an error."
  },
  {
    id: 42,
    category: "HCL Syntax & Functions",
    question: "What does 'can(expression)' return?",
    answer: "Returns true if evaluating the expression succeeds without an error; returns false if it fails."
  },
  {
    id: 43,
    category: "State Management",
    question: "What command inspects all attributes of a specific resource recorded in state?",
    answer: "terraform state show <address> (e.g. terraform state show aws_instance.web)"
  },
  {
    id: 44,
    category: "State Management",
    question: "What command lists all resource addresses currently recorded in the state file?",
    answer: "terraform state list"
  },
  {
    id: 45,
    category: "Workspaces",
    question: "What command creates and switches to a new CLI workspace called 'staging'?",
    answer: "terraform workspace new staging (Switch to existing: terraform workspace select staging)"
  },
  {
    id: 46,
    category: "Workspaces",
    question: "Why does HashiCorp advise against relying purely on CLI workspaces for production vs dev isolation?",
    answer: "CLI workspaces share the same configuration directory and credentials. Production isolation should use separate directories or Terraform Cloud workspaces with separate credentials."
  },
  {
    id: 47,
    category: "Cloud & Enterprise",
    question: "What is the naming format for modules published in a Terraform Cloud Private Module Registry?",
    answer: "<ORGANIZATION>/<NAME>/<PROVIDER> (e.g. app.terraform.io/my-corp/vpc/aws)"
  },
  {
    id: 48,
    category: "004 Modern Features",
    question: "What block inside 'terraform test' defines a test step, and what commands can it run?",
    answer: "A 'run' block. It can run command = plan (validates expected plan) or command = apply (creates infrastructure, runs asserts, then auto-destroys)."
  },
  {
    id: 49,
    category: "HCL Syntax & Functions",
    question: "When should you use a 'dynamic' block in Terraform?",
    answer: "To generate repeatable nested configuration blocks (such as multiple ingress rules or tags) dynamically from a list or map variable."
  },
  {
    id: 50,
    category: "Core IaC & Architecture",
    question: "What is the Directed Acyclic Graph (DAG) used for in Terraform Core?",
    answer: "It maps resource dependencies, determines the optimal parallel execution order, and prevents dependency deadlocks/cycles."
  }
];
