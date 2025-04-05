// Initialize AOS animation library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show button when user scrolls down 300px
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('text-red-600');
                    if (navLink.getAttribute('href') === '#' + sectionId) {
                        navLink.classList.add('text-red-600');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);

    // Animated typing effect for hero section
    const heroTitle = document.querySelector('.text-gradient');
    
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typingSpeed = 100; // milliseconds
        
        function typeText() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeText, typingSpeed);
            }
        }
        
        // Wait for a second before starting the typing animation
        setTimeout(typeText, 1000);
    }

    // Privacy Policy Scanner Visualization
    const privacyDocument = document.querySelector('.privacy-document');
    const securityVisualizer = document.getElementById('security-visualizer');
    
    // Function to simulate scanning of privacy policy text
    function simulatePolicyScanning() {
        if (!privacyDocument || !document.body.contains(privacyDocument)) return;
        
        const documentLines = document.querySelectorAll('.document-line');
        if (!documentLines.length) return;
        
        let currentLineIndex = 0;
        
        // Scan one line at a time
        const scanInterval = setInterval(() => {
            // Remove scanning class from all lines
            documentLines.forEach(line => line.classList.remove('scanning'));
            
            // Add scanning class to current line
            if (currentLineIndex < documentLines.length) {
                documentLines[currentLineIndex].classList.add('scanning');
                currentLineIndex++;
            } else {
                // When scanning is complete, highlight risk items
                clearInterval(scanInterval);
                highlightRiskyKeywords();
            }
        }, 500);
    }
    
    // Function to highlight risky keywords
    function highlightRiskyKeywords() {
        const riskKeywords = document.querySelectorAll('.keyword-risk');
        
        riskKeywords.forEach((keyword, index) => {
            // Initially hide all risk keywords
            keyword.style.opacity = '0';
            
            // Animate keywords appearing sequentially with pop effect
            setTimeout(() => {
                keyword.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                keyword.style.opacity = '1';
                keyword.style.transform = 'scale(1)';
                
                // Set custom delay for the exclamation mark animation
                keyword.style.setProperty('--delay', `${0.3 + (index * 0.15)}s`);
                
            }, 500 + (index * 300));
        });
        
        // Show AI summary after risk highlighting
        setTimeout(showAISummary, 500 + (riskKeywords.length * 300));
    }
    
    // Function to show AI summary
    function showAISummary() {
        const aiSummary = document.querySelector('.ai-summary');
        if (!aiSummary) return;
        
        aiSummary.style.opacity = '0';
        aiSummary.style.transform = 'translateY(20px)';
        aiSummary.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            aiSummary.style.opacity = '1';
            aiSummary.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Start the privacy policy scanning visualization when in viewport
    if (securityVisualizer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start the scanning visualization
                    setTimeout(simulatePolicyScanning, 500);
                    
                    // Start animating the numbers
                    animateNumbers();
                    
                    // Only trigger once
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(securityVisualizer);
    }
    
    // Animate numbers/statistics
    function animateNumbers() {
        const numberElements = document.querySelectorAll('.animate-number');
        
        numberElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // Update every 16ms (60fps)
            
            let current = 0;
            
            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    el.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateNumber);
                } else {
                    el.textContent = target.toLocaleString();
                }
            };
            
            updateNumber();
        });
    }

    // Handle testimonial carousel/slider if needed
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    
    if (testimonialSlider && testimonialSlides.length > 3) {
        let currentSlide = 0;
        
        // Initially hide all slides except first three
        testimonialSlides.forEach((slide, index) => {
            if (index >= 3) {
                slide.style.display = 'none';
            }
        });
        
        // Create navigation buttons
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.classList.add('testimonial-nav', 'prev');
        
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.classList.add('testimonial-nav', 'next');
        
        testimonialSlider.parentNode.appendChild(prevButton);
        testimonialSlider.parentNode.appendChild(nextButton);
        
        // Navigation functionality
        nextButton.addEventListener('click', () => {
            if (currentSlide < testimonialSlides.length - 3) {
                testimonialSlides[currentSlide].style.display = 'none';
                testimonialSlides[currentSlide + 3].style.display = 'block';
                currentSlide++;
            }
        });
        
        prevButton.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                testimonialSlides[currentSlide].style.display = 'block';
                testimonialSlides[currentSlide + 3].style.display = 'none';
            }
        });
    }
    
    // Technical Demonstrations Code Tabs
    const codeTabs = document.querySelectorAll('.code-tab');
    const codeContents = document.querySelectorAll('.code-content');
    
    // Handle code tab switching
    if (codeTabs.length) {
        codeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                codeTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Hide all code content
                codeContents.forEach(content => content.classList.remove('active'));
                
                // Show corresponding content
                const tabId = tab.getAttribute('data-tab');
                const activeContent = document.getElementById(`${tabId}-code`);
                if (activeContent) {
                    activeContent.classList.add('active');
                    
                    // Highlight code animation
                    const highlightElements = activeContent.querySelectorAll('.highlight-code');
                    highlightElements.forEach(el => {
                        // Reset animation
                        el.style.animation = 'none';
                        // Trigger reflow
                        void el.offsetWidth;
                        // Re-add animation
                        el.style.animation = 'codePulse 3s infinite';
                    });
                }
            });
        });
        
        // Type animation for code
        animateTypeCode();
    }
    
    // Function to animate typing effect in code
    function animateTypeCode() {
        const highlightCode = document.querySelectorAll('.highlight-code');
        
        highlightCode.forEach(codeBlock => {
            const originalContent = codeBlock.innerHTML;
            const textContent = codeBlock.textContent;
            
            // Only animate the first visible code block initially
            if (!codeBlock.closest('.code-content').classList.contains('active')) {
                return;
            }
            
            codeBlock.textContent = '';
            let i = 0;
            const typingSpeed = 20; // milliseconds
            
            function typeCode() {
                if (i < textContent.length) {
                    codeBlock.textContent += textContent.charAt(i);
                    i++;
                    setTimeout(typeCode, typingSpeed);
                } else {
                    // Restore original HTML with formatting
                    codeBlock.innerHTML = originalContent;
                }
            }
            
            setTimeout(typeCode, 1000);
        });
    }
    
    // X-ray view of trackers
    const xrayToggle = document.getElementById('xray-toggle');
    const xrayWebsite = document.querySelector('.xray-website');
    const xrayTrackers = document.querySelectorAll('.xray-tracker');
    const xrayProtection = document.querySelector('.xray-protection');
    
    if (xrayToggle && xrayWebsite) {
        xrayToggle.addEventListener('change', () => {
            if (xrayToggle.checked) {
                // X-ray mode on
                xrayWebsite.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                xrayWebsite.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%2364ffda\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")';
                xrayWebsite.querySelector('.xray-website-content').style.opacity = '0.3';
                
                // Show trackers with delay
                xrayTrackers.forEach((tracker, index) => {
                    setTimeout(() => {
                        tracker.classList.add('visible');
                    }, 300 + (index * 200));
                });
                
                // Show protection badge
                setTimeout(() => {
                    xrayProtection.classList.add('visible');
                }, 300 + (xrayTrackers.length * 200));
            } else {
                // X-ray mode off
                xrayWebsite.style.backgroundColor = '';
                xrayWebsite.style.backgroundImage = '';
                xrayWebsite.querySelector('.xray-website-content').style.opacity = '1';
                
                // Hide trackers
                xrayTrackers.forEach(tracker => {
                    tracker.classList.remove('visible');
                });
                
                // Hide protection badge
                xrayProtection.classList.remove('visible');
            }
        });
    }
    
    // 3D Browser Rotation & Popup
    const browser3d = document.querySelector('.browser-3d');
    const rotateLeft = document.getElementById('rotate-left');
    const rotateRight = document.getElementById('rotate-right');
    const rotateReset = document.getElementById('rotate-reset');
    const showPopup = document.getElementById('show-popup');
    const extensionPopup = document.querySelector('.browser-extension-popup');
    
    if (browser3d) {
        let rotationY = 0;
        
        // 3D transform function
        function updateRotation() {
            browser3d.style.transform = `rotateY(${rotationY}deg)`;
        }
        
        if (rotateLeft) {
            rotateLeft.addEventListener('click', () => {
                rotationY -= 15;
                if (rotationY < -30) rotationY = -30; // Limit rotation
                updateRotation();
            });
        }
        
        if (rotateRight) {
            rotateRight.addEventListener('click', () => {
                rotationY += 15;
                if (rotationY > 30) rotationY = 30; // Limit rotation
                updateRotation();
            });
        }
        
        if (rotateReset) {
            rotateReset.addEventListener('click', () => {
                rotationY = 0;
                updateRotation();
                
                // Hide popup when resetting
                if (extensionPopup) {
                    extensionPopup.classList.remove('visible');
                }
            });
        }
        
        if (showPopup && extensionPopup) {
            showPopup.addEventListener('click', () => {
                // Toggle popup
                extensionPopup.classList.toggle('visible');
                
                // Center browser when showing popup
                if (extensionPopup.classList.contains('visible')) {
                    rotationY = 0;
                    updateRotation();
                }
                
                // Animate risk meter
                if (extensionPopup.classList.contains('visible')) {
                    const riskMeterFill = extensionPopup.querySelector('.risk-meter-fill');
                    if (riskMeterFill) {
                        riskMeterFill.style.animation = 'none';
                        void riskMeterFill.offsetWidth;
                        riskMeterFill.style.animation = 'fillBar 1.5s ease-out';
                    }
                }
            });
        }
        
        // Initialize 3D Browser section when it comes into view
        const techDemos = document.getElementById('tech-demos');
        if (techDemos) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Trigger initial animation for 3D browser
                        setTimeout(() => {
                            rotationY = -20;
                            updateRotation();
                            
                            setTimeout(() => {
                                rotationY = 20;
                                updateRotation();
                                
                                setTimeout(() => {
                                    rotationY = 0;
                                    updateRotation();
                                }, 800);
                            }, 800);
                        }, 500);
                        
                        // Only trigger once
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(techDemos);
        }
    }
    
    // Privacy News Feed
    const newsCards = document.querySelectorAll('.news-card');
    const newsArticleOverlay = document.getElementById('news-article-overlay');
    const articleCloseBtn = document.getElementById('article-close');
    const newsGrid = document.getElementById('news-grid');
    
    // Set a delay for each card to create staggered appearance
    if (newsCards.length) {
        newsCards.forEach((card, index) => {
            card.style.setProperty('--delay', index);
        });
        
        // Card click handler
        newsCards.forEach(card => {
            card.addEventListener('click', event => {
                const newsId = card.getAttribute('data-id');
                
                // Get card position for duplication effect
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                
                // Create card duplicates for explosion effect
                createNewsCardDuplicates(card, cardCenterX, cardCenterY);
                
                // Show news article overlay after delay
                setTimeout(() => {
                    // Show overlay
                    newsArticleOverlay.style.display = 'block';
                    setTimeout(() => {
                        newsArticleOverlay.classList.add('active');
                    }, 10);
                    
                    // Show relevant article content
                    document.querySelectorAll('.article-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    
                    const targetContent = document.querySelector(`.article-content[data-id="${newsId}"]`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                    
                    // Prevent body scrolling
                    document.body.style.overflow = 'hidden';
                }, 600); // Wait for card explosion animation
            });
        });
        
        // Close button handler for article overlay
        if (articleCloseBtn) {
            articleCloseBtn.addEventListener('click', () => {
                // Hide overlay with fade effect
                newsArticleOverlay.classList.remove('active');
                
                setTimeout(() => {
                    newsArticleOverlay.style.display = 'none';
                    
                    // Re-enable body scrolling
                    document.body.style.overflow = '';
                    
                    // Clean up any duplicate cards
                    document.querySelectorAll('.news-duplicate').forEach(dupe => {
                        dupe.remove();
                    });
                }, 400);
            });
        }
        
        // Initialize News Grid with animation when it comes into view
        if (newsGrid) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate cards appearing with delay
                        newsCards.forEach((card, index) => {
                            card.style.setProperty('--delay', index);
                        });
                        
                        // Only trigger once
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(newsGrid);
        }
    }
    
    // Create news card duplicates for explosion effect
    function createNewsCardDuplicates(originalCard, centerX, centerY) {
        const numDuplicates = 15; // Number of card duplicates to create
        const cardContent = originalCard.innerHTML;
        const cardRect = originalCard.getBoundingClientRect();
        
        // Create container for duplicates if doesn't exist
        let duplicateContainer = document.getElementById('news-duplicate-container');
        if (!duplicateContainer) {
            duplicateContainer = document.createElement('div');
            duplicateContainer.id = 'news-duplicate-container';
            duplicateContainer.style.position = 'fixed';
            duplicateContainer.style.top = '0';
            duplicateContainer.style.left = '0';
            duplicateContainer.style.width = '100%';
            duplicateContainer.style.height = '100%';
            duplicateContainer.style.pointerEvents = 'none';
            duplicateContainer.style.zIndex = '999';
            duplicateContainer.style.overflow = 'hidden';
            document.body.appendChild(duplicateContainer);
        }
        
        // Clear existing duplicates
        duplicateContainer.innerHTML = '';
        
        // Create the initial full-sized duplicate for zoom effect
        const mainDuplicate = document.createElement('div');
        mainDuplicate.className = 'news-duplicate main-duplicate';
        mainDuplicate.innerHTML = cardContent;
        mainDuplicate.style.position = 'fixed';
        mainDuplicate.style.top = `${cardRect.top}px`;
        mainDuplicate.style.left = `${cardRect.left}px`;
        mainDuplicate.style.width = `${cardRect.width}px`;
        mainDuplicate.style.height = `${cardRect.height}px`;
        duplicateContainer.appendChild(mainDuplicate);
        
        // Animate main duplicate to zoom and fade
        setTimeout(() => {
            mainDuplicate.classList.add('active');
            mainDuplicate.style.transform = 'scale(1.2)';
            
            setTimeout(() => {
                mainDuplicate.style.opacity = '0';
            }, 300);
        }, 10);
        
        // Create smaller duplicate cards that explode outward
        for (let i = 0; i < numDuplicates; i++) {
            const duplicate = document.createElement('div');
            duplicate.className = 'news-duplicate';
            duplicate.innerHTML = cardContent;
            
            // Make duplicates smaller
            const scale = 0.3 + Math.random() * 0.3; // Random scale between 0.3 and 0.6
            
            // Position at center of original card
            duplicate.style.position = 'fixed';
            duplicate.style.top = `${cardRect.top}px`;
            duplicate.style.left = `${cardRect.left}px`;
            duplicate.style.width = `${cardRect.width}px`;
            duplicate.style.height = `${cardRect.height}px`;
            duplicate.style.transform = `scale(${scale})`;
            
            duplicateContainer.appendChild(duplicate);
            
            // Add active class for opacity
            setTimeout(() => {
                duplicate.classList.add('active');
                
                // Calculate random destination position
                const angle = (i / numDuplicates) * Math.PI * 2; // Distribute in a circle
                const distance = 100 + Math.random() * 600; // Random distance
                const destX = Math.cos(angle) * distance;
                const destY = Math.sin(angle) * distance;
                
                // Random rotation
                const rotation = -90 + Math.random() * 180;
                
                // Apply explosion animation
                duplicate.style.transform = `translate(${destX}px, ${destY}px) rotate(${rotation}deg) scale(${scale})`;
                duplicate.style.opacity = '0';
                
                // Clean up after animation
                setTimeout(() => {
                    duplicate.remove();
                }, 1000);
            }, 10 + i * 40); // Staggered start for better effect
        }
    }
    
    // Breach Cascade Feature
    const breachCards = document.querySelectorAll('.breach-card');
    const breachOverlay = document.getElementById('breach-cascade-overlay');
    const cascadeClose = document.getElementById('cascade-close');
    const breachUniverse = document.getElementById('breach-universe');
    
    if (breachCards.length && breachOverlay) {
        // Card click handler
        breachCards.forEach(card => {
            card.addEventListener('click', event => {
                const breachId = card.getAttribute('data-id');
                
                // Get card position for explosion effect
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                
                // Create duplicates for explosion effect
                createCardDuplicates(card, cardCenterX, cardCenterY);
                
                // Show cascade overlay after delay
                setTimeout(() => {
                    // Show overlay
                    breachOverlay.style.display = 'block';
                    setTimeout(() => {
                        breachOverlay.classList.add('active');
                    }, 10);
                    
                    // Show relevant breach content
                    document.querySelectorAll('.cascade-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    
                    const targetContent = document.querySelector(`.cascade-content[data-id="${breachId}"]`);
                    if (targetContent) {
                        targetContent.classList.add('active');
                        targetContent.classList.add('cascade-in-view');
                    }
                    
                    // Prevent body scrolling
                    document.body.style.overflow = 'hidden';
                }, 700); // Wait for card explosion animation
            });
        });
        
        // Close button handler
        if (cascadeClose) {
            cascadeClose.addEventListener('click', () => {
                // Hide overlay with fade effect
                breachOverlay.classList.remove('active');
                setTimeout(() => {
                    breachOverlay.style.display = 'none';
                    
                    // Re-enable body scrolling
                    document.body.style.overflow = '';
                    
                    // Clean up any duplicate cards
                    document.querySelectorAll('.card-duplicate').forEach(dupe => {
                        dupe.remove();
                    });
                }, 500);
            });
        }
        
        // Create card duplicates for explosion effect
        function createCardDuplicates(originalCard, centerX, centerY) {
            const numDuplicates = 12; // Number of card duplicates to create
            const cardContent = originalCard.innerHTML;
            const cardRect = originalCard.getBoundingClientRect();
            
            // Create container for duplicates if doesn't exist
            let duplicateContainer = document.getElementById('duplicate-container');
            if (!duplicateContainer) {
                duplicateContainer = document.createElement('div');
                duplicateContainer.id = 'duplicate-container';
                duplicateContainer.style.position = 'fixed';
                duplicateContainer.style.top = '0';
                duplicateContainer.style.left = '0';
                duplicateContainer.style.width = '100%';
                duplicateContainer.style.height = '100%';
                duplicateContainer.style.pointerEvents = 'none';
                duplicateContainer.style.zIndex = '999';
                duplicateContainer.style.overflow = 'hidden';
                document.body.appendChild(duplicateContainer);
            }
            
            // Clear existing duplicates
            duplicateContainer.innerHTML = '';
            
            // Create the initial full-sized duplicate for zoom effect
            const mainDuplicate = document.createElement('div');
            mainDuplicate.className = 'card-duplicate main-duplicate';
            mainDuplicate.innerHTML = cardContent;
            mainDuplicate.style.position = 'fixed';
            mainDuplicate.style.top = `${cardRect.top}px`;
            mainDuplicate.style.left = `${cardRect.left}px`;
            mainDuplicate.style.width = `${cardRect.width}px`;
            mainDuplicate.style.height = `${cardRect.height}px`;
            duplicateContainer.appendChild(mainDuplicate);
            
            // Animate main duplicate to zoom and fade
            setTimeout(() => {
                mainDuplicate.style.opacity = '1';
                mainDuplicate.style.transform = 'scale(1.2)';
                
                setTimeout(() => {
                    mainDuplicate.style.opacity = '0';
                }, 300);
            }, 10);
            
            // Create smaller duplicate cards that explode outward
            for (let i = 0; i < numDuplicates; i++) {
                const duplicate = document.createElement('div');
                duplicate.className = 'card-duplicate';
                duplicate.innerHTML = cardContent;
                
                // Make duplicates smaller
                const scale = 0.3 + Math.random() * 0.3; // Random scale between 0.3 and 0.6
                
                // Position at center of original card
                duplicate.style.top = `${cardRect.top}px`;
                duplicate.style.left = `${cardRect.left}px`;
                duplicate.style.width = `${cardRect.width}px`;
                duplicate.style.height = `${cardRect.height}px`;
                duplicate.style.transform = `scale(${scale})`;
                
                duplicateContainer.appendChild(duplicate);
                
                // Add active class for opacity
                setTimeout(() => {
                    duplicate.classList.add('active');
                    
                    // Calculate random destination position
                    const angle = (i / numDuplicates) * Math.PI * 2; // Distribute in a circle
                    const distance = 100 + Math.random() * 500; // Random distance
                    const destX = Math.cos(angle) * distance;
                    const destY = Math.sin(angle) * distance;
                    
                    // Random rotation
                    const rotation = -30 + Math.random() * 60;
                    
                    // Apply explosion animation
                    duplicate.style.transform = `translate(${destX}px, ${destY}px) rotate(${rotation}deg) scale(${scale})`;
                    duplicate.style.opacity = '0';
                    
                    // Clean up after animation
                    setTimeout(() => {
                        duplicate.remove();
                    }, 1000);
                }, 10 + i * 50); // Staggered start for better effect
            }
        }
        
        // Observer to start breach card animations when in view
        const breachObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    breachUniverse.classList.add('in-view');
                    
                    // Animate cards appearing with delay
                    breachCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                    
                    // Only trigger once
                    breachObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        if (breachUniverse) {
            breachObserver.observe(breachUniverse);
        }
    }

    // Privacy Odyssey - Data Packet Journey
    initPrivacyOdyssey();
});

