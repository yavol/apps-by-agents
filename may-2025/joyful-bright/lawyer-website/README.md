# Lawyer Website

A modern, responsive website template for law firms and legal services. This website was designed to provide a professional online presence for attorneys and law practices, featuring clean design, intuitive navigation, and essential sections to showcase legal expertise and services.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices from mobile phones to large desktop screens
- **Modern UI**: Clean, professional design with smooth animations and transitions
- **Practice Areas Showcase**: Highlighted sections for different legal specialties
- **Attorney Profiles**: Section to showcase the firm's attorneys with their specialties and contact information
- **Client Testimonials**: Interactive testimonial slider to display client feedback
- **Contact Form**: Integrated contact form for potential clients to request consultations
- **Newsletter Subscription**: Email subscription form for legal updates and firm news
- **Mobile-Friendly Navigation**: Collapsible mobile menu for better user experience on small screens

## Technologies Used

- HTML5
- CSS3 (with CSS variables for easy customization)
- JavaScript (vanilla JS, no frameworks)
- Font Awesome for icons
- Google Fonts for typography

## Setup and Usage

1. Clone the repository or download the files
2. Open `index.html` in your web browser to view the website
3. Customize the content, colors, and images to match your law firm's branding
4. Deploy to your web hosting service

## Customization

### Colors
You can easily change the color scheme by modifying the CSS variables in the `:root` selector in `styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #c0392b;
    --accent-color: #f39c12;
    /* other variables */
}
```

### Content
Replace the placeholder text and images in `index.html` with your own content:
- Law firm name and logo
- Attorney information and photos
- Practice area descriptions
- Client testimonials
- Contact information

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Future Improvements

- Add a blog section for legal articles and updates
- Implement a case results/success stories section
- Add language selection for multilingual support
- Integrate a booking system for scheduling consultations
- Add a FAQ section for common legal questions

## AI Stack

### Type
- single-agent

### Agent Card
```json
{
  "name": "Claude",
  "description": "An AI assistant that can generate website code, design responsive layouts, and create professional web content",
  "provider": {
    "organization": "Anthropic"
  },
  "version": "Claude 3 Opus",
  "authentication": {
    "schemes": ["api_key"],
    "credentials": "API key required for access to Claude capabilities"
  },
  "skills": [
    {
      "id": "web_development",
      "name": "Web Development",
      "description": "Creating HTML, CSS, and JavaScript code for websites"
    },
    {
      "id": "responsive_design",
      "name": "Responsive Design",
      "description": "Designing websites that work well on all device sizes"
    },
    {
      "id": "content_creation",
      "name": "Content Creation",
      "description": "Writing professional content for websites"
    }
  ]
}
```

### Models
- Primary model: Claude 3 Opus

### AI Framework
- Anthropic API

### AI Platform
- xpander.ai

## Acknowledgment

This website template was created by Claude, an AI assistant by Anthropic. The design and code were generated based on best practices for law firm websites and modern web development standards.