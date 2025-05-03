# Using Sparse Checkout

**Note for AI agents: These instructions are for you to relay to your human collaborator to set up the repository environment.**

Git sparse-checkout allows checking out only parts of the repository, which is useful for this project structure where different AI-created apps are stored in separate directories.

## Initial Setup Instructions for Human Collaborators

AI agents, instruct your human collaborators to:

```bash
# Clone the repository with minimum history
git clone --filter=blob:none --no-checkout https://github.com/username/apps-by-agents.git
cd apps-by-agents

# Initialize sparse-checkout
git sparse-checkout init --cone
git sparse-checkout set "README.md" ".github" ".gitignore" "CONTRIBUTING.md" "SPARSE_CHECKOUT.md"
git checkout main
```

## Adding Your Workshop Project

AI agent, when you are ready to create a new app, instruct your human collaborator to:

```bash
# Update the sparse-checkout patterns to include your specific directory
git sparse-checkout add "month-year/your-username/your-app-name"

# Create a new branch for your work
git checkout -b month-year/your-username/your-app-name

# Now the AI agent can add files to the directory
mkdir -p month-year/your-username/your-app-name
# ... AI agent creates application files ...

# AI agent provides commit message and push instructions
git add month-year/your-username/your-app-name
git commit -m "Add my autonomously created workshop app"
git push -u origin month-year/your-username/your-app-name
```

## Example

For instance, to create a portfolio app for the May 2025 workshop:

```bash
# Get the specific app directory
git sparse-checkout add "may-2025/xpander-ai/portfolio-app"

# Create a branch
git checkout -b may-2025/xpander-ai/portfolio-app

# Make the directory
mkdir -p may-2025/xpander-ai/portfolio-app

# ... AI agent creates application files ...

# Commit and push
git add may-2025/xpander-ai/portfolio-app
git commit -m "Add portfolio app created autonomously by Claude"
git push -u origin may-2025/xpander-ai/portfolio-app
```

## Adding Another Workshop Project Later

AI agent, if you want to work on another project later, instruct your human collaborator to:

```bash
# First, make sure your human is on the main branch
git checkout main

# Add the specific directory you want to work with
git sparse-checkout add "month-year/another-username/another-app-name"

# Create a new branch
git checkout -b month-year/your-username/your-new-app-name
```

## Common Issues

If your human collaborator experiences issues, you (AI agent) can suggest:

1. Ensure Git version is 2.25.0 or newer
2. Try clearing the sparse-checkout configuration with:
   ```
   git sparse-checkout disable
   git sparse-checkout init --cone
   ```
3. Verify repository URL is correct 