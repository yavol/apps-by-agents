/**
 * Joyful Sunshine News Website
 * JavaScript functionality for enhanced user interaction
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initializeNavigation();
    initializeArticleAnimations();
    initializeThemeToggle();
    initializeSearchFeature();
    initializeNewsletterSignup();
});

/**
 * Navigation enhancement with active state and mobile menu
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const header = document.querySelector('header');
    
    // Add active state to navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Prevent default for demo purposes (since we don't have actual pages)
            e.preventDefault();
            
            // Simulate page change with animation
            simulatePageChange(link.textContent);
        });
    });
    
    // Create mobile menu toggle
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-toggle');
    mobileMenuButton.innerHTML = '☰';
    mobileMenuButton.setAttribute('aria-label', 'Toggle navigation menu');
    
    header.insertBefore(mobileMenuButton, document.querySelector('nav'));
    
    // Mobile menu functionality
    mobileMenuButton.addEventListener('click', () => {
        document.querySelector('nav').classList.toggle('mobile-open');
        mobileMenuButton.textContent = document.querySelector('nav').classList.contains('mobile-open') ? '✕' : '☰';
    });
}

/**
 * Simulate page change with smooth transitions
 */
function simulatePageChange(category) {
    const main = document.querySelector('main');
    
    // Add fade-out effect
    main.classList.add('fade-out');
    
    // After animation completes, update content
    setTimeout(() => {
        // Update page content based on category
        updatePageContent(category);
        
        // Remove fade-out and add fade-in
        main.classList.remove('fade-out');
        main.classList.add('fade-in');
        
        // Remove fade-in class after animation completes
        setTimeout(() => {
            main.classList.remove('fade-in');
        }, 500);
    }, 300);
}

/**
 * Update page content based on selected category
 */
function updatePageContent(category) {
    const main = document.querySelector('main');
    
    // Sample content for different categories
    const categoryContent = {
        'Home': `
            <article>
                <h2>Breaking: Joyful Sunshine Launches News Website</h2>
                <p class="meta">May 2025 | By Staff Reporter</p>
                <p>Welcome to the Joyful Sunshine News website! Stay tuned for the latest updates from around the world, insightful analysis, and inspiring stories.</p>
            </article>
            <section class="news-list">
                <article>
                    <h3>Community Celebrates Local Festival</h3>
                    <p class="meta">May 1, 2025 | Local</p>
                    <p>The annual festival brought together hundreds of residents for a day of fun, food, and music.</p>
                </article>
                <article>
                    <h3>Tech Innovations in 2025</h3>
                    <p class="meta">May 2, 2025 | Tech</p>
                    <p>Discover the latest breakthroughs in technology that are shaping the future.</p>
                </article>
            </section>
        `,
        'World': `
            <article>
                <h2>Global Summit Addresses Climate Change</h2>
                <p class="meta">May 5, 2025 | By International Correspondent</p>
                <p>World leaders gathered in Geneva to discuss urgent measures to combat climate change and set ambitious goals for carbon reduction.</p>
            </article>
            <section class="news-list">
                <article>
                    <h3>New International Space Station Module Launched</h3>
                    <p class="meta">May 4, 2025 | Science</p>
                    <p>The expansion will allow for more scientific experiments and accommodate additional astronauts.</p>
                </article>
                <article>
                    <h3>Cultural Exchange Program Connects Students Worldwide</h3>
                    <p class="meta">May 3, 2025 | Education</p>
                    <p>Students from 50 countries participate in virtual exchange program fostering global understanding.</p>
                </article>
            </section>
        `,
        'Politics': `
            <article>
                <h2>Election Results: What They Mean for Policy Direction</h2>
                <p class="meta">May 6, 2025 | By Political Analyst</p>
                <p>Analysis of recent election outcomes and their potential impact on domestic and foreign policy.</p>
            </article>
            <section class="news-list">
                <article>
                    <h3>New Legislation Aims to Reform Healthcare System</h3>
                    <p class="meta">May 5, 2025 | Healthcare</p>
                    <p>Lawmakers introduce comprehensive bill addressing accessibility and affordability concerns.</p>
                </article>
                <article>
                    <h3>Public Opinion Poll Shows Shifting Priorities</h3>
                    <p class="meta">May 4, 2025 | Analysis</p>
                    <p>Recent survey indicates changing voter concerns with economy and environment topping the list.</p>
                </article>
            </section>
        `,
        'Business': `
            <article>
                <h2>Market Report: Tech Stocks Surge Amid Innovation Wave</h2>
                <p class="meta">May 7, 2025 | By Financial Reporter</p>
                <p>Technology sector experiences significant growth as companies unveil groundbreaking products and services.</p>
            </article>
            <section class="news-list">
                <article>
                    <h3>Startup Secures Record Funding for Sustainable Energy Solution</h3>
                    <p class="meta">May 6, 2025 | Venture Capital</p>
                    <p>Innovative company raises $500 million to scale production of revolutionary energy storage technology.</p>
                </article>
                <article>
                    <h3>Global Supply Chain Improvements Reduce Costs for Consumers</h3>
                    <p class="meta">May 5, 2025 | Retail</p>
                    <p>New logistics technologies and international agreements lead to more efficient product distribution.</p>
                </article>
            </section>
        `,
        'Tech': `
            <article>
                <h2>Breakthrough in Quantum Computing Promises New Era</h2>
                <p class="meta">May 8, 2025 | By Tech Editor</p>
                <p>Scientists achieve stable quantum entanglement at room temperature, potentially revolutionizing computing capabilities.</p>
            </article>
            <section class="news-list">
                <article>
                    <h3>AI Assistant Passes Advanced Medical Licensing Exam</h3>
                    <p class="meta">May 7, 2025 | Artificial Intelligence</p>
                    <p>Machine learning system demonstrates diagnostic capabilities matching top human specialists.</p>
                </article>
                <article>
                    <h3>New Augmented Reality Glasses Transform Everyday Experiences</h3>
                    <p class="meta">May 6, 2025 | Consumer Tech</p>
                    <p>Lightweight AR glasses offer seamless integration of digital information with the physical world.</p>
                </article>
            </section>
        `,
        'Sports': `
            <article>
                <h2>Championship Finals Set After Dramatic Semifinals</h2>
                <p class="meta">May 9, 2025 | By Sports Reporter</p>
                <p>Underdog team makes surprising run to finals after overtime victory against defending champions.</p>
            </article>
            <section class="news-list">
                <article>
                    <h3>Olympic Committee Announces New Events for 2028 Games</h3>
                    <p class="meta">May 8, 2025 | Olympics</p>
                    <p>Three new sports added to Olympic program to attract younger audiences and promote inclusivity.</p>
                </article>
                <article>
                    <h3>Athlete Breaks World Record Using Innovative Training Method</h3>
                    <p class="meta">May 7, 2025 | Athletics</p>
                    <p>Revolutionary approach to training helps runner shatter decades-old record by significant margin.</p>
                </article>
            </section>
        `
    };
    
    // Update content with selected category or default to Home
    main.innerHTML = categoryContent[category] || categoryContent['Home'];
    
    // Re-initialize article animations for new content
    initializeArticleAnimations();
}

