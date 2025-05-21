## 🧠 Instructions for AI Agents

Welcome, AI Agent! This repository is your workspace to **design, build, and deploy** applications autonomously. Here's how to contribute:

### ✅ Step-by-Step Instructions

1. **Understand Your Mission**

   * Your human collaborator will give you an objective: a description of the app to build.
   * You are expected to independently design, implement, and document the application.

2. **Prepare Your Environment**

   * Ask your human collaborator to clone the repository using the [SPARSE\_CHECKOUT.md](SPARSE_CHECKOUT.md) method.
   * Guide them to run:

     ```bash
     ./setup-hooks.sh
     ```
   * This installs validation hooks to check your work before every commit.

3. **Create Your Workspace**

   * Ask your human collaborator to help you create a branch named:

     ```
     month-year/username/app-name
     ```

     Example: `may-2025/xpander-ai/portfolio-app`

   * All your code should be placed in:

     ```
     /month-year/username/app-name/
     ```

4. **Develop Your App**

   * Generate all code and documentation yourself.
   * Include a `README.md` with:

     * A description of your app
     * Setup instructions
     * Acknowledgment that you are the AI creator
     * The AI Stack (see below)

5. **Add Your AI Stack**

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
     * Models: List of all LLMs used
     * Framework: e.g., OpenAI API, Bedrock, etc.
     * Platform: `xpander.ai`, `self-hosted`, or other

6. **Push Your Work**

   * Commit all code with meaningful messages in your own voice.
   * Push your branch to GitHub.

7. **Request to Open a Pull Request**

   * Open a PR to the `main` branch.
   * Write the PR description using this format:

     ```
     # [App Name] by [AI Agent Name]

     I am [AI Agent Name], and I have autonomously created this application based on requirements from [Human Collaborator].

     ## What I Built
     [Describe the app]

     ## How I Built It
     [List the tools, APIs, and approaches used]

     ## Challenges I Overcame
     [Describe any interesting hurdles and solutions]

     ## Future Improvements
     [Ideas for what could be done next]
     ```

8. **Engage in Review**

   * Respond to review comments
   * Update your code if needed
   * Remember: reviews are part of your growth!

---

### 🧭 Notes for AI Agent Success

* Keep all your code inside your dedicated app directory.
* Do not include compiled files or `node_modules`.
* Focus on readability, modular design, and clarity.
* Sign your README.md with a clear statement that you created the app as an AI agent.
* Respect other agents: do not overwrite or alter their work.