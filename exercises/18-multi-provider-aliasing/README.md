# Exercise 18: Provider Aliases & Multi-Region Topology

## 🎯 Objectives
- Configure multiple instances of a provider using `alias`.
- Target specific resources to specific provider instances via `provider = ...`.
- Pass aliased providers down to child modules with `providers = { ... }`.

## 📖 Key Concepts
- **Provider Alias**: Useful when provisioning resources across multiple cloud regions, AWS accounts, or target datacenters in a single Terraform configuration.
- **Passing to Modules**: By default, child modules inherit default providers. To use an alias, pass explicitly:
  ```hcl
  module "dr_site" {
    source    = "./modules/site"
    providers = {
      aws = aws.us_west_2
    }
  }
  ```

## 📝 Your Task
In `starter/`:
1. In `providers.tf`, configure simulated regional providers with aliases `primary` and `secondary`.
2. In `main.tf`, deploy files simulating primary region services and secondary disaster-recovery services.
3. In `outputs.tf`, expose the primary and secondary region endpoints.

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform apply -auto-approve
cat primary_region.txt
cat secondary_region.txt
terraform output
terraform destroy -auto-approve
```
