variable "firewall_rules" {
  type = map(object({
    port        = number
    protocol    = string
    cidr_blocks = list(string)
    action      = string
  }))
  default = {
    allow_http = {
      port        = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
      action      = "allow"
    }
    allow_https = {
      port        = 443
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
      action      = "allow"
    }
    allow_ssh = {
      port        = 22
      protocol    = "tcp"
      cidr_blocks = ["10.0.0.0/8"]
      action      = "allow"
    }
  }
}
