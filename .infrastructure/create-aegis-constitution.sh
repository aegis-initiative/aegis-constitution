#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="aegis-constitution"

echo "Creating Aegis Constitution structure..."

# Create root directory
mkdir -p "$ROOT_DIR"

# Create top-level HTML files
touch "$ROOT_DIR/index.html"
touch "$ROOT_DIR/charter.html"
touch "$ROOT_DIR/doctrine.html"
touch "$ROOT_DIR/principles.html"
touch "$ROOT_DIR/architecture.html"
touch "$ROOT_DIR/governance.html"
touch "$ROOT_DIR/threat-model.html"
touch "$ROOT_DIR/execution.html"
touch "$ROOT_DIR/memory.html"
touch "$ROOT_DIR/protocols.html"
touch "$ROOT_DIR/oversight.html"
touch "$ROOT_DIR/version.html"

# Create subdirectories
mkdir -p "$ROOT_DIR/css"
mkdir -p "$ROOT_DIR/js"
mkdir -p "$ROOT_DIR/assets"
mkdir -p "$ROOT_DIR/data"

# Create nested files
touch "$ROOT_DIR/css/styles.css"
touch "$ROOT_DIR/js/main.js"
touch "$ROOT_DIR/assets/hero.png"
touch "$ROOT_DIR/data/version.json"

echo "Structure created successfully."

# Optional: Initialize git repository
read -p "Initialize as a Git repository? (y/n): " init_git
if [[ "$init_git" == "y" ]]; then
    cd "$ROOT_DIR"
    git init
    echo "# Aegis Constitution" > README.md
    git add .
    git commit -m "Initial Aegis Constitution structure"
    echo "Git repository initialized."
fi

echo "Done."