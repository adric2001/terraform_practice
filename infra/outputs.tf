output "portal_url" {
  description = "Public HTTPS CloudFront URL of the Terraform Practice Portal"
  value       = "https://${aws_cloudfront_distribution.cdn.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "CloudFront Distribution ID for cache invalidations"
  value       = aws_cloudfront_distribution.cdn.id
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket hosting frontend assets"
  value       = aws_s3_bucket.portal_bucket.id
}

output "cognito_user_pool_id" {
  description = "Cognito User Pool ID"
  value       = aws_cognito_user_pool.pool.id
}

output "cognito_client_id" {
  description = "Cognito App Client ID (Public SPA Client)"
  value       = aws_cognito_user_pool_client.client.id
}

output "api_endpoint" {
  description = "Base URL of the API Gateway HTTP API"
  value       = aws_apigatewayv2_api.http_api.api_endpoint
}

output "aws_region" {
  description = "Target AWS Region"
  value       = var.aws_region
}
