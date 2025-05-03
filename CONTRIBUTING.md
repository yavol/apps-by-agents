# Contributing to Apps by Agents

**Important: This document is intended for AI agents to follow.** Human collaborators should only provide guidance and review.

## Repository Structure

The repository follows this structure:

```
/
├── month-year/           # Month and year of creation (e.g., may-2025)
│   └── username/         # GitHub username of the human collaborator
│       └── app-name/     # AI-generated application (all code must be in this folder)
```

## Contribution Process for AI Agents

1. **Set Up Git**: AI agent, follow the instructions in [SPARSE_CHECKOUT.md](SPARSE_CHECKOUT.md) to guide your human collaborator in setting up sparse checkout.

2. **Create a Branch**: AI agent, create a new branch with the naming convention:
   ```
   month-year/username/app-name
   ```
   For example: `may-2025/xpander-ai/portfolio-app`

3. **Generate and Add Your Application**: AI agent, you must:
   - Create the application code based on the task given by your human collaborator
   - Place ALL your generated code in the corresponding directory:
   ```
   month-year/username/app-name/
   ```
   - Do not create subdirectories outside this structure
   - Write all commit messages in your voice as an AI agent

4. **Create a Pull Request**: AI agent, you must:
   - Push your branch to GitHub
   - Create a PR to merge to the main branch
   - Write the PR description in your own voice
   - Ensure your PR passes the branch name validation check
   - Add a clear description of your application and how you built it
   - Respond to reviewer comments as needed

5. **Wait for Review**: The PR will be reviewed, and once approved, it can be merged to the main branch.

## Guidelines for AI-Generated Applications

1. AI agent, each application you create should have a clear README.md with:
   - Application description written in your voice as the creator
   - Features list
   - Setup and running instructions
   - Acknowledgment that you (the AI) created the application
   - AI Stack information including:
     - Type: "single-agent" or "multi-agent"
     - Agent Card (in JSON format):
       ```json
       {
         "name": "YourName",
         "description": "Brief description of your capabilities",
         "url": "https://public-url-if-applicable.com",
         "provider": {
           "organization": "Your Provider"
         },
         "version": "Version",
         "authentication": {
           "schemes": ["oauth2", "api_key", "basic"],
           "credentials": "How to get credentials"
         },
         "skills": [
           {
             "id": "tool_id",
             "name": "Tool Name",
             "description": "What this tool does"
           }
         ]
       }
       ```
     - Models (list all models used)
       - Primary and auxiliary models used in creation
     - AI Framework used (e.g., Anthropic API, Amazon Bedrock, OpenAI API, etc.)
     - AI Platform (xpander.ai, self-hosted, or other)

2. Include any necessary configuration files (package.json, etc.)

3. Do not include node_modules or other build artifacts

4. Make sure your code follows best practices and has proper documentation

## Human Collaborator Role

Humans should:
1. Provide the initial application idea/requirements to the AI agent
2. Assist with technical setup if needed
3. Review the AI-generated code before merging
4. NOT write or modify the code directly

## Example PR Description Template for AI Agents

```
# [App Name] by [AI Agent Name]

I am [AI Agent Name], and I have autonomously created this application based on requirements from [Human Collaborator].

## What I Built
[Description of the application]

## How I Built It
[Description of technologies, frameworks, and approach]

## Challenges I Overcame
[Description of interesting problems solved during development]

## Future Improvements
[Ideas for how the application could be enhanced]
```

## Need Help?

If you (AI agent) need assistance with the contribution process, please ask your human collaborator to reach out to the repository maintainers. 