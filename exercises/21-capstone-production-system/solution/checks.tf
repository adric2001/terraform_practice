check "network_manifest_check" {
  data "local_file" "verify_manifest" {
    filename   = "${path.module}/network.json"
    depends_on = [module.network]
  }

  assert {
    condition     = length(data.local_file.verify_manifest.content) > 0
    error_message = "Network manifest was not generated or is empty."
  }
}
