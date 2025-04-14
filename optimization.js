// Performance Optimization Script

// Function to detect if the device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth < 768;
}

// Function to defer non-critical operations
function deferNonCriticalOperations() {
    // Detect if we're on a mobile device
    const isMobile = isMobileDevice();
    
    // Once the page is fully loaded
    window.addEventListener('load', () => {
        // Add a small delay to let the critical operations complete
        setTimeout(() => {
            // Load heavy animations only on desktop
            if (!isMobile) {
                // Enable particle animations
                enableParticles();
                
                // Enable advanced background effects
                document.body.classList.add('enable-advanced-effects');
            }
            
            // Use Intersection Observer for lazy loading
            setupLazyLoading();
        }, isMobile ? 1000 : 300);
    });
}

// Function to enable particle animations
function enableParticles() {
    // Create particles container if it doesn't exist
    if (!document.querySelector('.particles-container')) {
        const container = document.createElement('div');
        container.className = 'particles-container';
        document.body.appendChild(container);
        
        // Create a reduced number of particles
        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                createOptimizedParticle(container);
            }, i * 300);
        }
    }
}

// Function to create optimized particles
function createOptimizedParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Simplified and optimized particle styling
    const size = Math.random() * 5 + 1;
    const posX = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 15; // Longer animation for less frequent reflows
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.bottom = `-${size}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        particle.remove();
        createOptimizedParticle(container);
    }, (duration + delay) * 1000);
}

// Setup lazy loading with Intersection Observer
function setupLazyLoading() {
    // Setup lazy loading for sections
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Unobserve after animation to improve performance
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.15
    });
    
    sections.forEach(section => {
        section.classList.add('hidden');
        sectionObserver.observe(section);
    });
}

// Optimize scroll events with throttling
function optimizeScrollEvents() {
    let lastScrollTime = 0;
    const scrollThreshold = isMobileDevice() ? 100 : 16; // Less frequent updates on mobile
    
    // Function to update scroll-based elements
    function updateOnScroll() {
        const now = Date.now();
        if (now - lastScrollTime > scrollThreshold) {
            lastScrollTime = now;
            
            // Update scroll indicator if it exists
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) {
                const scrollPosition = window.scrollY;
                const totalHeight = document.body.scrollHeight - window.innerHeight;
                const scrolled = (scrollPosition / totalHeight) * 100;
                scrollIndicator.style.width = `${scrolled}%`;
            }
            
            // Update active navigation link
            updateActiveNavLink();
        }
    }
    
    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY;
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkSection = link.getAttribute('data-section');
            if (linkSection === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll event listener with requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Initialize optimizations
deferNonCriticalOperations();
optimizeScrollEvents();

// Add a class to the document when it's fully loaded
window.addEventListener('load', () => {
    document.documentElement.classList.add('page-loaded');
}); 