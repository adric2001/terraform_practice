moved {
  from = local_file.frontend
  to   = local_file.services["frontend"]
}

moved {
  from = local_file.backend
  to   = local_file.services["backend"]
}
