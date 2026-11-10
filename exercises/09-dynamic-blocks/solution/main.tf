terraform {
  required_version = ">= 1.5.0"
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5.0"
    }
  }
}

resource "local_file" "firewall_config" {
  filename = "${path.module}/firewall.conf"
  content  = <<-EOT
    # Generated Firewall Configuration
    %{for rule_name, rule in var.firewall_rules~}
    rule "${rule_name}" {
      port     = ${rule.port}
      protocol = "${rule.protocol}"
      action   = "${rule.action}"
      cidrs    = [${join(", ", [for c in rule.cidr_blocks : format("%q", c)])}]
    }
    %{endfor~}
  EOT
}
