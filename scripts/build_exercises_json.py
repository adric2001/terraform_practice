#!/usr/bin/env python3
"""
Builds portal/data/exercises.json from the 21 exercises in exercises/
Recursively discovers starter and solution files and defines precise validation rules.
"""

import json
import os
import glob
import re

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXERCISES_DIR = os.path.join(REPO_ROOT, "exercises")
OUTPUT_FILE = os.path.join(REPO_ROOT, "portal", "data", "exercises.json")

VALIDATION_RULES_MAP = {
    "01-first-resource": [
        {"id": "r1", "desc": "Configure 'hashicorp/local' provider in terraform block", "pattern": r"hashicorp/local", "file": "main.tf", "hint": "Add 'local = { source = \"hashicorp/local\" }' inside required_providers"},
        {"id": "r2", "desc": "Declare resource 'local_file' named 'welcome_note'", "pattern": r'resource\s+"local_file"\s+"welcome_note"', "file": "main.tf", "hint": "Define 'resource \"local_file\" \"welcome_note\" { ... }'"},
        {"id": "r3", "desc": "Set filename to '${path.module}/welcome.txt'", "pattern": r'filename\s*=\s*.*welcome\.txt', "file": "main.tf", "hint": "Specify filename = \"${path.module}/welcome.txt\""},
        {"id": "r4", "desc": "Set file content containing greeting text", "pattern": r'content\s*=', "file": "main.tf", "hint": "Add content attribute with greeting message"},
        {"id": "r5", "desc": "Declare output 'file_path' referencing welcome_note filename", "pattern": r'output\s+"file_path"\s*{[^}]*local_file\.welcome_note\.filename', "file": "outputs.tf", "hint": "output \"file_path\" { value = local_file.welcome_note.filename }"},
        {"id": "r6", "desc": "Declare output 'file_id' referencing welcome_note id", "pattern": r'output\s+"file_id"\s*{[^}]*local_file\.welcome_note\.id', "file": "outputs.tf", "hint": "output \"file_id\" { value = local_file.welcome_note.id }"}
    ],
    "02-variables-and-outputs": [
        {"id": "r1", "desc": "Declare string variable 'environment'", "pattern": r'variable\s+"environment"\s*{[^}]*type\s*=\s*string', "file": "variables.tf", "hint": "variable \"environment\" { type = string }"},
        {"id": "r2", "desc": "Declare number variable 'app_port'", "pattern": r'variable\s+"app_port"\s*{[^}]*type\s*=\s*number', "file": "variables.tf", "hint": "variable \"app_port\" { type = number }"},
        {"id": "r3", "desc": "Declare bool variable 'enable_feature'", "pattern": r'variable\s+"enable_feature"\s*{[^}]*type\s*=\s*bool', "file": "variables.tf", "hint": "variable \"enable_feature\" { type = bool }"},
        {"id": "r4", "desc": "Declare sensitive variable 'db_password'", "pattern": r'variable\s+"db_password"\s*{[^}]*sensitive\s*=\s*true', "file": "variables.tf", "hint": "Mark sensitive = true on variable db_password"},
        {"id": "r5", "desc": "Declare outputs 'app_url' and 'database_password'", "pattern": r'output\s+"app_url"', "file": "outputs.tf", "hint": "output \"app_url\" { value = ... }"}
    ],
    "03-collections-and-types": [
        {"id": "r1", "desc": "Define list(string) variable 'allowed_ips'", "pattern": r'list\(string\)', "file": "variables.tf", "hint": "Declare variable allowed_ips with type = list(string)"},
        {"id": "r2", "desc": "Define map(string) variable 'server_metadata'", "pattern": r'map\(string\)', "file": "variables.tf", "hint": "Declare variable server_metadata with type = map(string)"},
        {"id": "r3", "desc": "Reference list element in output 'primary_ip'", "pattern": r'output\s+"primary_ip"', "file": "outputs.tf", "hint": "Index list using var.allowed_ips[0]"}
    ],
    "04-resource-dependencies": [
        {"id": "r1", "desc": "Declare explicit depends_on meta-argument", "pattern": r'depends_on\s*=\s*\[', "file": "main.tf", "hint": "Add depends_on = [local_file.setup_script] to create an explicit DAG edge"}
    ],
    "05-data-sources": [
        {"id": "r1", "desc": "Declare data source 'local_file' 'spec'", "pattern": r'data\s+"local_file"\s+"spec"', "file": "main.tf", "hint": "Define data \"local_file\" \"spec\" to read outside file"},
        {"id": "r2", "desc": "Parse JSON content with jsondecode()", "pattern": r'jsondecode\(', "file": "main.tf", "hint": "locals { system_spec = jsondecode(...) }"},
        {"id": "r3", "desc": "Output 'app_name' parsed from external spec", "pattern": r'output\s+"app_name"', "file": "outputs.tf", "hint": "Expose local.system_spec.system_name"}
    ],
    "06-count-and-foreach": [
        {"id": "r1", "desc": "Use for_each with toset() on server_names", "pattern": r'for_each\s*=\s*toset\(var\.server_names\)', "file": "main.tf", "hint": "for_each = toset(var.server_names)"},
        {"id": "r2", "desc": "Address each resource with each.key", "pattern": r'each\.key', "file": "main.tf", "hint": "Reference current element using each.key"}
    ],
    "07-lifecycle-rules": [
        {"id": "r1", "desc": "Declare lifecycle block", "pattern": r'lifecycle\s*{', "file": "main.tf", "hint": "Add lifecycle { ... } inside resource"},
        {"id": "r2", "desc": "Set prevent_destroy or create_before_destroy", "pattern": r'prevent_destroy\s*=\s*true|create_before_destroy\s*=\s*true|ignore_changes\s*=', "file": "main.tf", "hint": "Configure prevent_destroy = true"}
    ],
    "08-builtin-functions": [
        {"id": "r1", "desc": "Use flatten() and sort() to transform nested endpoints", "pattern": r'flatten\(', "file": "main.tf", "hint": "Combine nested lists using flatten()"},
        {"id": "r2", "desc": "Output count of endpoints using length()", "pattern": r'length\(', "file": "outputs.tf", "hint": "value = length(local.enabled_endpoints)"}
    ],
    "09-dynamic-blocks": [
        {"id": "r1", "desc": "Generate repetitive firewall rules dynamically using directives or blocks", "pattern": r'firewall_rules', "file": "main.tf", "hint": "Iterate over var.firewall_rules"},
        {"id": "r2", "desc": "Extract active rule keys in outputs", "pattern": r'keys\(var\.firewall_rules\)|for_each', "file": "outputs.tf", "hint": "output \"active_rules\" { value = keys(var.firewall_rules) }"}
    ],
    "10-child-modules": [
        {"id": "r1", "desc": "Declare module block with source attribute", "pattern": r'module\s+"[a-zA-Z0-9_]+"\s*{[^}]*source\s*=', "file": "main.tf", "hint": "module \"storage\" { source = \"./modules/storage_bucket\" }"}
    ],
    "11-workspaces": [
        {"id": "r1", "desc": "Reference terraform.workspace in expression", "pattern": r'terraform\.workspace', "file": "main.tf", "hint": "Dynamically branch configs using terraform.workspace"}
    ],
    "12-state-manipulation": [
        {"id": "r1", "desc": "Define managed resources with state tracking addresses", "pattern": r'resource\s+"[a-zA-Z0-9_]+"', "file": "main.tf", "hint": "Declare resource to inspect with terraform state list/show"}
    ],
    "13-validations-and-conditions": [
        {"id": "r1", "desc": "Declare custom validation block on variable", "pattern": r'validation\s*{[^}]*condition\s*=[^}]*error_message\s*=', "file": "variables.tf", "hint": "validation { condition = ... error_message = \"...\" }"}
    ],
    "14-terraform-data-and-provisioners": [
        {"id": "r1", "desc": "Declare built-in terraform_data resource", "pattern": r'resource\s+"terraform_data"\s+"[a-zA-Z0-9_]+"', "file": "main.tf", "hint": "resource \"terraform_data\" \"bootstrap\" { ... }"},
        {"id": "r2", "desc": "Use triggers_replace or input", "pattern": r'triggers_replace|input\s*=', "file": "main.tf", "hint": "Configure triggers_replace to replace legacy null_resource triggers"}
    ],
    "15-refactoring-with-moved-blocks": [
        {"id": "r1", "desc": "Declare declarative moved block with from and to", "pattern": r'moved\s*{[^}]*from\s*=[^}]*to\s*=', "file": "moved.tf", "hint": "moved { from = local_file.backend to = local_file.services[\"backend\"] }"}
    ],
    "16-declarative-import": [
        {"id": "r1", "desc": "Declare declarative import block with to and id", "pattern": r'import\s*{[^}]*to\s*=[^}]*id\s*=', "file": "imports.tf", "hint": "import { to = local_file.legacy_system id = \"...\" }"}
    ],
    "17-remote-backends-and-locking": [
        {"id": "r1", "desc": "Configure backend block in terraform", "pattern": r'backend\s+"local"\s*{', "file": "backend.tf", "hint": "terraform { backend \"local\" { path = \"...\" } }"}
    ],
    "18-multi-provider-aliasing": [
        {"id": "r1", "desc": "Declare provider with alias in providers.tf", "pattern": r'alias\s*=\s*"dr_region"', "file": "providers.tf", "hint": "provider \"local\" { alias = \"dr_region\" }"},
        {"id": "r2", "desc": "Reference provider alias on secondary resource", "pattern": r'provider\s*=\s*local\.dr_region', "file": "main.tf", "hint": "provider = local.dr_region on secondary resource"}
    ],
    "19-testing-framework-tftest": [
        {"id": "r1", "desc": "Declare run block in test file", "pattern": r'run\s+"[a-zA-Z0-9_]+"\s*{', "file": "tests/validation.tftest.hcl", "hint": "run \"verify_staging\" { command = plan assert { ... } }"},
        {"id": "r2", "desc": "Declare assert block with condition and error_message", "pattern": r'assert\s*{[^}]*condition\s*=[^}]*error_message\s*=', "file": "tests/validation.tftest.hcl", "hint": "assert { condition = ... error_message = \"...\" }"}
    ],
    "20-secrets-and-sensitive-data": [
        {"id": "r1", "desc": "Declare sensitive = true on output", "pattern": r'sensitive\s*=\s*true', "file": "outputs.tf", "hint": "Mark output \"db_password\" with sensitive = true"},
        {"id": "r2", "desc": "Use sha256() to expose safe fingerprint of secret", "pattern": r'sha256\(', "file": "outputs.tf", "hint": "value = sha256(random_password.db_secret.result)"}
    ],
    "21-capstone-production-system": [
        {"id": "r1", "desc": "Instantiate production modular architecture", "pattern": r'module\s+"network"|module\s+"vault"', "file": "main.tf", "hint": "Instantiate modules 'network' and 'vault'"},
        {"id": "r2", "desc": "Declare post-condition check block in checks.tf", "pattern": r'check\s+"[a-zA-Z0-9_]+"\s*{', "file": "checks.tf", "hint": "check \"vault_file_integrity\" { ... }"}
    ]
}

