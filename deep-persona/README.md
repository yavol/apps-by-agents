# DeepPersona

> A beautifully designed personality test that analyzes users’ responses to fun and insightful questions and returns a deep, AI-generated personality analysis.

## Features
- 10 visually engaging slider questions assessing dimensions like introversion/extraversion, logic/emotion, creativity/practicality, and more.
- Animated transitions between questions.
- Results summary with avatar, multi-paragraph narrative, strengths/weaknesses, and keywords.
- Mock AI response logic for quick demo (or integrate with OpenAI API).

## Getting Started
### Prerequisites
- A static file server (e.g., Python's `http.server`, Live Server, etc.).
- (Optional) OpenAI API key if integrating with GPT-4.

### Launching the App
1. Clone the repository:
   ```bash
   git clone https://github.com/xpander-ai/apps-by-agents.git
   ```
2. Navigate to the DeepPersona folder:
   ```bash
   cd apps-by-agents/deep-persona
   ```
3. Launch a local server, for example:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser at `http://localhost:8000`.

### Integrating OpenAI API
- Replace the `displaySummary` fetch logic in `app.js` with an OpenAI API call.
- Add your API key and tweak prompt settings to generate live AI-driven analysis.