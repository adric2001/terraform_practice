#!/usr/bin/env bash
# run_exam.sh: Quick launcher for the Terraform Associate (004) Interactive Simulator
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ "$1" == "--web" ] || [ "$1" == "-w" ]; then
  echo "🌐 Opening Interactive Browser Simulator..."
  open "$SCRIPT_DIR/exams/simulator.html"
else
  python3 "$SCRIPT_DIR/exams/simulator.py"
fi
