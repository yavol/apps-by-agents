#!/bin/bash
set -e

echo "Setting up pre-commit hooks for Apps by Agents repository..."

# Create symbolic link from .git/hooks to our custom hooks
HOOK_DIR=$(git rev-parse --git-dir)/hooks
CUSTOM_HOOKS_DIR=$(git rev-parse --show-toplevel)/.github/hooks

# Ensure the hooks directory exists
mkdir -p "$HOOK_DIR"
mkdir -p "$CUSTOM_HOOKS_DIR"

# Create symlink for pre-commit hook
echo "Installing pre-commit hook..."
if [ -L "$HOOK_DIR/pre-commit" ]; then
  rm "$HOOK_DIR/pre-commit"
fi
ln -s "$CUSTOM_HOOKS_DIR/pre-commit" "$HOOK_DIR/pre-commit"

echo "Pre-commit hook installed successfully!"
echo ""
echo "The hook will validate your contribution before each commit:"
echo "- Branch naming follows the pattern month-year/username/app-name"
echo "- Directory structure matches your branch name"
echo "- README.md contains required AI attribution and sections"
echo "- All changes are within your app's directory"
echo ""
echo "✅ Setup complete!" 