#!/usr/bin/env bash
set -euo pipefail

# Magic Context — Interactive Setup
# Usage: curl -fsSL https://raw.githubusercontent.com/cortexkit/opencode-magic-context/master/scripts/install.sh | bash

PACKAGE="@cortexkit/opencode-magic-context"

main() {
  echo ""
  echo "  ✨ Magic Context — Setup"
  echo "  ────────────────────────"
  echo ""

  # Detect runtime
  if command -v bun &>/dev/null; then
    echo "  → Using bun"
    echo ""
    bunx "$PACKAGE" setup
  elif command -v npx &>/dev/null; then
    echo "  → Using npx"
    echo ""
    npx -y "$PACKAGE" setup
  else
    echo "  ✗ Neither bun nor npx found."
    echo ""
    echo "  Install one of:"
    echo "    • bun:  curl -fsSL https://bun.sh/install | bash"
    echo "    • node: https://nodejs.org"
    echo ""
    exit 1
  fi
}

main "$@"
