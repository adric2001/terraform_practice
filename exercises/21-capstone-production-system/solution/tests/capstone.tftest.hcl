run "verify_capstone_plan" {
  command = plan

  assert {
    condition     = var.project_name == "phoenix-core"
    error_message = "Project name default must be phoenix-core."
  }
}

run "verify_custom_env" {
  command = plan

  variables {
    environment = "staging"
  }

  assert {
    condition     = var.environment == "staging"
    error_message = "Environment variable override failed."
  }
}
