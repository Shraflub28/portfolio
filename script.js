// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set current year for copyright
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // MOBILE OPTIMIZATION
    // Device detection for mobile optimization
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Apply mobile optimizations if on a mobile device
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Add mobile optimizations via CSS
        const mobileStyle = document.createElement('style');
        mobileStyle.innerHTML = `
            .mobile-device::after {
                animation: none !important;
                opacity: 0.3 !important;
                background-image: none !important;
            }
            
            .mobile-device::before {
                animation: none !important;
                background-size: 200% 200% !important;
            }
            
            .mobile-device .profile-picture {
                animation: none !important;
            }
            
            .mobile-device .profile-picture::before,
            .mobile-device .profile-picture::after {
                animation: none !important;
            }
            
            .mobile-device section::after {
                animation: none !important;
            }

            /* Completely disable parallax on mobile */
            .mobile-device section,
            .mobile-device .particle {
                transform: none !important;
                transition: none !important;
            }

            /* Simplified animations */
            .mobile-device .name span,
            .mobile-device .username-shimmer {
                transition: none !important;
                animation: none !important;
            }
        `;
        document.head.appendChild(mobileStyle);

        // Disable mousemove event listener on mobile to prevent parallax calculations
        document.removeEventListener('mousemove', handleMouseMove);
    }

    // ---------- EASTER EGGS ----------
    // Only enable easter eggs on desktop
    if (!isMobile) {
        setupEasterEggs();
    }

    // Function to handle mouse movement for parallax (defined here so we can remove it if needed)
    function handleMouseMove(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Move particles slightly based on mouse position
        document.querySelectorAll('.particle').forEach(particle => {
            const speed = parseFloat(particle.getAttribute('data-speed') || 0.02);
            const x = (window.innerWidth * mouseX * speed);
            const y = (window.innerHeight * mouseY * speed);
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Move section backgrounds for subtle parallax
        document.querySelectorAll('section').forEach(section => {
            const speed = 0.02;
            const x = (window.innerWidth * mouseX * speed);
            const y = (window.innerHeight * mouseY * speed);
            section.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
        });
    }

    // Setup easter eggs (only on desktop)
    function setupEasterEggs() {
        // 1. Konami Code Easter Egg
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiCodePosition = 0;

        document.addEventListener('keydown', function(e) {
            // Check if the key matches the expected key in sequence
            if (e.key === konamiCode[konamiCodePosition]) {
                konamiCodePosition++;
                
                // If the full sequence is entered correctly
                if (konamiCodePosition === konamiCode.length) {
                    activateKonamiEasterEgg();
                    konamiCodePosition = 0;
                }
            } else {
                konamiCodePosition = 0;
            }
        });
    }
    
    // Optimized section reveal animation
    function revealSections() {
        // Only use Intersection Observer on desktop or high-end mobile
        if (!isMobile) {
            const sections = document.querySelectorAll('section');
            
            // Create IntersectionObserver with reduced threshold for better performance
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        // Unobserve after animation to save resources
                        sectionObserver.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                threshold: 0.15,
                rootMargin: '0px'
            });
            
            sections.forEach(section => {
                section.classList.add('hidden');
                sectionObserver.observe(section);
            });
        } else {
            // On mobile, just show all sections without animations
            document.querySelectorAll('section').forEach(section => {
                section.classList.add('animate-in');
            });
        }
    }
    
    // Create an optimized scroll indicator
    const createScrollIndicator = () => {
        // Only create on non-mobile devices, it's less useful on mobile and can affect performance
        if (isMobile) return;
        
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        document.body.appendChild(scrollIndicator);
        
        // Throttle scroll event for better performance
        let lastScrollTime = 0;
        window.addEventListener('scroll', () => {
            const now = Date.now();
            if (now - lastScrollTime > 16) { // Limit to approximately 60fps
                lastScrollTime = now;
                const scrollPosition = window.scrollY;
                const totalHeight = document.body.scrollHeight - window.innerHeight;
                const scrolled = (scrollPosition / totalHeight) * 100;
                scrollIndicator.style.width = `${scrolled}%`;
            }
        });
    };
    
    // If not on mobile, add mousemove listener for parallax
    if (!isMobile) {
        document.addEventListener('mousemove', handleMouseMove);
    }

    // Initialize functionality with performance optimizations
    revealSections();
    createScrollIndicator();
    
    // Add a smooth scroll effect for anchor links - simple version for mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // On mobile, just jump to the section
                if (isMobile) {
                    window.scrollTo(0, target.offsetTop);
                } else {
                    // On desktop, use smooth scrolling
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Create optimized typing effect for the name
    function setupNameAnimation() {
        const nameElement = document.querySelector('.name');
        if (!nameElement) return;
        
        if (!isMobile) {
            const originalName = nameElement.textContent;
            nameElement.textContent = '';

            let nameChars = originalName.split('');

            // Add span around each character for individual animations
            nameChars.forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.opacity = '0';
                span.style.display = 'inline-block';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `opacity 0.3s ease, transform 0.5s ease`;
                span.style.transitionDelay = `${index * 0.05}s`;
                nameElement.appendChild(span);

                // Animate in after a short delay
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                }, 500 + (index * 50));
            });
        } else {
            // On mobile, just show the name without animation
            nameElement.style.opacity = '1';
        }
    }

    // Setup name animation
    setupNameAnimation();

    // Add simplified version for mobile
    if (isMobile) {
        // Just show everything immediately
        document.documentElement.classList.add('page-loaded');
        
        // Make sure all elements are visible
        const elements = document.querySelectorAll('.name, .username, .tagline, .profile-picture, .header-skills');
        elements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    // Add a shimmer effect to the username
    const usernameElement = document.querySelector('.username');
    if (usernameElement) {
        // Create a shimmer overlay
        const shimmer = document.createElement('div');
        shimmer.className = 'username-shimmer';
        shimmer.style.position = 'absolute';
        shimmer.style.top = '0';
        shimmer.style.left = '-100%';
        shimmer.style.width = '100%';
        shimmer.style.height = '100%';
        shimmer.style.background = 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)';
        shimmer.style.animation = 'shimmer 3s infinite';
        
        // Make sure the username container is relative positioned
        usernameElement.style.position = 'relative';
        usernameElement.style.overflow = 'hidden';
        
        // Append the shimmer effect
        usernameElement.appendChild(shimmer);
        
        // Add keyframes for shimmer animation to the document
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes shimmer {
                0% {
                    left: -100%;
                }
                50% {
                    left: 100%;
                }
                100% {
                    left: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add a typing animation to the tagline
    const taglineElement = document.querySelector('.tagline');
    if (taglineElement && !isMobile) {
        const taglineText = taglineElement.textContent;
        taglineElement.textContent = '';
        taglineElement.style.borderRight = '2px solid var(--accent-color)';
        
        let tagIndex = 0;
        const taglineTyping = () => {
            if (tagIndex < taglineText.length) {
                taglineElement.textContent += taglineText.charAt(tagIndex);
                tagIndex++;
                setTimeout(taglineTyping, 60);
            } else {
                // Remove the cursor after typing is complete
                setTimeout(() => {
                    taglineElement.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start the tagline typing after the name animation
        setTimeout(taglineTyping, 1500);
    } else if (taglineElement) {
        // On mobile, just show the tagline without animation
        taglineElement.style.opacity = '1';
    }

    // Add an animated gradient to the skills icons on hover
    const skillIcons = document.querySelectorAll('.icon-container');
    skillIcons.forEach(icon => {
        if (!isMobile) {
            icon.addEventListener('mouseenter', () => {
                icon.style.background = 'linear-gradient(45deg, #6d28d9, #5b21b6)';
                icon.style.color = '#ffffff';
                icon.style.transition = 'all 0.3s ease';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.background = 'var(--card-bg)';
                icon.style.color = 'var(--accent-color)';
            });
        }
    });

    // Add staggered animation to project cards
    const projectCards = document.querySelectorAll('.project');
    if (!isMobile) {
        projectCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    // Add dynamic hover effect to contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
    if (!isMobile) {
        contactMethods.forEach(method => {
            method.addEventListener('mouseenter', () => {
                method.style.transform = 'translateY(-10px) scale(1.05)';
                method.style.boxShadow = '0 15px 30px rgba(109, 40, 217, 0.3)';
            });
            method.addEventListener('mouseleave', () => {
                method.style.transform = '';
                method.style.boxShadow = '';
            });
        });
    }

    // Handle video thumbnail interactions
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    videoThumbnails.forEach(thumbnail => {
        // Initially set playhead to random position
        const playhead = thumbnail.querySelector('.playhead');
        if (playhead) {
            playhead.style.width = `${Math.random() * 30}%`;
        }
        
        // Add click event to simulate video play
        thumbnail.addEventListener('click', function(e) {
            const videoItem = this.closest('.video-item');
            const playButton = this.querySelector('.play-button');
            const playhead = this.querySelector('.playhead');
            
            // Toggle playing state
            if (videoItem.classList.contains('playing')) {
                videoItem.classList.remove('playing');
                if (playButton) {
                    playButton.querySelector('i').classList.remove('fa-pause');
                    playButton.querySelector('i').classList.add('fa-play');
                }
                // Pause the playhead animation
                if (playhead) {
                    const currentWidth = getComputedStyle(playhead).width;
                    playhead.style.width = currentWidth;
                    playhead.style.animation = 'none';
                }
            } else {
                // Remove playing state from all videos
                document.querySelectorAll('.video-item').forEach(item => {
                    item.classList.remove('playing');
                    const btn = item.querySelector('.play-button i');
                    if (btn) {
                        btn.classList.remove('fa-pause');
                        btn.classList.add('fa-play');
                    }
                    const head = item.querySelector('.playhead');
                    if (head) {
                        head.style.animation = 'none';
                    }
                });
                
                // Add playing state to current video
                videoItem.classList.add('playing');
                if (playButton) {
                    playButton.querySelector('i').classList.remove('fa-play');
                    playButton.querySelector('i').classList.add('fa-pause');
                }
                // Start playhead animation
                if (playhead) {
                    playhead.style.width = '0%';
                    playhead.style.animation = 'playback 20s linear forwards';
                }
                
                // Simulate video playback by cycling through states
                setTimeout(() => {
                    if (videoItem.classList.contains('playing')) {
                        playButton.querySelector('i').classList.remove('fa-pause');
                        playButton.querySelector('i').classList.add('fa-play');
                        videoItem.classList.remove('playing');
                    }
                }, 20000); // After 20 seconds, reset to initial state
            }
        });
    });
    
    // Add shimmer effect to tool icons on mouseover
    const toolIcons = document.querySelectorAll('.tool-icon');
    if (!isMobile) {
        toolIcons.forEach(icon => {
            icon.addEventListener('mouseover', function() {
                // Add shimmer animation class
                this.classList.add('shimmer');
                
                // Remove class after animation completes
                setTimeout(() => {
                    this.classList.remove('shimmer');
                }, 1000);
            });
        });
    }
    
    // Add interactive effects to skill pills
    const skillPills = document.querySelectorAll('.skill-pill');
    if (!isMobile) {
        skillPills.forEach(pill => {
            // Create glow effect element
            const glow = document.createElement('span');
            glow.className = 'skill-glow';
            glow.style.position = 'absolute';
            glow.style.inset = '0';
            glow.style.borderRadius = '50px';
            glow.style.opacity = '0';
            glow.style.background = 'radial-gradient(circle at center, rgba(109, 40, 217, 0.6) 0%, transparent 70%)';
            glow.style.filter = 'blur(8px)';
            glow.style.transition = 'opacity 0.3s ease';
            glow.style.zIndex = '-1';
            
            // Ensure pill has position relative
            pill.style.position = 'relative';
            pill.style.overflow = 'visible';
            
            // Add glow to pill
            pill.appendChild(glow);
            
            // Show glow on hover
            pill.addEventListener('mouseenter', () => {
                glow.style.opacity = '1';
                
                // Add subtle scale effect
                pill.style.transform = 'translateY(-3px) scale(1.05)';
                pill.style.zIndex = '5';
                
                // Change icon color
                const icon = pill.querySelector('i');
                if (icon) {
                    icon.style.color = '#ffffff';
                }
            });
            
            // Hide glow on mouse leave
            pill.addEventListener('mouseleave', () => {
                glow.style.opacity = '0';
                
                // Remove scale effect
                pill.style.transform = '';
                pill.style.zIndex = '';
                
                // Reset icon color
                const icon = pill.querySelector('i');
                if (icon) {
                    icon.style.color = '';
                }
            });
            
            // Add click effect that makes the pill "pulse"
            pill.addEventListener('click', (e) => {
                // Prevent default behavior if it's a link
                e.preventDefault();
                
                // Create pulse animation
                pill.style.animation = 'pulse 0.5s ease';
                
                // Remove animation after it completes
                setTimeout(() => {
                    pill.style.animation = '';
                }, 500);
            });
        });
    }
}); 