#!/usr/bin/env bash

set -euo pipefail

ROOT="aegis-constitution"
CANON_DIR="$ROOT/canon"

echo "Creating Aegis canon structure..."

# Create root + canon directory
mkdir -p "$CANON_DIR"

# Create ordered canon files
touch "$CANON_DIR/00-preamble.md"
touch "$CANON_DIR/01-charter.md"
touch "$CANON_DIR/02-doctrine.md"
touch "$CANON_DIR/03-principles.md"
touch "$CANON_DIR/04-architecture.md"
touch "$CANON_DIR/05-governance.md"
touch "$CANON_DIR/06-threat-model.md"
touch "$CANON_DIR/07-execution.md"
touch "$CANON_DIR/08-memory.md"
touch "$CANON_DIR/09-protocols.md"
touch "$CANON_DIR/10-oversight.md"
touch "$CANON_DIR/11-version-history.md"
touch "$CANON_DIR/references.md"

echo "Canon structure created successfully."

# Print resulting tree (if tree is installed)
if command -v tree &> /dev/null; then
    tree "$ROOT"
else
    echo "Install 'tree' to visualize structure."
fi

echo "Done."