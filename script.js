// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.feature-card, .timeline-item, .contact-item, .about-text').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Parallax effect for temple illustration
const templeIllustration = document.querySelector('.temple-illustration');
if (templeIllustration) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.3;
        templeIllustration.style.transform = `translateY(${rate}px)`;
    });
}

// Navbar background change on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 22, 40, 0.98)';
    } else {
        header.style.background = 'rgba(10, 22, 40, 0.9)';
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const inputs = contactForm.querySelectorAll('.form-input');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff6b6b';
            } else {
                input.style.borderColor = '#d4af37';
            }
        });
        
        if (isValid) {
            // Show success message
            const button = contactForm.querySelector('.submit-button');
            const originalText = button.textContent;
            button.textContent = 'Đã gửi thành công!';
            button.style.background = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                contactForm.reset();
            }, 3000);
        }
    });
}

// CTA button click effect
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        // Smooth scroll to contact section
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Add hover effect to feature cards with magnetic effect
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        card.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translate(0, 0) translateY(0)';
    });
});

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    timelineObserver.observe(item);
});

// Add glow effect to gold elements on hover
const goldElements = document.querySelectorAll('.logo-icon, .section-title, .info-icon');
goldElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.filter = 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.8))';
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.filter = '';
    });
});

// Dynamic wave animation speed
const waves = document.querySelectorAll('.wave-pattern');
waves.forEach((wave, index) => {
    wave.style.animationDuration = `${8 + index * 2}s`;
});

// Add typing effect to decorative title
const decorativeTitle = document.querySelector('.decorative-title');
if (decorativeTitle) {
    const text = decorativeTitle.textContent;
    decorativeTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            decorativeTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing after initial animation
    setTimeout(typeWriter, 1500);
}

// Counter animation for section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    title.addEventListener('mouseenter', () => {
        title.style.transform = 'scale(1.05)';
        title.style.transition = 'transform 0.3s ease';
    });
    
    title.addEventListener('mouseleave', () => {
        title.style.transform = 'scale(1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.cta-button, .submit-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left - 10) + 'px';
        ripple.style.top = (e.clientY - rect.top - 10) + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #d4af37, #f4d03f);
    z-index: 1001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Add entrance animation for hero section elements
const heroElements = document.querySelectorAll('.main-title, .decorative-title, .info-item, .cta-button');
heroElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }, 300 + index * 200);
});

// Lazy load images (if any)
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: 300, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -300, behavior: 'smooth' });
    }
});

console.log('Tour đêm Văn Miếu website loaded successfully!');
