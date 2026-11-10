variable "workspace_settings" {
  type = map(object({
    instance_type = string
    replicas      = number
    debug_mode    = bool
  }))
  default = {
    default = {
      instance_type = "t3.micro"
      replicas      = 1
      debug_mode    = true
    }
    dev = {
      instance_type = "t3.small"
      replicas      = 2
      debug_mode    = true
    }
    prod = {
      instance_type = "m5.large"
      replicas      = 5
      debug_mode    = false
    }
  }
}
