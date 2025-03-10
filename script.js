function toggleNav() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
    
    const navToggle = document.querySelector('.nav-toggle');
    navToggle.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Make theme toggle draggable
const themeToggle = document.querySelector('.theme-toggle');
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

themeToggle.addEventListener('mousedown', dragStart);
themeToggle.addEventListener('mouseup', dragEnd);
themeToggle.addEventListener('mousemove', drag);
themeToggle.addEventListener('touchstart', dragStart);
themeToggle.addEventListener('touchend', dragEnd);
themeToggle.addEventListener('touchmove', drag);

function dragStart(e) {
    if (e.type === "mousedown") {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    } else {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    }
    
    if (e.target === themeToggle) {
        isDragging = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        
        if (e.type === "mousemove") {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        } else {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, themeToggle);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

// Keep theme toggle visible while scrolling
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrolled + viewportHeight >= documentHeight) {
        themeToggle.style.bottom = '20px';
    } else {
        themeToggle.style.bottom = '20px';
    }
});

// Typing animation
const roles = ["Web Developer", "Data Analyst","Cloud Architect", "Full Stack Developer"];
let roleIndex = 0;
let typingCharIndex = 0;
const typingText = document.querySelector('.typing-text');

function type() {
    if (typingCharIndex < roles[roleIndex].length) {
        typingText.textContent += roles[roleIndex].charAt(typingCharIndex);
        typingCharIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (typingCharIndex > 0) {
        typingText.textContent = roles[roleIndex].substring(0, typingCharIndex-1);
        typingCharIndex--;
        setTimeout(erase, 50);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 500);
    }
}

type();

// Interactive profile image
const profileImg = document.getElementById('heroImage');
const profileContainer = document.querySelector('.profile-container');
const heroContent = document.querySelector('.hero-content');

profileImg.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = profileImg.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    profileImg.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.05)`;
});

profileImg.addEventListener('mouseleave', () => {
    profileImg.style.transform = 'none';
});

// Improved scroll effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    // Only apply effects if we're in the hero section
    if (scrolled < viewportHeight) {
        // Subtle fade out effect for hero content
        const opacity = 1 - (scrolled / (viewportHeight * 0.8));
        heroContent.style.opacity = opacity > 0 ? opacity : 0;
        
        // Subtle parallax effect for profile image
        const translateY = scrolled * 0.2; // Reduced movement
        profileContainer.style.transform = `translateY(${translateY}px)`;
        
        // Subtle scale effect for profile image
        const scale = 1 - (scrolled / viewportHeight) * 0.2; // Very subtle scale
        profileImg.style.transform = `scale(${scale > 0.8 ? scale : 0.8})`;
    }
});

// Intersection Observer for loading animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loading-animation');
        } else {
            entry.target.classList.remove('loading-animation');
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '50px' // Starts animation slightly before card comes into view
});

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

const text = "enough talk, lets code";
const dots = "...";
const commandElement = document.querySelector('.command');
let charIndex = 0;
let dotsCount = 0;

function typeText() {
    if (charIndex < text.length) {
        commandElement.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        animateDots();
    }
}

function animateDots() {
    dotsCount = (dotsCount + 1) % 4;
    commandElement.textContent = text + ".".repeat(dotsCount);
    setTimeout(animateDots, 500);
}

typeText();

function toggleTheme() {
    const body = document.documentElement;
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
}

// Handle hero image animation
const hero = document.getElementById('hero');
const heroImage = document.getElementById('heroImage');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY) {
        hero.classList.add('active');
    } else {
        hero.classList.remove('active');
    }

    // Burst effect when scrolling down
    if (currentScrollY > window.innerHeight) {
        heroImage.style.transform = 'scale(1.5)';
        heroImage.style.opacity = '0';
    } else {
        heroImage.style.transform = 'scale(1)';
        heroImage.style.opacity = '1';
    }

    lastScrollY = currentScrollY;
});

// Project card expansion
function expandCard(card) {
    card.style.transform = 'scale(1.1)';
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 200);
}

// Check user's preferred color scheme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
}

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'91de1ca0592cbf98',t:'MTc0MTU2MDQyMi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();

// Smooth scroll functionality for scroll indicator
const scrollIndicator = document.getElementById('scrollIndicator');
scrollIndicator.addEventListener('click', () => {
    const projectsSection = document.getElementById('projects');
    projectsSection.scrollIntoView({ behavior: 'smooth' });
});

// Hide scroll indicator when projects section is visible
const projectsSection = document.getElementById('projects');
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}, { 
    threshold: 0.1
});

scrollObserver.observe(projectsSection);

// Add navbar visibility handling
const navbar = document.querySelector('.navbar');
const navbarTrigger = document.querySelector('.navbar-trigger');
let navbarTimeout;
let isNavbarVisible = false;

function showNavbar() {
    if (!isNavbarVisible) {
        navbar.classList.add('visible');
        isNavbarVisible = true;
    }
}

function hideNavbar() {
    if (isNavbarVisible) {
        navbar.classList.remove('visible');
        isNavbarVisible = false;
    }
}

navbarTrigger.addEventListener('mouseenter', () => {
    showNavbar();
    clearTimeout(navbarTimeout);
});

navbar.addEventListener('mouseenter', () => {
    showNavbar();
    clearTimeout(navbarTimeout);
});

navbar.addEventListener('mouseleave', () => {
    navbarTimeout = setTimeout(hideNavbar, 1000);
});

navbarTrigger.addEventListener('mouseleave', (e) => {
    if (e.relatedTarget !== navbar && !navbar.contains(e.relatedTarget)) {
        navbarTimeout = setTimeout(hideNavbar, 1000);
    }
});

// Show navbar when scrolling up, hide when scrolling down
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        hideNavbar();
    } else if (scrollTop < lastScrollTop) {
        showNavbar();
    }
    lastScrollTop = scrollTop;
});

// Prevent navbar from showing when clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            hideNavbar();
        }
    });
});