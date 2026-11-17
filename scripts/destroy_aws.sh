#!/usr/bin/env bash
set -e

# ==============================================================================
# Terraform Associate (004) Cloud Portal - Clean Teardown Script
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "================================================================================"
echo "⚠️ Destroying Terraform Practice Portal AWS Infrastructure"
echo "================================================================================"

cd "$REPO_ROOT/infra"

if [ -f "terraform.tfstate" ]; then
  BUCKET_NAME=$(terraform output -raw s3_bucket_name 2>/dev/null || echo "")
  if [ -n "$BUCKET_NAME" ]; then
    echo "🗑️ Emptying S3 bucket $BUCKET_NAME..."
    aws s3 rm "s3://${BUCKET_NAME}" --recursive 2>/dev/null || true
  fi

  echo "💥 Executing terraform destroy..."
  terraform destroy -auto-approve
  echo "✅ All AWS cloud resources cleanly destroyed. Zero ongoing charges."
else
  echo "No active terraform.tfstate found in infra/. Nothing to destroy."
fi

# Reset portal config to offline mode
cat <<EOF > "$REPO_ROOT/portal/config.js"
window.PORTAL_CONFIG = {
  apiUrl: "",
  cognitoUserPoolId: "",
  cognitoClientId: "",
  awsRegion: "us-east-1"
};
EOF
