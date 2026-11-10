run "verify_env" {
  command = plan

  assert {
    condition     = output.app_env == "staging"
    error_message = "Default environment must be staging."
  }
}

run "verify_port_range" {
  command = plan

  variables {
    assigned_port = 9090
  }

  assert {
    condition     = output.assigned_port >= 1024 && output.assigned_port <= 65535
    error_message = "Assigned port must be an unprivileged port (1024-65535)."
  }
}
