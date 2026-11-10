# Exercise 21: Capstone - Production Multi-Tier System

## 🎯 Objectives
- Synthesize all mastered concepts into a unified production-grade architecture.
- Integrate modular child modules: `networking` and `secure_vault`.
- Implement continuous architectural assertions using `check` blocks (Terraform 1.5+).
- Write comprehensive native automated tests in `tests/capstone.tftest.hcl`.

## 📖 Architecture Overview
The Capstone system provisions an entire enterprise tier:
1. **Networking Module**: Computes subnets, route tables, and firewall rules.
2. **Secure Vault Module**: Generates RSA certificates, credentials, and access policies.
3. **Root Module**: Assembles modules, connects outputs, enforces naming standards.
4. **Health Checks (`check` block)**: Continuously validates that all endpoints comply with naming and port guidelines.
5. **Automated Testing (`terraform test`)**: Runs integration assertions ensuring system integrity before deployment.

## 📝 Your Task
In `starter/`:
1. Review the module contracts in `modules/networking` and `modules/secure_vault`.
2. In `main.tf`, instantiate both modules and wire them together.
3. In `checks.tf`, implement a `check` block verifying that the generated network manifest exists.
4. Run `terraform test` to ensure the capstone test suite passes with zero errors!

## 🧪 Verification Steps
```bash
cd starter
terraform init
terraform test
terraform apply -auto-approve
cat environment_summary.json
terraform destroy -auto-approve
```