def parse_readme(readme_path):
    if not os.path.exists(readme_path):
        return {"title": "Terraform Exercise", "objectives": [], "task": ""}
    
    with open(readme_path, "r", encoding="utf-8") as f:
        content = f.read()

    lines = content.splitlines()
    title = "Terraform Exercise"
    if lines and lines[0].startswith("# "):
        title = lines[0].replace("# ", "").strip()

    # Extract objectives
    objectives = []
    in_obj = False
    for line in lines:
        if line.startswith("## 🎯 Objectives") or line.startswith("## Objectives"):
            in_obj = True
            continue
        elif line.startswith("## ") and in_obj:
            in_obj = False
        elif in_obj and line.strip().startswith("- "):
            objectives.append(line.strip().replace("- ", "").strip())

    return {
        "title": title,
        "objectives": objectives,
        "raw_markdown": content
    }

def collect_files_recursively(base_dir):
    files_map = {}
    if not os.path.isdir(base_dir):
        return files_map
    allowed_exts = (".tf", ".hcl", ".json", ".txt", ".md", ".env", ".tfvars", ".example")
    for root, dirs, files in os.walk(base_dir):
        # Exclude internal / build dirs
        dirs[:] = [d for d in dirs if d not in (".terraform", ".git", "__pycache__", ".work")]
        for f in sorted(files):
            if f.endswith(".lock.hcl") or f.startswith(".DS_Store"):
                continue
            if not any(f.endswith(ext) for ext in allowed_exts):
                continue
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, base_dir)
            with open(full_path, "r", encoding="utf-8", errors="ignore") as fp:
                files_map[rel_path] = fp.read()
    return files_map

