terraform {
  backend "local" {
    path = "custom_state/dev.tfstate"
  }
}
