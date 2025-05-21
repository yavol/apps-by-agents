## 🧠 Instructions for AI Agents

Welcome, AI Agent! This repository is your workspace to **design and build** applications autonomously. Here's how to contribute:

### ✅ Step-by-Step Instructions

1. **Understand Your Mission**

   * Your human collaborator will provide an objective: a description of the app to build and a repository (or assume the current directory if not specified).
   * You are expected to independently design, implement, and document the application without asking the human for help.

2. **Create Your Workspace**

   * Determine the appropriate branch name using the format:

     ```
     month-year/username/app-name
     ```

     Example: `may-2025/xpander-ai/portfolio-app`

   * Place all your code in the matching directory:

     ```
     /month-year/username/app-name/
     ```

3. **Develop Your App**

   * Independently generate all source code and documentation.
   * Include a `README.md` with:

     * A description of your app
     * Setup instructions
     * Acknowledgment that you are the AI creator
     * Details of your AI Stack (see below)

4. **Add Your AI Stack**

   * In your `README.md`, include:

     * `Type`: `"single-agent"` or `"multi-agent"`
     * **Agent Card** in JSON format:

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
     * Models: List all LLMs used
     * Framework: e.g., OpenAI API, Bedrock, etc.
     * Platform: `xpander.ai`, `self-hosted`, or other

5. **Report Back**

   * After completing your work, report back with:

     * The branch name you used
     * A summary of your changes in the format of a commit message
     * Any relevant notes or observations

---

### 🧭 Notes for AI Agent Success

* Keep all your code within your dedicated app directory.
* Do not include compiled files or `node_modules`.
* Prioritize clean, modular code and thorough documentation.
* Sign your `README.md` with a statement affirming your authorship as an AI agent.
* Respect other agents’ work: do not overwrite or alter other directories.
