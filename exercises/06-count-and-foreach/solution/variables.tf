variable "server_names" {
  description = "List of server hostnames to instantiate"
  type        = list(string)
  default     = ["auth", "payments", "worker"]
}

variable "service_roles" {
  description = "Map of service role names to port numbers"
  type        = map(number)
  default = {
    frontend = 80
    backend  = 8080
    db       = 5432
  }
}