function initPrivacyOdyssey() {
    const odysseyContainer = document.querySelector('.odyssey-container');
    if (!odysseyContainer) return;

    // Elements
    const dataPacket = document.querySelector('.data-packet');
    const realms = document.querySelectorAll('.odyssey-realm');
    const storyChapters = document.querySelectorAll('.story-chapter');
    const pathSvg = document.getElementById('odyssey-path-map');
    const mainPath = document.querySelector('.main-path');
    const dangerPath = document.querySelector('.danger-path');
    const altPath = document.querySelector('.alt-path');
    const progressFill = document.querySelector('.progress-fill');
    const statusText = document.querySelector('.status-text');
    const hopsCount = document.querySelector('.hops-count');
    const timeElapsed = document.querySelector('.time-elapsed');
    
    // Controls
    const nextButton = document.getElementById('odyssey-next');
    const backButton = document.getElementById('odyssey-back');
    const autoButton = document.getElementById('odyssey-auto');
    
    // State
    let currentChapter = 0;
    const totalChapters = storyChapters.length;
    let autoJourneyActive = false;
    let journeyTimeInterval;
    let journeyTime = 0;
    
    // Path coordinates for each realm
    const realmCoordinates = {};
    
    // Initialize realm coordinates
    function initRealmCoordinates() {
        realms.forEach(realm => {
            const rect = realm.getBoundingClientRect();
            const mapRect = document.querySelector('.odyssey-map').getBoundingClientRect();
            
            // Store coordinates relative to the map
            realmCoordinates[realm.dataset.realm] = {
                x: rect.left + rect.width/2 - mapRect.left,
                y: rect.top + rect.height/2 - mapRect.top
            };
        });
        
        // Draw initial paths
        drawPaths();
        
        // Position data packet at origin
        if (dataPacket) {
            const originCoords = realmCoordinates['origin'];
            dataPacket.style.left = `${originCoords.x}px`;
            dataPacket.style.top = `${originCoords.y}px`;
        }
    }
    
    // Draw SVG paths between realms
    function drawPaths() {
        if (!pathSvg) return;
        
        // Main safe path
        const mainPathPoints = [
            realmCoordinates['origin'],
            realmCoordinates['forge'],
            realmCoordinates['encryption'],
            realmCoordinates['isp'],
            realmCoordinates['dns'],
            realmCoordinates['https'],
            realmCoordinates['destination']
        ];
        
        // Danger path through tracking realms
        const dangerPathPoints = [
            realmCoordinates['isp'],
            realmCoordinates['tracking'],
            realmCoordinates['adnetwork'],
            realmCoordinates['brokers'],
            realmCoordinates['dns']
        ];
        
        // Alternative paths
        const altPathPoints = [
            {x: realmCoordinates['origin'].x + 50, y: realmCoordinates['origin'].y - 80},
            {x: realmCoordinates['tracking'].x - 70, y: realmCoordinates['tracking'].y + 50},
            {x: realmCoordinates['adnetwork'].x + 60, y: realmCoordinates['adnetwork'].y - 60},
            {x: realmCoordinates['destination'].x - 40, y: realmCoordinates['destination'].y + 70}
        ];
        
        // Generate path commands
        mainPath.setAttribute('d', generatePath(mainPathPoints));
        dangerPath.setAttribute('d', generatePath(dangerPathPoints));
        altPath.setAttribute('d', generatePath(altPathPoints, true));
    }
    
    // Generate SVG path commands
    function generatePath(points, isCurvy = false) {
        if (points.length < 2) return '';
        
        let path = `M${points[0].x},${points[0].y}`;
        
        if (isCurvy) {
            // Generate a curvy path with bezier curves
            for (let i = 0; i < points.length - 1; i++) {
                const x1 = points[i].x;
                const y1 = points[i].y;
                const x2 = points[i+1].x;
                const y2 = points[i+1].y;
                
                // Control points for the curve
                const ctrl1x = x1 + (x2 - x1) / 3 + (Math.random() - 0.5) * 60;
                const ctrl1y = y1 + (Math.random() - 0.5) * 60;
                const ctrl2x = x2 - (x2 - x1) / 3 + (Math.random() - 0.5) * 60;
                const ctrl2y = y2 + (Math.random() - 0.5) * 60;
                
                path += ` C${ctrl1x},${ctrl1y} ${ctrl2x},${ctrl2y} ${x2},${y2}`;
            }
        } else {
            // Generate a smoother path with quadratic curves
            for (let i = 0; i < points.length - 1; i++) {
                const x1 = points[i].x;
                const y1 = points[i].y;
                const x2 = points[i+1].x;
                const y2 = points[i+1].y;
                
                // Control point for the curve
                const ctrlX = (x1 + x2) / 2 + (Math.random() - 0.5) * 20;
                const ctrlY = (y1 + y2) / 2 + (Math.random() - 0.5) * 20;
                
                path += ` Q${ctrlX},${ctrlY} ${x2},${y2}`;
            }
        }
        
        return path;
    }
    
    // Move data packet to a specific realm
    function movePacketToRealm(realmId) {
        if (!dataPacket || !realmCoordinates[realmId]) return;
        
        const coords = realmCoordinates[realmId];
        dataPacket.style.left = `${coords.x}px`;
        dataPacket.style.top = `${coords.y}px`;
        
        // Update packet status
        updatePacketStatus(realmId);
        
        // Update entities visibility
        updateEntitiesVisibility(realmId);
    }
    
    // Update packet status text and progress
    function updatePacketStatus(realmId) {
        let statusMessage = '';
        
        switch(realmId) {
            case 'origin':
                statusMessage = 'Initiating journey...';
                break;
            case 'forge':
                statusMessage = 'Assembling packet structure...';
                break;
            case 'encryption':
                statusMessage = 'Applying encryption...';
                break;
            case 'isp':
                statusMessage = 'Routing through ISP...';
                break;
            case 'tracking':
                statusMessage = 'WARNING: Tracking attempt detected!';
                break;
            case 'adnetwork':
                statusMessage = 'CAUTION: Traversing ad networks...';
                break;
            case 'brokers':
                statusMessage = 'DANGER: Data broker activity detected!';
                break;
            case 'dns':
                statusMessage = 'Resolving domain name...';
                break;
            case 'https':
                statusMessage = 'Establishing secure connection...';
                break;
            case 'destination':
                statusMessage = 'Arrived at destination!';
                break;
            default:
                statusMessage = 'Packet in transit...';
        }
        
        if (statusText) statusText.textContent = statusMessage;
        
        // Danger zones change packet appearance
        if (['tracking', 'adnetwork', 'brokers'].includes(realmId)) {
            dataPacket.classList.add('in-danger');
        } else {
            dataPacket.classList.remove('in-danger');
        }
    }
    
    // Navigate to a specific chapter
    function goToChapter(chapterIndex) {
        if (chapterIndex < 0 || chapterIndex >= totalChapters) return;
        
        // Update story chapters
        storyChapters.forEach(chapter => chapter.classList.remove('active'));
        storyChapters[chapterIndex].classList.add('active');
        
        // Move packet to corresponding realm
        const realmId = storyChapters[chapterIndex].dataset.chapter;
        movePacketToRealm(realmId);
        
        // Update progress bar
        const progress = ((chapterIndex + 1) / totalChapters) * 100;
        progressFill.style.width = `${progress}%`;
        
        // Update hops count
        hopsCount.textContent = `${chapterIndex} hops`;
        
        // Update current chapter
        currentChapter = chapterIndex;
        
        // Enable/disable navigation buttons
        if (backButton) backButton.disabled = chapterIndex === 0;
        if (nextButton) nextButton.disabled = chapterIndex === totalChapters - 1;
        
        // If we reached the end, stop auto journey
        if (chapterIndex === totalChapters - 1 && autoJourneyActive) {
            stopAutoJourney();
        }
    }
    
    // Start automatic journey
    function startAutoJourney() {
        if (autoJourneyActive) return;
        
        autoJourneyActive = true;
        if (autoButton) {
            autoButton.innerHTML = '<i class="fas fa-pause"></i><span>Pause</span>';
        }
        
        // Start from beginning if at the end
        if (currentChapter === totalChapters - 1) {
            goToChapter(0);
        }
        
        // Start journey time counter
        journeyTime = 0;
        journeyTimeInterval = setInterval(() => {
            journeyTime += 0.1;
            if (timeElapsed) {
                timeElapsed.textContent = `${journeyTime.toFixed(1)} ms`;
            }
        }, 100);
        
        // Advance to next chapter every few seconds
        const autoAdvance = () => {
            if (!autoJourneyActive) return;
            
            if (currentChapter < totalChapters - 1) {
                goToChapter(currentChapter + 1);
                setTimeout(autoAdvance, 3500); // Advance every 3.5 seconds
            } else {
                stopAutoJourney();
            }
        };
        
        autoAdvance();
    }
    
    // Stop automatic journey
    function stopAutoJourney() {
        autoJourneyActive = false;
        if (autoButton) {
            autoButton.innerHTML = '<i class="fas fa-play"></i><span>Auto-Journey</span>';
        }
        clearInterval(journeyTimeInterval);
    }
    
    // Initialize realm interaction
    function initRealmInteraction() {
        realms.forEach(realm => {
            realm.addEventListener('click', () => {
                const realmId = realm.dataset.realm;
                const chapterIndex = Array.from(storyChapters).findIndex(
                    chapter => chapter.dataset.chapter === realmId
                );
                
                if (chapterIndex >= 0) {
                    // Stop auto journey if active
                    if (autoJourneyActive) {
                        stopAutoJourney();
                    }
                    
                    goToChapter(chapterIndex);
                }
            });
            
            // Show realm info on hover
            realm.addEventListener('mouseenter', () => {
                showRealmInfo(realm);
            });
            
            realm.addEventListener('mouseleave', () => {
                hideRealmInfo();
            });
        });
    }
    
    // Show realm information tooltip
    function showRealmInfo(realm) {
        const realmInfoPopup = document.querySelector('.realm-info-popup');
        if (!realmInfoPopup) return;
        
        const realmId = realm.dataset.realm;
        const realmRect = realm.getBoundingClientRect();
        const mapRect = document.querySelector('.odyssey-map').getBoundingClientRect();
        
        // Position popup above the realm
        realmInfoPopup.style.left = `${realmRect.left + realmRect.width/2 - mapRect.left}px`;
        realmInfoPopup.style.top = `${realmRect.top - mapRect.top}px`;
        
        // Set content based on realm
        const infoHeader = realmInfoPopup.querySelector('.realm-info-header');
        const infoContent = realmInfoPopup.querySelector('.realm-info-content');
        
        if (infoHeader && infoContent) {
            // Set realm name and description
            switch(realmId) {
                case 'origin':
                    infoHeader.textContent = 'Origin Nexus';
                    infoContent.textContent = 'Your digital starting point, where data is born from your interactions.';
                    break;
                case 'forge':
                    infoHeader.textContent = 'Data Shaping Forge';
                    infoContent.textContent = 'Transforms raw data into structured packets ready for transmission.';
                    break;
                case 'encryption':
                    infoHeader.textContent = 'Encryption Nebula';
                    infoContent.textContent = 'Cloaks your data in mathematical protection to prevent unauthorized access.';
                    break;
                case 'isp':
                    infoHeader.textContent = 'ISP Gateway';
                    infoContent.textContent = 'The first major junction where your data enters the broader internet.';
                    break;
                case 'tracking':
                    infoHeader.textContent = 'Tracking Wastes';
                    infoContent.textContent = 'Dangerous territory where tracking scripts attempt to monitor your data.';
                    break;
                case 'adnetwork':
                    infoHeader.textContent = 'Ad Network Labyrinth';
                    infoContent.textContent = 'Complex maze of advertising systems trying to profile users for targeted ads.';
                    break;
                case 'brokers':
                    infoHeader.textContent = 'Data Broker Bazaar';
                    infoContent.textContent = 'Shadowy marketplace where personal information is bought and sold.';
                    break;
                case 'dns':
                    infoHeader.textContent = 'DNS Crossroads';
                    infoContent.textContent = 'Name resolution system that translates domain names to IP addresses.';
                    break;
                case 'https':
                    infoHeader.textContent = 'HTTPS Sanctuary';
                    infoContent.textContent = 'Secure protocol tunnel protecting the connection between client and server.';
                    break;
                case 'destination':
                    infoHeader.textContent = 'Destination Server';
                    infoContent.textContent = 'The final destination where your request is processed and a response generated.';
                    break;
                default:
                    infoHeader.textContent = 'Unknown Realm';
                    infoContent.textContent = 'Mysterious area of the digital cosmos.';
            }
        }
        
        // Show popup
        realmInfoPopup.classList.add('visible');
    }
    
    // Hide realm information tooltip
    function hideRealmInfo() {
        const realmInfoPopup = document.querySelector('.realm-info-popup');
        if (realmInfoPopup) {
            realmInfoPopup.classList.remove('visible');
        }
    }
    
    // Add event listeners to control buttons
    function initControls() {
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                if (currentChapter < totalChapters - 1) {
                    goToChapter(currentChapter + 1);
                }
            });
        }
        
        if (backButton) {
            backButton.addEventListener('click', () => {
                if (currentChapter > 0) {
                    goToChapter(currentChapter - 1);
                }
            });
        }
        
        if (autoButton) {
            autoButton.addEventListener('click', () => {
                if (autoJourneyActive) {
                    stopAutoJourney();
                } else {
                    startAutoJourney();
                }
            });
        }
    }
    
    // Initialize lore panel functionality
    function initLorePanel() {
        const loreButton = document.querySelector('.realm-info-lore');
        const lorePanel = document.querySelector('.odyssey-lore-panel');
        const loreClose = document.querySelector('.lore-close');
        
        if (loreButton && lorePanel) {
            loreButton.addEventListener('click', () => {
                const realmId = document.querySelector('.realm-info-popup.visible')?.getAttribute('data-realm');
                
                if (realmId) {
                    // Show the appropriate lore entry
                    const loreEntries = document.querySelectorAll('.lore-entry');
                    loreEntries.forEach(entry => entry.classList.remove('active'));
                    
                    const targetLore = document.querySelector(`.lore-entry[data-lore="${realmId}"]`);
                    if (targetLore) {
                        targetLore.classList.add('active');
                    }
                }
                
                lorePanel.classList.add('active');
            });
        }
        
        if (loreClose) {
            loreClose.addEventListener('click', () => {
                lorePanel.classList.remove('active');
            });
        }
    }
    
    // Add Threat Entities at specific points in the journey
    function setupThreats() {
        // Cookie monster near tracking wastes
        createThreat('cookie-monster', 'tracking', -30, 40);
        
        // Fingerprinter near ad network
        createThreat('fingerprinter', 'adnetwork', 50, -20);
        
        // Beacon near brokers
        createThreat('beacon', 'brokers', -40, -30);
        
        // Data vacuum between tracking and brokers
        createThreat('datavac', 'brokers', -100, -80);
        
        // Defenders
        createDefender('firewall', 'encryption', 40, 40);
        createDefender('blocker', 'https', -40, -30);
    }
    
    // Create a threat entity
    function createThreat(threatId, nearRealmId, offsetX, offsetY) {
        if (!realmCoordinates[nearRealmId]) return;
        
        const threat = document.querySelector(`.threat[data-threat="${threatId}"]`);
        if (!threat) return;
        
        const coords = realmCoordinates[nearRealmId];
        threat.style.left = `${coords.x + offsetX}px`;
        threat.style.top = `${coords.y + offsetY}px`;
    }
    
    // Create a defender entity
    function createDefender(defenderId, nearRealmId, offsetX, offsetY) {
        if (!realmCoordinates[nearRealmId]) return;
        
        const defender = document.querySelector(`.defender-entity[data-defender="${defenderId}"]`);
        if (!defender) return;
        
        const coords = realmCoordinates[nearRealmId];
        defender.style.left = `${coords.x + offsetX}px`;
        defender.style.top = `${coords.y + offsetY}px`;
    }
    
    // Show threats and defenders when entering specific realms
    function updateEntitiesVisibility(realmId) {
        const threats = document.querySelectorAll('.threat');
        const defenders = document.querySelectorAll('.defender-entity');
        
        if (['tracking', 'adnetwork', 'brokers'].includes(realmId)) {
            // Show threats with delay
            threats.forEach((threat, index) => {
                setTimeout(() => {
                    threat.classList.add('visible');
                }, index * 300);
            });
        } else {
            // Hide threats
            threats.forEach(threat => {
                threat.classList.remove('visible');
            });
        }
        
        if (['encryption', 'https'].includes(realmId)) {
            // Show defenders
            defenders.forEach((defender, index) => {
                setTimeout(() => {
                    defender.classList.add('visible');
                }, index * 300);
            });
        } else {
            // Hide defenders
            defenders.forEach(defender => {
                defender.classList.remove('visible');
            });
        }
    }
    
    // Initialize the visual
    function initOdyssey() {
        // Wait for DOM to fully render
        setTimeout(() => {
            initRealmCoordinates();
            initRealmInteraction();
            initControls();
            initLorePanel();
            setupThreats();
            
            // Start at first chapter
            goToChapter(0);
            
            // Initialize observer for animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Start with a small delay
                        setTimeout(() => {
                            startAutoJourney();
                        }, 1000);
                        
                        // Only trigger once
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(odysseyContainer);
        }, 500);
    }
    
    // Initialize when the section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initOdyssey();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(odysseyContainer);
} 