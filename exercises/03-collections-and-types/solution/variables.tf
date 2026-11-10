variable "allowed_ips" {
  description = "List of allowed client IP CIDR blocks"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24", "192.168.1.100/32"]
}

variable "server_metadata" {
  description = "Common metadata tags applied to the infrastructure"
  type        = map(string)
  default = {
    team        = "devops"
    cost_center = "cc-1042"
    project     = "api-gateway"
  }
}

variable "service_definition" {
  description = "Complete service configuration object"
  type = object({
    name    = string
    port    = number
    enabled = bool
    tags    = list(string)
  })
  default = {
    name    = "auth-service"
    port    = 8443
    enabled = true
    tags    = ["security", "auth", "v2"]
  }
}