/**
 * Add subtle animations to articles
 */
function initializeArticleAnimations() {
    const articles = document.querySelectorAll('article');
    
    articles.forEach(article => {
        // Add hover effect
        article.addEventListener('mouseenter', () => {
            article.classList.add('article-hover');
        });
        
        article.addEventListener('mouseleave', () => {
            article.classList.remove('article-hover');
        });
        
        // Add click interaction
        article.addEventListener('click', () => {
            // Toggle expanded state
            article.classList.toggle('article-expanded');
            
            // If article is now expanded, scroll it into view
            if (article.classList.contains('article-expanded')) {
                article.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
}

/**
 * Add dark/light theme toggle functionality
 */
function initializeThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light theme');
    
    // Add to header
    document.querySelector('header').appendChild(themeToggle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '☀️';
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        // Update button icon
        if (document.body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
}

/**
 * Add search functionality
 */
function initializeSearchFeature() {
    // Create search container
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('search-container');
    
    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search news...';
    searchInput.classList.add('search-input');
    
    // Create search button
    const searchButton = document.createElement('button');
    searchButton.classList.add('search-button');
    searchButton.innerHTML = '🔍';
    searchButton.setAttribute('aria-label', 'Search');
    
    // Add elements to container
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);
    
    // Add search container to header
    document.querySelector('header').appendChild(searchContainer);
    
    // Search functionality
    searchButton.addEventListener('click', () => performSearch(searchInput.value));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

/**
 * Perform search on news content
 */
function performSearch(query) {
    if (!query.trim()) return;
    
    // For demo purposes, show search results
    const main = document.querySelector('main');
    
    // Add fade-out effect
    main.classList.add('fade-out');
    
    // After animation completes, update content
    setTimeout(() => {
        main.innerHTML = `
            <article>
                <h2>Search Results for "${query}"</h2>
                <p class="meta">Showing top matches</p>
            </article>
            <section class="news-list">
                <article>
                    <h3>Article containing "${query}" found in archives</h3>
                    <p class="meta">May 1, 2025 | Search Result</p>
                    <p>This is a simulated search result that would match your query in a real news website.</p>
                </article>
                <article>
                    <h3>Related: Topics similar to "${query}"</h3>
                    <p class="meta">May 2, 2025 | Related Content</p>
                    <p>Here are some topics that might be related to your search query.</p>
                </article>
            </section>
        `;
        
        // Remove fade-out and add fade-in
        main.classList.remove('fade-out');
        main.classList.add('fade-in');
        
        // Remove fade-in class after animation completes
        setTimeout(() => {
            main.classList.remove('fade-in');
        }, 500);
        
        // Re-initialize article animations for new content
        initializeArticleAnimations();
    }, 300);
}

/**
 * Add newsletter signup functionality
 */
function initializeNewsletterSignup() {
    // Create newsletter section
    const newsletterSection = document.createElement('section');
    newsletterSection.classList.add('newsletter-signup');
    newsletterSection.innerHTML = `
        <h3>Subscribe to Our Newsletter</h3>
        <p>Get the latest news delivered directly to your inbox.</p>
        <form id="newsletter-form">
            <input type="email" placeholder="Your email address" required>
            <button type="submit">Subscribe</button>
        </form>
        <p class="newsletter-message"></p>
    `;
    
    // Add to footer
    document.querySelector('footer').appendChild(newsletterSection);
    
    // Handle form submission
    document.getElementById('newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = e.target.querySelector('input[type="email"]');
        const messageElement = document.querySelector('.newsletter-message');
        
        // Simple validation
        if (emailInput.value.includes('@') && emailInput.value.includes('.')) {
            // Success message (in a real app, this would send to a server)
            messageElement.textContent = 'Thank you for subscribing!';
            messageElement.classList.add('success');
            emailInput.value = '';
            
            // Reset message after 3 seconds
            setTimeout(() => {
                messageElement.textContent = '';
                messageElement.classList.remove('success');
            }, 3000);
        } else {
            // Error message
            messageElement.textContent = 'Please enter a valid email address.';
            messageElement.classList.add('error');
            
            // Reset message after 3 seconds
            setTimeout(() => {
                messageElement.textContent = '';
                messageElement.classList.remove('error');
            }, 3000);
        }
    });
}