# Icon Generation Instructions

This file contains instructions for generating the necessary icons for the Habit Heatmap Tracker PWA.

## Required Icons

The following icon sizes are needed for the PWA:

- favicon.ico (16x16, 32x32)
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## Icon Design

The icon should represent a habit tracking app with a heatmap calendar theme. Suggested design:

- A simple calendar icon with a gradient color scheme similar to GitHub's contribution heatmap
- Use the primary color (#4CAF50) as the main color
- Keep the design simple and recognizable at small sizes

## Tools for Icon Generation

You can use the following tools to generate the icons:

1. Adobe Illustrator or Photoshop
2. Figma
3. Sketch
4. Online tools like:
   - [Favicon.io](https://favicon.io/)
   - [RealFaviconGenerator](https://realfavicongenerator.net/)
   - [Iconifier](https://iconifier.net/)

## Generation Process

1. Create a master icon at 512x512 pixels
2. Export/resize to all the required dimensions
3. Ensure the icons are properly optimized for web use
4. Place all icons in this directory

Once the icons are generated, they will be automatically used by the PWA through the manifest.json file.