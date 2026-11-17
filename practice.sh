#!/usr/bin/env bash
set -e

# ==============================================================================
# Terraform Practice CLI Runner (Isolated Git-Safe Sandbox)
# Allows practicing exercises in .work/ without dirtying the git repository!
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORK_DIR="$SCRIPT_DIR/.work"

function usage() {
  echo "Usage: ./practice.sh <command> [exercise_number]"
  echo ""
  echo "Commands:"
  echo "  start <num>    Copy starter files to isolated .work/<exercise>/ and begin"
  echo "  verify <num>   Validate your HCL code in .work/<exercise>/"
  echo "  solution <num> Compare your code with the reference solution"
  echo "  reset <num>    Reset .work/<exercise>/ back to the clean starter template"
  echo "  list           List all 21 available exercises"
  echo ""
  echo "Example: ./practice.sh start 01"
  exit 1
}

function find_exercise_dir() {
  local num="$1"
  # Pad number with 0 if single digit
  if [[ "$num" =~ ^[0-9]$ ]]; then
    num="0$num"
  fi
  local target=$(find "$SCRIPT_DIR/exercises" -maxdepth 1 -type d -name "${num}-*" | head -n 1)
  if [ -z "$target" ] || [ ! -d "$target" ]; then
    echo "❌ Exercise '$1' not found. Run './practice.sh list' to see all exercises."
    exit 1
  fi
  echo "$target"
}

CMD="$1"
NUM="$2"

if [ "$CMD" == "list" ]; then
  echo "================================================================================"
  echo "📚 Available Terraform Practice Exercises (21 Total)"
  echo "================================================================================"
  for d in $(ls -d "$SCRIPT_DIR"/exercises/[0-9][0-9]-* | sort); do
    bname=$(basename "$d")
    echo "  • $bname"
  done
  echo "================================================================================"
  exit 0
fi

if [ -z "$CMD" ] || [ -z "$NUM" ]; then
  usage
fi

EX_DIR=$(find_exercise_dir "$NUM")
EX_NAME=$(basename "$EX_DIR")
TARGET_WORK="$WORK_DIR/$EX_NAME"

case "$CMD" in
  start)
    mkdir -p "$TARGET_WORK"
    cp -r "$EX_DIR/starter/"* "$TARGET_WORK/"
    cp "$EX_DIR/README.md" "$TARGET_WORK/README.md"
    echo "================================================================================"
    echo "🚀 Exercise $EX_NAME initialized in isolated sandbox:"
    echo "📂 $TARGET_WORK"
    echo "================================================================================"
    echo "👉 Navigate to work area: cd .work/$EX_NAME"
    echo "👉 Read instructions:     cat .work/$EX_NAME/README.md"
    echo "👉 Verify your work:     ./practice.sh verify $NUM"
    echo "================================================================================"
    ;;
  verify)
    if [ ! -d "$TARGET_WORK" ]; then
      echo "❌ No active work found in $TARGET_WORK. Run './practice.sh start $NUM' first."
      exit 1
    fi
    echo "🔍 Validating HCL in $TARGET_WORK..."
    cd "$TARGET_WORK"
    
    echo "  1. Checking syntax and formatting (terraform fmt)..."
    terraform fmt -check || echo "  ⚠️ Notice: Format with 'terraform fmt' to follow HashiCorp style conventions."
    
    echo "  2. Initializing provider plugins..."
    terraform init -backend=false > /dev/null 2>&1 || true
    
    echo "  3. Validating HCL configuration..."
    if terraform validate; then
      echo "✅ SUCCESS: Configuration in .work/$EX_NAME is valid!"
    else
      echo "❌ Validation failed. Check the error output above."
    fi
    ;;
  solution)
    echo "================================================================================"
    echo "💡 Reference Solution for $EX_NAME"
    echo "================================================================================"
    if [ -d "$TARGET_WORK" ]; then
      echo "Diff against your work in .work/$EX_NAME:"
      diff -u "$TARGET_WORK/main.tf" "$EX_DIR/solution/main.tf" || true
    else
      cat "$EX_DIR/solution/main.tf"
    fi
    ;;
  reset)
    if [ -d "$TARGET_WORK" ]; then
      rm -rf "$TARGET_WORK"
    fi
    mkdir -p "$TARGET_WORK"
    cp -r "$EX_DIR/starter/"* "$TARGET_WORK/"
    cp "$EX_DIR/README.md" "$TARGET_WORK/README.md"
    echo "✅ Reset .work/$EX_NAME back to clean starter template."
    ;;
  *)
    usage
    ;;
esac