def main():
    dirs = sorted(glob.glob(os.path.join(EXERCISES_DIR, "[0-9][0-9]-*")))
    exercises = []

    for idx, d in enumerate(dirs, 1):
        dirname = os.path.basename(d)
        readme_info = parse_readme(os.path.join(d, "README.md"))

        tier = "Beginner"
        if 8 <= idx <= 14:
            tier = "Intermediate"
        elif 15 <= idx <= 20:
            tier = "Advanced"
        elif idx == 21:
            tier = "Capstone"

        # Read starter files recursively
        starter_files = collect_files_recursively(os.path.join(d, "starter"))

        # Read solution files recursively
        solution_files = collect_files_recursively(os.path.join(d, "solution"))

        rules = VALIDATION_RULES_MAP.get(dirname, [
            {"id": "r1", "desc": "Declare Terraform resources and configurations", "pattern": r"resource|variable|output", "file": "main.tf", "hint": "Define the required HCL blocks"}
        ])

        exercises.append({
            "id": dirname,
            "number": idx,
            "tier": tier,
            "title": readme_info["title"],
            "objectives": readme_info["objectives"],
            "starter_files": starter_files,
            "solution_files": solution_files,
            "validation_rules": rules
        })

    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(exercises, f, indent=2)

    # Also sync to backend/data/exercises.json
    backend_file = os.path.join(REPO_ROOT, "backend", "data", "exercises.json")
    os.makedirs(os.path.dirname(backend_file), exist_ok=True)
    with open(backend_file, "w", encoding="utf-8") as f:
        json.dump(exercises, f, indent=2)

    print(f"✅ Generated {OUTPUT_FILE} and {backend_file} with {len(exercises)} exercises!")

if __name__ == "__main__":
    main()
