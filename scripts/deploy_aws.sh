#!/usr/bin/env bash
set -e

# ==============================================================================
# Terraform Associate (004) Cloud Portal - Automated AWS Deployment Script
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "================================================================================"
echo "🚀 Deploying Terraform Practice Portal & Readiness Engine to AWS"
echo "================================================================================"

# 1. Validate AWS credentials
echo "🔍 Validating AWS identity..."
CALLER_IDENTITY=$(aws sts get-caller-identity 2>&1)
if [ $? -ne 0 ]; then
  echo "❌ AWS CLI authentication failed:"
  echo "$CALLER_IDENTITY"
  echo "Please verify credentials in ~/.aws/credentials or run 'aws configure'."
  exit 1
fi
echo "✅ Authenticated as: $(echo "$CALLER_IDENTITY" | grep "Arn" | cut -d '"' -f 4)"

# 2. Package Lambda dependencies and exam data
echo "📦 Preparing backend data files..."
mkdir -p "$REPO_ROOT/backend/data"
cp -r "$REPO_ROOT/exams/data/"* "$REPO_ROOT/backend/data/"

# 3. Provision Infrastructure via Terraform
echo "🏗️ Running Terraform in infra/..."
cd "$REPO_ROOT/infra"

terraform init -upgrade
terraform apply -auto-approve

# 4. Extract Terraform Outputs
echo "📋 Extracting Cloud Outputs..."
PORTAL_URL=$(terraform output -raw portal_url)
DIST_ID=$(terraform output -raw cloudfront_distribution_id)
BUCKET_NAME=$(terraform output -raw s3_bucket_name)
USER_POOL_ID=$(terraform output -raw cognito_user_pool_id)
CLIENT_ID=$(terraform output -raw cognito_client_id)
API_URL=$(terraform output -raw api_endpoint)
AWS_REGION=$(terraform output -raw aws_region)

echo "   • Portal URL:      $PORTAL_URL"
echo "   • S3 Bucket:       $BUCKET_NAME"
echo "   • CloudFront ID:   $DIST_ID"
echo "   • Cognito Client:  $CLIENT_ID"
echo "   • API Gateway:     $API_URL"

# 5. Generate Portal Configuration
echo "⚙️ Injecting endpoints into portal/config.js..."
cd "$REPO_ROOT"
mkdir -p portal/data
cp -r exams/data/* portal/data/

sed -e "s|%%API_ENDPOINT%%|${API_URL}|g" \
    -e "s|%%COGNITO_USER_POOL_ID%%|${USER_POOL_ID}|g" \
    -e "s|%%COGNITO_CLIENT_ID%%|${CLIENT_ID}|g" \
    -e "s|%%AWS_REGION%%|${AWS_REGION}|g" \
    portal/config.template.js > portal/config.js

# 6. Upload Web Assets to S3
echo "☁️ Syncing portal static assets to S3..."
aws s3 sync "$REPO_ROOT/portal/" "s3://${BUCKET_NAME}/" --delete

# 7. Invalidate CloudFront Distribution Cache
echo "🔄 Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*" > /dev/null

echo "================================================================================"
echo "🎉 DEPLOYMENT COMPLETE! YOUR PRACTICE PORTAL IS LIVE ON AWS:"
echo "👉 $PORTAL_URL"
echo "================================================================================"
