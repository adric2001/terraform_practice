variable "cluster_config" {
  type = map(object({
    services = list(string)
    enabled  = bool
  }))
  default = {
    dev = {
      services = ["api", "auth"]
      enabled  = true
    }
    staging = {
      services = ["api", "auth", "billing"]
      enabled  = true
    }
    prod = {
      services = ["api", "auth", "billing", "analytics"]
      enabled  = false
    }
  }
}
