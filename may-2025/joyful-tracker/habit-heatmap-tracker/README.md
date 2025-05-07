# Habit Heatmap Tracker

A Progressive Web App (PWA) for tracking habits with a visual calendar heatmap, similar to GitHub's contribution graph.

## Features

- **Create, Edit, and Delete Habits**: Easily manage your habits with a simple interface
- **Daily Tracking**: Mark habits as complete for any day
- **Calendar Heatmap**: Visual representation of your habit consistency
- **Habit Statistics**: View current streak, longest streak, and completion rate
- **Offline Support**: Works without an internet connection
- **Local Storage**: All data is stored locally on your device
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **PWA Support**: Can be installed as a standalone app

## Screenshots

(Screenshots will be added here)

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage API
- Service Workers
- Web App Manifest

## Installation

As a Progressive Web App, Habit Heatmap Tracker can be installed on your device:

1. Visit the app in a modern browser
2. The browser should prompt you to install the app
3. Alternatively, use the browser menu to "Add to Home Screen" or "Install"

## Development

### Prerequisites

- A modern web browser
- A local web server (optional for development)

### Setup

1. Clone the repository:
```
git clone https://github.com/xpander-ai/apps-by-agents.git
cd apps-by-agents/may-2025/joyful-tracker/habit-heatmap-tracker
```

2. Open `index.html` in your browser or serve the directory with a local web server.

### Project Structure

```
habit-heatmap-tracker/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── app.js              # Main application logic
├── service-worker.js   # Service worker for offline functionality
├── manifest.json       # Web app manifest for PWA
├── icons/              # App icons for various sizes
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── ...
│   └── icon-512x512.png
└── README.md           # This file
```

## How It Works

### Data Storage

All habit data is stored in the browser's localStorage. The data structure is as follows:

```javascript
[
  {
    id: "unique-id",
    name: "Habit Name",
    description: "Habit Description",
    color: "#4CAF50",
    createdAt: "2025-05-01T12:00:00.000Z",
    completedDates: {
      "2025-05-01": true,
      "2025-05-02": true,
      // More dates...
    }
  },
  // More habits...
]
```

### Heatmap Visualization

The heatmap uses a color intensity scale to represent habit consistency:

- Level 0: No completion (light gray)
- Level 1: Single day completion (light green)
- Level 2: 2-day streak (medium-light green)
- Level 3: 3-day streak (medium-dark green)
- Level 4: 4+ day streak (dark green)

### Statistics Calculation

- **Current Streak**: Consecutive days of habit completion up to today
- **Longest Streak**: Longest consecutive period of habit completion
- **Completion Rate**: Percentage of days the habit was completed since creation

## Future Enhancements

- Data export/import functionality
- Multiple habit tracking on the same day
- Custom reminder notifications
- Weekly and monthly view options
- Data visualization and trends
- Cloud sync (optional)

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- Inspired by GitHub's contribution graph
- Created as part of the apps-by-agents project by Xpander AI