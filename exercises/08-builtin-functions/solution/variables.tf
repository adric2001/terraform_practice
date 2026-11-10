variable "cluster_config" {
  description = "Nested cluster and environment configuration map"
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
