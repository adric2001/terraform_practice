terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.4"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5"
    }
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Project     = "TerraformPracticePortal"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# Unique suffix for S3 bucket globally
resource "random_id" "bucket_suffix" {
  byte_length = 4
}

# ==============================================================================
# S3 & CloudFront Web Hosting Tier
# ==============================================================================

resource "aws_s3_bucket" "portal_bucket" {
  bucket        = "${var.app_name}-${var.environment}-${random_id.bucket_suffix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_public_access_block" "portal_pab" {
  bucket = aws_s3_bucket.portal_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudfront_origin_access_control" "oac" {
  name                              = "${var.app_name}-oac"
  description                       = "Origin Access Control for S3 Portal Bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "cdn" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Terraform Associate 004 Practice Portal CDN"
  default_root_object = "index.html"
  price_class         = "PriceClass_100" # Lowest cost (US, Canada, Europe)

  origin {
    domain_name              = aws_s3_bucket.portal_bucket.bucket_regional_domain_name
    origin_id                = "S3Origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.oac.id
  }

  default_cache_behavior {
    target_origin_id       = "S3Origin"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 300
    max_ttl     = 3600
    compress    = true
  }

  # SPA Routing: Redirect 403/404 to index.html with 200 status
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Policy allowing CloudFront OAC to read from S3
data "aws_iam_policy_document" "s3_oac_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.portal_bucket.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.cdn.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "portal_bucket_policy" {
  bucket = aws_s3_bucket.portal_bucket.id
  policy = data.aws_iam_policy_document.s3_oac_policy.json
}

# ==============================================================================
# Amazon Cognito User Authentication Tier
# ==============================================================================

resource "aws_cognito_user_pool" "pool" {
  name                     = "${var.app_name}-${var.environment}-users"
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_uppercase = true
    require_symbols   = false
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_subject        = "Your Terraform Practice Portal Verification Code"
    email_message        = "Welcome to the Terraform Associate (004) Practice Portal! Your verification code is {####}."
  }

  admin_create_user_config {
    allow_admin_create_user_only = false
  }

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }
}

resource "aws_cognito_user_pool_client" "client" {
  name         = "${var.app_name}-${var.environment}-web-client"
  user_pool_id = aws_cognito_user_pool.pool.id

  generate_secret = false # False for single-page applications

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]

  prevent_user_existence_errors = "ENABLED"
}

# ==============================================================================
# Amazon DynamoDB Persistence Tier ($0 Idle Cost / Pay-Per-Request)
# ==============================================================================

resource "aws_dynamodb_table" "sessions" {
  name         = "tf_practice_user_sessions"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "user_id"
  range_key    = "session_id"

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "session_id"
    type = "S"
  }
}

resource "aws_dynamodb_table" "questions" {
  name         = "tf_practice_user_questions"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "user_id"
  range_key    = "question_id"

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "question_id"
    type = "S"
  }
}

# ==============================================================================
# AWS Lambda Backend API Service
# ==============================================================================

# Package Lambda function and data directory into zip
data "archive_file" "lambda_zip" {
  type        = "zip"
  output_path = "${path.module}/lambda_package.zip"

  source {
    content  = file("${path.module}/../backend/lambda_handler.py")
    filename = "lambda_handler.py"
  }

  # Include questions data files
  dynamic "source" {
    for_each = fileset("${path.module}/../backend/data", "*.json")
    content {
      content  = file("${path.module}/../backend/data/${source.value}")
      filename = "data/${source.value}"
    }
  }
}

resource "aws_iam_role" "lambda_exec" {
  name = "${var.app_name}-${var.environment}-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Scoped DynamoDB & Cognito policy for Lambda
data "aws_iam_policy_document" "lambda_dynamo_policy" {
  statement {
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:BatchWriteItem"
    ]
    resources = [
      aws_dynamodb_table.sessions.arn,
      aws_dynamodb_table.questions.arn
    ]
  }

  statement {
    actions = [
      "cognito-idp:ListUsers",
      "cognito-idp:DescribeUserPool"
    ]
    resources = [
      aws_cognito_user_pool.pool.arn
    ]
  }
}

resource "aws_iam_role_policy" "lambda_dynamo" {
  name   = "${var.app_name}-dynamo-access"
  role   = aws_iam_role.lambda_exec.id
  policy = data.aws_iam_policy_document.lambda_dynamo_policy.json
}

resource "aws_lambda_function" "api" {
  function_name    = "${var.app_name}-${var.environment}-api"
  handler          = "lambda_handler.lambda_handler"
  runtime          = "python3.12"
  architectures    = ["arm64"]
  role             = aws_iam_role.lambda_exec.arn
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  timeout          = 15
  memory_size      = 256

  environment {
    variables = {
      SESSIONS_TABLE  = aws_dynamodb_table.sessions.name
      QUESTIONS_TABLE = aws_dynamodb_table.questions.name
      USER_POOL_ID    = aws_cognito_user_pool.pool.id
      APP_REGION      = var.aws_region
    }
  }
}

# ==============================================================================
# Amazon API Gateway HTTP API v2 with Cognito Authorizer
# ==============================================================================

resource "aws_apigatewayv2_api" "http_api" {
  name          = "${var.app_name}-${var.environment}-http-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "OPTIONS"]
    allow_headers = ["Authorization", "Content-Type", "X-Amz-Date", "X-Api-Key", "X-Amz-Security-Token", "x-user-id"]
    max_age       = 300
  }
}

resource "aws_apigatewayv2_authorizer" "cognito" {
  api_id           = aws_apigatewayv2_api.http_api.id
  authorizer_type  = "JWT"
  identity_sources = ["$request.header.Authorization"]
  name             = "cognito-jwt-authorizer"

  jwt_configuration {
    issuer   = "https://${aws_cognito_user_pool.pool.endpoint}"
    audience = [aws_cognito_user_pool_client.client.id]
  }
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.api.invoke_arn
  payload_format_version = "2.0"
}

# Protected Routes
resource "aws_apigatewayv2_route" "route_profile" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "GET /api/profile"
  target             = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}

resource "aws_apigatewayv2_route" "route_sessions" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "POST /api/sessions"
  target             = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}

resource "aws_apigatewayv2_route" "route_labs_complete" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "POST /api/labs/complete"
  target             = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}

resource "aws_apigatewayv2_route" "route_weak_areas" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "GET /api/weak-areas"
  target             = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}

resource "aws_apigatewayv2_route" "route_custom_exam" {
  api_id             = aws_apigatewayv2_api.http_api.id
  route_key          = "POST /api/exams/custom"
  target             = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
  authorization_type = "JWT"
  authorizer_id      = aws_apigatewayv2_authorizer.cognito.id
}

# Public Health Route
resource "aws_apigatewayv2_route" "route_health" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /api/health"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

# Public Stats & Community Users Route
resource "aws_apigatewayv2_route" "route_stats" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /api/stats"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}
