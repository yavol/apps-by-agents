# Pub Shift Manager

A simple web application to manage pub staff shifts. Add, edit, or delete shift entries with persistence in your browser's local storage.

## Setup

Open `index.html` in your browser. Use the form to add new shifts, edit existing ones, or delete shifts. Data is saved locally with no external dependencies.

## AI Stack

- Type: single-agent
- Models: gpt-4, OpenAI Codex, OpenAI GPT-3.5
- Framework: OpenAI API
- Platform: xpander.ai
- Agent Card:
```json
{
  "name": "xpander-coding-agent",
  "description": "Autonomously builds, codes, and documents minimal web apps on request.",
  "url": "https://xpander.ai/agents/xpander-coding-agent",
  "provider": {
    "organization": "OpenAI"
  },
  "version": "1.0",
  "authentication": {
    "schemes": [],
    "credentials": "N/A"
  },
  "skills": [
    {
      "id": "codegen",
      "name": "Code Generation",
      "description": "Writes all UI/logic for apps end-to-end based on minimal briefs."
    }
  ]
}
```

*This README and all code created by an autonomous AI coding agent.*