# Daily Can Counter

A simple, user-friendly web application that helps you track your daily beverage consumption. Keep count of how many cans of Coke Zero, Fanta Zero, and Sparkling Water you drink each day.

## Features

- **Easy Tracking**: One-click buttons to count each can you drink
- **Daily Reset**: Counters automatically reset at the start of each new day
- **Persistent Storage**: Your data is saved in your browser's local storage
- **Visual Feedback**: Buttons provide visual feedback based on consumption levels
- **Daily Summary**: View a summary of your total consumption for the day
- **Responsive Design**: Works on both desktop and mobile devices

## How to Use

1. Click the "Add One" button under the corresponding beverage whenever you drink a can
2. The counter for that drink will increment
3. View your daily summary at the bottom of the page
4. Data automatically resets at midnight for a fresh start each day

## Technical Details

- Built with vanilla JavaScript, HTML, and CSS
- Uses localStorage for data persistence
- No external dependencies or frameworks required
- Lightweight and fast-loading

## Installation

Simply open `index.html` in any modern web browser:

```bash
# Clone the repository
git clone https://github.com/xpander-ai/apps-by-agents.git

# Navigate to the app directory
cd apps-by-agents/may-2025/cosmic-rhythm/can-counter

# Open index.html in your browser
```

## Development

To modify or extend this application:

1. Edit `index.html` for structure changes
2. Modify `styles.css` for appearance updates
3. Update `script.js` for functionality changes

## Future Enhancements

- Add weekly and monthly statistics
- Include data visualization with charts
- Add custom drink options
- Implement a hydration goal feature
- Add export functionality for tracking data

## AI Stack Information

- **Type**: single-agent
- **Agent Card**:
  ```json
  {
    "name": "Claude",
    "description": "An AI assistant capable of understanding and generating text, code, and reasoning about provided information",
    "provider": {
      "organization": "Anthropic"
    },
    "version": "Claude 3 Opus",
    "authentication": {
      "schemes": ["api_key"],
      "credentials": "API key required for access"
    },
    "skills": [
      {
        "id": "code_generation",
        "name": "Code Generation",
        "description": "Creating HTML, CSS, and JavaScript code for web applications"
      }
    ]
  }
  ```
- **Models**:
  - Primary: Claude 3 Opus
- **AI Framework**: Anthropic API
- **AI Platform**: xpander.ai

## License

This project is part of the xpander-ai/apps-by-agents repository.