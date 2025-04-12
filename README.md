# Ashraf Lamaiti Portfolio

A sleek, dark-themed portfolio website with a rich, dark purple accent color scheme, animated background effects, and modern UI features.

## Live Website

Visit my portfolio website live at: [https://shraflub28.github.io/portfolio/](https://shraflub28.github.io/portfolio/)

The website is hosted using GitHub Pages, allowing easy access to view my skills, projects, and contact information online.

## Features

- Responsive design that works on all devices
- Dark theme with purple accents
- Animated profile picture with glowing effects
- Interactive animated background with floating particles
- Subtle parallax effects that respond to mouse movement
- Glass morphism UI elements with blur effects
- Interactive elements with hover effects
- Animated typing effect for the name
- Custom scrollbar to match the theme
- Comprehensive sections:
  - About Me with key highlights
  - Skills showcasing Python, JavaScript, HTML, CSS, and React
  - Video editing skills with Premiere Pro and After Effects
  - Project cards with hover animations
  - Contact information with interactive cards
- Social media links in the footer
- Dynamically updated copyright year

## How to Use

1. Visit the live website at [https://shraflub28.github.io/portfolio/](https://shraflub28.github.io/portfolio/)
2. Alternatively, you can open the `index.html` file locally in your browser to view the portfolio.
3. No server or dependencies required - it's all vanilla HTML, CSS, and JavaScript.
4. Scroll through the sections to explore skills and projects.
5. The source code is available at [GitHub repository](https://github.com/Shraflub28/portfolio)

## Hidden Features 🥚

This portfolio includes several hidden interactive features for those who explore deeply:

- **Secret Modes**: Try different key combinations or interact with specific elements in unusual ways. 
  Hint: Some classics never go out of style, including codes from the 80s.
  
- **Special Effects**: Some elements react to multiple interactions.
  Hint: Try clicking things multiple times or in sequence.
  
- **Animal Friends**: One might appear if you know where to look.
  Hint: Triple your efforts on something personal.
  
- **Alternative Themes**: There are hidden visual modes beyond the default.
  Hint: The bottom holds secrets when doubled, and some letters of the alphabet are magical when pressed repeatedly.
  
- **Digital Rain**: A popular movie effect might be hiding somewhere.
  Hint: Five is the magic number for your digital identity.

See if you can discover them all!

## Customization

### Personal Information

Edit the `index.html` file to change:
- Your profile picture (replace "pfp.jpeg" with your own image)
- Your name (replace "Ashraf Lamaiti")
- Your username (replace "shraflub")
- Your about me text and highlights
- Your skills (add or remove from the skills grid)
- Your projects (add more project cards as needed)
- Your contact information (email, location, LinkedIn)
- Your social media links (update the href attributes with your profiles)

### Styling

The website uses CSS variables for easy color customization. Open `styles.css` and modify the `:root` variables at the top:

```css
:root {
    --bg-color: #13131a;        /* Background color */
    --text-color: #ffffff;       /* Text color */
    --accent-color: #6d28d9;     /* Dark purple accent color */
    --accent-darker: #5b21b6;    /* Even darker purple */
    --card-bg: #1c1c25;          /* Card background color */
}
```

### Sections

The portfolio includes the following sections that you can customize:
1. **Header** - Your profile picture, name and title
2. **About** - Personal information and key highlights
3. **Skills** - Technical abilities organized by category
4. **Projects** - Showcase of your work
5. **Contact** - Ways to reach you
6. **Footer** - Social links and copyright

### Adding Projects

To add more projects, copy the project card HTML structure in `index.html` and customize it:

```html
<div class="project-card">
    <div class="browser-mockup">
        <div class="browser-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="browser-content code-preview"></div>
    </div>
</div>
```

You can replace the `code-preview` class with your own class and add custom styling in the CSS.

### Adding Skills

To add more skills, copy the skill icon HTML structure in `index.html` and customize it:

```html
<div class="skill-icon">
    <div class="icon-container your-skill-class">
        Skill
    </div>
</div>
```

## License

This project is open source and available for personal and commercial use.