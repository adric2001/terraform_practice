# Exercise 19: Native Testing Framework (`terraform test`)

## 🎯 Objectives
- Author test suites using native `.tftest.hcl` files (Terraform 1.6+).
- Write `run` blocks for unit tests (`command = plan`) and integration tests (`command = apply`).
- Assert output values, preconditions, and invalid variable rejection.

## 📖 Key Concepts
- **`terraform test`**: Built-in test runner that executes assertions against configurations and modules without external frameworks (like Terratest).
- **`run` block**: Represents a test stage with input variables and assertions:
  ```hcl
  run "verify_port" {
    command = plan
    assert {
      condition     = var.port > 1024
      error_message = "Port must be unprivileged (> 1024)"
    }
  }
  ```

## 📝 Your Task
In `starter/`:
1. In `main.tf`, you have an application configuration generator.
2. In `tests/validation.tftest.hcl`, write two test runs:
   - `run "valid_environment"`: Asserts that output `app_env` equals `"staging"`.
   - `run "port_range_check"`: Asserts that output `assigned_port` is between 1024 and 65535.
3. Run `terraform test` to execute your assertions!

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform test
```
