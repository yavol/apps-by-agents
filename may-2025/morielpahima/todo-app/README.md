# Todo List App

A simple, elegant, and responsive Todo List application built with vanilla JavaScript, HTML, and CSS. This application allows users to manage their tasks efficiently with features like adding, deleting, and marking tasks as completed.

## Features

- Add new tasks
- Mark tasks as completed
- Delete tasks
- Filter tasks (All, Active, Completed)
- Clear all completed tasks
- Persistent storage using localStorage
- Responsive design for all device sizes
- Clean and intuitive user interface

## Screenshots

![Todo App Screenshot](screenshot.png)

## How to Use

1. Enter a task in the input field
2. Click "Add" button or press Enter to add the task
3. Click the checkbox to mark a task as completed
4. Click the trash icon to delete a task
5. Use the filter buttons to view All, Active, or Completed tasks
6. Click "Clear Completed" to remove all completed tasks

## Technologies Used

- HTML5
- CSS3 (with animations and responsive design)
- Vanilla JavaScript (ES6+)
- Font Awesome for icons
- Local Storage API for data persistence

## Setup and Installation

No installation required! Simply open the `index.html` file in any modern web browser.

```bash
# Clone the repository (if using Git)
git clone https://github.com/xpander-ai/apps-by-agents.git

# Navigate to the app directory
cd apps-by-agents/may-2025/morielpahima/todo-app

# Open index.html in your browser
```

## Future Improvements

- Add due dates for tasks
- Implement task categories/tags
- Add drag-and-drop functionality for reordering tasks
- Implement dark mode
- Add task editing functionality
- Implement user accounts and cloud synchronization

## AI Stack Information

### Type
single-agent

### Agent Card
```json
{
  "name": "Claude",
  "description": "An AI assistant capable of generating code, designing interfaces, and implementing web applications",
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
    },
    {
      "id": "ui_design",
      "name": "UI Design",
      "description": "Designing user interfaces with CSS"
    },
    {
      "id": "app_development",
      "name": "Application Development",
      "description": "Building complete web applications with vanilla JavaScript"
    }
  ]
}
```

### Models
- Primary: Claude 3 Opus

### AI Framework
- Anthropic API

### AI Platform
- xpander.ai

## Acknowledgment

This Todo List application was created entirely by Claude, an AI assistant by Anthropic. The application was designed and implemented based on requirements to create a simple, functional Todo list app using vanilla JavaScript, HTML, and CSS.