// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set current year for copyright
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // ---------- EASTER EGGS ----------
    
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

    function activateKonamiEasterEgg() {
        // Create rainbow background effect
        document.body.classList.add('rainbow-mode');
        
        // Add rainbow animation to CSS
        const style = document.createElement('style');
        style.innerHTML = `
            .rainbow-mode::before {
                animation: rainbow-shift 5s linear infinite !important;
                background: linear-gradient(
                    124deg,
                    #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840,
                    #1ddde8, #2b1de8, #dd00f3, #dd00f3
                ) !important;
                background-size: 1800% 1800% !important;
            }
            
            @keyframes rainbow-shift {
                0% { background-position: 0% 80% }
                50% { background-position: 100% 20% }
                100% { background-position: 0% 80% }
            }
        `;
        document.head.appendChild(style);
        
        // Create a notification
        const notification = document.createElement('div');
        notification.textContent = '🌈 Rainbow Mode Activated! 🌈';
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.padding = '10px 20px';
        notification.style.backgroundColor = 'rgba(0,0,0,0.8)';
        notification.style.color = 'white';
        notification.style.borderRadius = '20px';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        notification.style.fontWeight = 'bold';
        
        document.body.appendChild(notification);
        
        // Remove the notification after 3 seconds
        setTimeout(() => {
            notification.style.transition = 'opacity 1s ease';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 1000);
        }, 3000);
        
        // Turn off rainbow mode after 10 seconds
        setTimeout(() => {
            document.body.classList.remove('rainbow-mode');
        }, 10000);
    }
    
    // 2. Hidden Cat Easter Egg - Triple click on profile picture
    const profilePicture = document.querySelector('.profile-picture');
    if (profilePicture) {
        let clickCount = 0;
        let clickTimer = null;
        
        profilePicture.addEventListener('click', () => {
            clickCount++;
            
            // Reset click count after 500ms
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 500);
            
            // If triple clicked
            if (clickCount === 3) {
                createCat();
                clickCount = 0;
            }
        });
    }
    
    function createCat() {
        // Create a cat element
        const cat = document.createElement('div');
        cat.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12,8L10.67,8.09C9.81,7.07 7.4,4.5 5,4.5C5,4.5 3.03,7.46 4.96,11.41C4.41,12.24 4.07,12.67 4,13.66L2.07,13.95L2.28,14.93L4.04,14.67L4.18,15.38L2.61,16.32L3.08,17.21L4.53,16.32C5.68,18.76 8.59,20 12,20C15.41,20 18.32,18.76 19.47,16.32L20.92,17.21L21.39,16.32L19.82,15.38L19.96,14.67L21.72,14.93L21.93,13.95L20,13.66C19.93,12.67 19.59,12.24 19.04,11.41C20.97,7.46 19,4.5 19,4.5C16.6,4.5 14.19,7.07 13.33,8.09L12,8Z" fill="var(--accent-color)"/>
                <path d="M9,11.75A1.25,1.25 0 0,0 7.75,13A1.25,1.25 0 0,0 9,14.25A1.25,1.25 0 0,0 10.25,13A1.25,1.25 0 0,0 9,11.75M15,11.75A1.25,1.25 0 0,0 13.75,13A1.25,1.25 0 0,0 15,14.25A1.25,1.25 0 0,0 16.25,13A1.25,1.25 0 0,0 15,11.75Z" fill="white"/>
            </svg>
        `;
        cat.style.position = 'fixed';
        cat.style.zIndex = '1000';
        cat.style.bottom = '5px';
        cat.style.left = '-80px';
        cat.style.transition = 'left 10s linear';
        cat.style.filter = 'drop-shadow(0 0 8px rgba(109, 40, 217, 0.7))';
        cat.style.cursor = 'pointer';
        document.body.appendChild(cat);
        
        // Add meow sound
        const meow = new Audio('https://freesound.org/data/previews/415/415209_5121236-lq.mp3');
        
        // Animate the cat walking across the screen
        setTimeout(() => {
            cat.style.left = 'calc(100% + 80px)';
            meow.play().catch(e => console.log('Audio could not be played:', e));
        }, 100);
        
        cat.addEventListener('click', () => {
            meow.play().catch(e => console.log('Audio could not be played:', e));
            cat.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                cat.style.transform = 'translateY(0)';
            }, 300);
        });
        
        // Remove the cat after animation completes
        setTimeout(() => {
            cat.remove();
        }, 10500);
    }
    
    // 3. Secret dark/cyberpunk mode toggle - Double click on footer
    const footer = document.querySelector('footer');
    if (footer) {
        footer.addEventListener('dblclick', toggleCyberpunkMode);
    }
    
    function toggleCyberpunkMode() {
        document.body.classList.toggle('cyberpunk-extreme');
        
        if (!document.querySelector('.cyberpunk-style')) {
            const cyberpunkStyle = document.createElement('style');
            cyberpunkStyle.className = 'cyberpunk-style';
            cyberpunkStyle.innerHTML = `
                .cyberpunk-extreme::after {
                    opacity: 1 !important;
                    background-image: 
                        radial-gradient(circle at 15% 15%, rgba(255, 0, 84, 0.25) 0%, transparent 25%),
                        radial-gradient(circle at 85% 85%, rgba(0, 255, 220, 0.25) 0%, transparent 25%),
                        linear-gradient(to right, rgba(255, 0, 84, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 255, 220, 0.1) 1px, transparent 1px) !important;
                }
                
                .cyberpunk-extreme .project, 
                .cyberpunk-extreme section, 
                .cyberpunk-extreme .video-item {
                    border: 1px solid rgba(255, 0, 84, 0.3) !important;
                    box-shadow: 0 5px 15px rgba(255, 0, 84, 0.2), 0 0 0 1px rgba(0, 255, 220, 0.1) inset !important;
                }
                
                .cyberpunk-extreme .project:hover, 
                .cyberpunk-extreme section:hover, 
                .cyberpunk-extreme .video-item:hover {
                    box-shadow: 0 15px 25px rgba(255, 0, 84, 0.3), 0 0 0 2px rgba(0, 255, 220, 0.2) inset !important;
                }
                
                .cyberpunk-extreme h1, 
                .cyberpunk-extreme h2, 
                .cyberpunk-extreme h3 {
                    text-shadow: 3px 3px 0 rgba(255, 0, 84, 0.3) !important;
                }
            `;
            document.head.appendChild(cyberpunkStyle);
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.textContent = document.body.classList.contains('cyberpunk-extreme') ? 
            '🤖 Cyberpunk Mode Activated! 🤖' : 
            '🌙 Cyberpunk Mode Deactivated';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '10px 20px';
        notification.style.backgroundColor = document.body.classList.contains('cyberpunk-extreme') ? 
            'rgba(255, 0, 84, 0.8)' : 
            'rgba(0, 0, 0, 0.8)';
        notification.style.color = 'white';
        notification.style.borderRadius = '20px';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
        notification.style.fontWeight = 'bold';
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.transition = 'opacity 1s ease';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 1000);
        }, 3000);
    }
    
    // 4. Matrix code easter egg - Click the username 5 times
    const username = document.querySelector('.username');
    if (username) {
        let usernameClickCount = 0;
        let usernameClickTimer = null;
        
        username.addEventListener('click', () => {
            usernameClickCount++;
            
            // Reset click count after 2 seconds
            clearTimeout(usernameClickTimer);
            usernameClickTimer = setTimeout(() => {
                usernameClickCount = 0;
            }, 2000);
            
            // If clicked 5 times
            if (usernameClickCount === 5) {
                createMatrixEffect();
                usernameClickCount = 0;
            }
        });
    }
    
    function createMatrixEffect() {
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '9999';
        canvas.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        canvas.style.transition = 'opacity 2s ease';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Matrix characters
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'.split('');
        
        // Matrix columns
        const columns = canvas.width / 20;
        const drops = [];
        
        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        // Draw the matrix
        function drawMatrix() {
            // Semi-transparent black background to show trail
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Green text
            ctx.fillStyle = '#0f0';
            ctx.font = '15px monospace';
            
            // Draw characters
            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = chars[Math.floor(Math.random() * chars.length)];
                
                // Draw character
                ctx.fillText(char, i * 20, drops[i] * 20);
                
                // Move drop
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        // Start animation
        const matrixInterval = setInterval(drawMatrix, 50);
        
        // End the matrix effect after 10 seconds
        setTimeout(() => {
            clearInterval(matrixInterval);
            canvas.style.opacity = '0';
            setTimeout(() => {
                canvas.remove();
            }, 2000);
        }, 10000);
    }
    
    // 5. Disco mode - Press 'D' key three times quickly
    let dKeyCount = 0;
    let dKeyTimer = null;
    
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'd') {
            dKeyCount++;
            
            // Reset key count after 1 second
            clearTimeout(dKeyTimer);
            dKeyTimer = setTimeout(() => {
                dKeyCount = 0;
            }, 1000);
            
            // If pressed 3 times quickly
            if (dKeyCount === 3) {
                activateDiscoMode();
                dKeyCount = 0;
            }
        }
    });
    
    function activateDiscoMode() {
        // Create disco ball
        const discoBall = document.createElement('div');
        discoBall.innerHTML = `
            <div class="disco-ball">
                <div class="disco-ball-inner"></div>
            </div>
        `;
        discoBall.style.position = 'fixed';
        discoBall.style.top = '-50px';
        discoBall.style.left = '50%';
        discoBall.style.transform = 'translateX(-50%)';
        discoBall.style.zIndex = '1000';
        document.body.appendChild(discoBall);
        
        // Add disco styles
        const discoStyle = document.createElement('style');
        discoStyle.innerHTML = `
            .disco-ball {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: repeating-conic-gradient(
                    from 0deg,
                    silver 0deg 10deg,
                    #ccc 10deg 20deg
                );
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
                position: relative;
                animation: rotate 5s linear infinite, bob 2s ease-in-out infinite;
            }
            
            .disco-ball-inner {
                position: absolute;
                top: 5px;
                left: 5px;
                right: 5px;
                bottom: 5px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, white, #ccc);
            }
            
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            @keyframes bob {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(10px); }
            }
            
            .disco-mode section, 
            .disco-mode .profile-picture,
            .disco-mode .project,
            .disco-mode .video-item {
                animation: disco-colors 2s infinite !important;
            }
            
            @keyframes disco-colors {
                0% { filter: hue-rotate(0deg); }
                25% { filter: hue-rotate(90deg); }
                50% { filter: hue-rotate(180deg); }
                75% { filter: hue-rotate(270deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(discoStyle);
        
        // Add disco mode class to body
        document.body.classList.add('disco-mode');
        
        // Create disco lights
        for (let i = 0; i < 5; i++) {
            const light = document.createElement('div');
            light.style.position = 'fixed';
            light.style.width = '100px';
            light.style.height = '100px';
            light.style.borderRadius = '50%';
            light.style.filter = 'blur(30px)';
            light.style.opacity = '0.7';
            light.style.zIndex = '999';
            light.style.top = Math.random() * 100 + '%';
            light.style.left = Math.random() * 100 + '%';
            light.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            light.style.animation = `disco-move ${5 + Math.random() * 5}s infinite ease-in-out`;
            document.body.appendChild(light);
            
            // Add animation
            const lightAnim = document.createElement('style');
            lightAnim.innerHTML = `
                @keyframes disco-move {
                    0%, 100% { 
                        transform: translate(0, 0);
                        background-color: hsl(${Math.random() * 360}, 100%, 50%);
                    }
                    25% { 
                        transform: translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px);
                        background-color: hsl(${Math.random() * 360}, 100%, 50%);
                    }
                    50% { 
                        transform: translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px);
                        background-color: hsl(${Math.random() * 360}, 100%, 50%);
                    }
                    75% { 
                        transform: translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px);
                        background-color: hsl(${Math.random() * 360}, 100%, 50%);
                    }
                }
            `;
            document.head.appendChild(lightAnim);
        }
        
        // End disco mode after 15 seconds
        setTimeout(() => {
            document.body.classList.remove('disco-mode');
            discoBall.remove();
            // Remove all disco lights
            document.querySelectorAll('div[style*="disco-move"]').forEach(el => el.remove());
        }, 15000);
    }
    
    // ---------- END EASTER EGGS ----------

    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    // Create floating particles
    const numParticles = 30;
    for (let i = 0; i < numParticles; i++) {
        createParticle(particlesContainer);
    }

    // Add parallax effect
    document.addEventListener('mousemove', (e) => {
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
    });

    // Add a smooth scroll effect for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add scroll reveal animation for sections
    const revealSections = () => {
        const sections = document.querySelectorAll('section');
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionVisible = 150;
            
            if (sectionTop < windowHeight - sectionVisible) {
                section.classList.add('animate-in');
            }
        });
    };
    
    // Initialize sections with the hidden class
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Check for sections in view on load and scroll
    window.addEventListener('scroll', revealSections);
    revealSections(); // Run once on page load

    // Add a more elegant typing effect to the name
    const nameElement = document.querySelector('.name');
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
    if (taglineElement) {
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
    }

    // Add an animated gradient to the skills icons on hover
    const skillIcons = document.querySelectorAll('.icon-container');
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.background = 'linear-gradient(45deg, #6d28d9, #5b21b6)';
            icon.style.color = '#ffffff';
            icon.style.transition = 'all 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.background = 'var(--card-bg)';
            icon.style.color = 'var(--accent-color)';
        });
    });

    // Add staggered animation to project cards
    const projectCards = document.querySelectorAll('.project');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add dynamic hover effect to contact methods
    const contactMethods = document.querySelectorAll('.contact-method');
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

    // Add scroll position indicator
    const createScrollIndicator = () => {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        document.body.appendChild(indicator);
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            indicator.style.width = `${scrollPercent}%`;
        });
    };
    createScrollIndicator();

    // Update active navigation link based on scroll position
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 300)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    };

    // Add scroll event listener for navigation highlighting
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('load', updateActiveNavLink);
    
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
    
    // Add interactive effects to skill pills
    const skillPills = document.querySelectorAll('.skill-pill');
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
});

// Function to create a particle element
function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 3px and 8px
    const size = Math.floor(Math.random() * 6) + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random starting position
    const xPos = Math.random() * 100;
    const yPos = Math.random() * 100 + 100; // Start below the viewport
    particle.style.left = `${xPos}vw`;
    particle.style.top = `${yPos}vh`;
    
    // Random animation duration between 15 and 40 seconds
    const duration = Math.floor(Math.random() * 25) + 15;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay so all particles don't move at once
    const delay = Math.random() * 10;
    particle.style.animationDelay = `${delay}s`;
    
    // Random speed for parallax effect
    const speed = (Math.random() * 0.03) + 0.01;
    particle.setAttribute('data-speed', speed.toString());
    
    container.appendChild(particle);
    
    // Remove and re-create particle when animation ends
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, (duration + delay) * 1000);
} 