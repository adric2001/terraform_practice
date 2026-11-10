variable "server_names" {
  type    = list(string)
  default = ["auth", "payments", "worker"]
}

variable "service_roles" {
  type = map(number)
  default = {
    frontend = 80
    backend  = 8080
    db       = 5432
  }
}
