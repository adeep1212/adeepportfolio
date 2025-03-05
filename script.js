// Typing Animation
const typingText = document.querySelector('.typing-text');
const words = ['Web Developer', 'Designer', 'Freelancer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = 'I\'m a ' + currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = 'I\'m a ' + currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Start typing animation
type();

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    burger.classList.toggle('toggle');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            subject: form.querySelector('#subject').value,
            message: form.querySelector('#message').value
        };

        // Disable form while submitting
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitButton.style.backgroundColor = '#64ffda';
            submitButton.style.color = '#0a192f';
            
            // Clear form
            form.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                submitButton.style.backgroundColor = '';
                submitButton.style.color = '';
            }, 3000);
        }, 1500);
    });
}

// Add floating labels
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Scroll Reveal Animation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('active');
        }
    });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const menuButton = document.querySelector('.menu-button');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const progressBar = document.querySelector('.progress-bar');

    // Initialize variables
    let lastScrollTop = 0;
    let isScrolling;
    let prevSection = '';

    // Add index to nav items for staggered animation
    navItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

    // Toggle mobile menu with animation
    menuButton?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuButton.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuButton.contains(e.target)) {
            navLinks.classList.remove('active');
            menuButton.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scroll to section with offset
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                navLinks.classList.remove('active');
                menuButton.classList.remove('active');
                document.body.style.overflow = '';
                
                const offset = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update scroll progress
    const updateScrollProgress = () => {
        const winScroll = window.pageYOffset;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
    };

    // Handle scroll events with debounce
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Update navbar appearance
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update scroll progress
        updateScrollProgress();
        
        // Update active section with smooth transition
        clearTimeout(isScrolling);
        
        isScrolling = setTimeout(() => {
            let currentSection = '';
            const navbarHeight = navbar.offsetHeight;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navbarHeight - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                    currentSection = section.id;
                    
                    if (currentSection !== prevSection) {
                        // Remove active class from all links
                        navItems.forEach(item => {
                            const link = item.querySelector('.nav-link');
                            link.classList.remove('active');
                        });
                        
                        // Add active class to current section link
                        const activeLink = document.querySelector(`a[href="#${currentSection}"]`);
                        if (activeLink) {
                            activeLink.classList.add('active');
                            
                            // Animate number
                            const number = activeLink.querySelector('.nav-number');
                            number.style.transform = 'scale(1.2)';
                            setTimeout(() => {
                                number.style.transform = 'scale(1)';
                            }, 200);
                        }
                        
                        prevSection = currentSection;
                    }
                }
            });
        }, 100);
    };

    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Show navbar with animation on page load
    navbar.classList.add('show');
    
    // Initialize scroll progress
    updateScrollProgress();
});

// Add scroll indicator
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    
    const mouse = document.createElement('div');
    mouse.className = 'mouse';
    
    const wheel = document.createElement('div');
    wheel.className = 'wheel';
    
    const arrow = document.createElement('div');
    arrow.className = 'arrow';
    
    for (let i = 0; i < 3; i++) {
        const span = document.createElement('span');
        arrow.appendChild(span);
    }
    
    mouse.appendChild(wheel);
    indicator.appendChild(mouse);
    indicator.appendChild(arrow);
    
    navbar.parentElement.appendChild(indicator);
};

createScrollIndicator();
