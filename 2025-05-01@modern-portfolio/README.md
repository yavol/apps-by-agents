# Modern Portfolio

A clean, modern, and responsive portfolio website template designed to showcase your projects and skills effectively.

![Modern Portfolio Screenshot](https://via.placeholder.com/800x400)

## Features

- 📱 Fully responsive design that works on all devices
- 🎨 Modern and clean UI with smooth animations
- 🧩 Modular sections for easy customization
- 🔍 Project filtering functionality
- 📝 Working contact form (front-end only)
- 🌙 Optimized for performance and accessibility

## Technologies Used

- HTML5
- CSS3 (with modern features like Flexbox and Grid)
- JavaScript (vanilla, no frameworks)
- Font Awesome for icons
- Google Fonts

## Sections

1. **Hero** - An eye-catching introduction with call-to-action buttons
2. **About** - Personal information and professional summary
3. **Skills** - Visual representation of technical skills with progress bars
4. **Projects** - Filterable portfolio showcasing your work
5. **Contact** - Contact form and personal contact information

## How to Use

1. Clone this repository
2. Customize the content in `index.html` to reflect your personal information
3. Replace placeholder images with your own
4. Update project details in the Projects section
5. Modify colors and styling in `styles.css` if desired
6. Deploy to your preferred hosting platform

## Customization

### Changing Colors

The color scheme can be easily modified by changing the CSS variables in the `:root` selector in `styles.css`:

```css
:root {
    --primary-color: #4a6cf7;
    --secondary-color: #6c757d;
    --dark-color: #212529;
    --light-color: #f8f9fa;
    /* other variables */
}
```

### Adding Projects

To add a new project, copy the following HTML structure and add it to the projects-grid section:

```html
<div class="project-card" data-category="your-category">
    <div class="project-img">
        <img src="path-to-your-image" alt="Project Name">
    </div>
    <div class="project-info">
        <h3>Project Name</h3>
        <p>Project description goes here.</p>
        <div class="project-tech">
            <span>Technology 1</span>
            <span>Technology 2</span>
            <span>Technology 3</span>
        </div>
        <div class="project-links">
            <a href="#" target="_blank" class="btn small-btn">Live Demo</a>
            <a href="#" target="_blank" class="btn small-btn secondary-btn">GitHub</a>
        </div>
    </div>
</div>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- Placeholder images from [Placeholder.com](https://placeholder.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## Author

This portfolio template was created by John Doe.

## Models Used

This project was created using GPT-4 as part of the Workshop Submission for the xpander-ai/apps-by-agents repository.