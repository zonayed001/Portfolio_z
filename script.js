/* ===================================
   EMAILJS CONFIGURATION
   =================================== */

const EMAILJS_CONFIG = {
    serviceID: 'service_i4ffucl',      
    templateID: 'template_6pg8095',    
    publicKey: 'Kn8Ab1cJLBy12j9Fd'   
};

/* ===================================
   VIDEO RESUME CONFIGURATION
   =================================== */
// Video URL is set as per requirements
const VIDEO_URL = 'https://www.youtube.com/embed/-VaDvUNo57w';

/* ===================================
   INITIALIZE EMAILJS
   =================================== */
(function() {
    // Initialize EmailJS with public key
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

/* ===================================
   MOBILE NAVIGATION TOGGLE
   =================================== */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ===================================
   SMOOTH SCROLLING FOR NAVIGATION
   =================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for non-section links
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ===================================
   VIDEO MODAL FUNCTIONALITY
   =================================== */
const videoModal = document.getElementById('videoModal');
const openVideoBtn = document.getElementById('openVideoBtn');
const closeModalBtn = document.querySelector('.close-modal');
const videoPlayer = document.getElementById('videoPlayer');

// Open video modal
if (openVideoBtn && videoModal) {
    openVideoBtn.addEventListener('click', () => {
        // Create iframe for video
        const iframe = document.createElement('iframe');
        iframe.src = VIDEO_URL + '?autoplay=1';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        
        videoPlayer.innerHTML = '';
        videoPlayer.appendChild(iframe);
        
        videoModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
}

// Close video modal
if (closeModalBtn && videoModal) {
    closeModalBtn.addEventListener('click', closeVideoModal);
}

// Close modal when clicking outside
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.style.display === 'block') {
        closeVideoModal();
    }
});

function closeVideoModal() {
    videoModal.style.display = 'none';
    videoPlayer.innerHTML = ''; // Remove iframe to stop video
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

/* ===================================
   CONTACT FORM HANDLING WITH EMAILJS
   =================================== */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Basic validation
        if (!validateEmail(formData.email)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        if (formData.message.length < 10) {
            showFormStatus('Message must be at least 10 characters long.', 'error');
            return;
        }

        // Disable submit button during sending
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // TODO: Make sure you've set up your EmailJS template with these field names:
            // {{name}}, {{email}}, {{subject}}, {{message}}
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceID,
                EMAILJS_CONFIG.templateID,
                formData
            );

            if (response.status === 200) {
                showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }
        } catch (error) {
            console.error('EmailJS Error:', error);
            showFormStatus('Failed to send message. Please try again or contact me directly.', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

/* ===================================
   FORM VALIDATION HELPER
   =================================== */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/* ===================================
   FORM STATUS DISPLAY
   =================================== */
function showFormStatus(message, type) {
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }
}

/* ===================================
   NAVBAR BACKGROUND ON SCROLL
   =================================== */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(10, 10, 15, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.backgroundColor = 'rgba(10, 10, 15, 0.95)';
        header.style.boxShadow = 'none';
    }
});

/* ===================================
   PROJECT CARDS HOVER EFFECT
   =================================== */
// Add subtle animation to project cards on hover
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

/* ===================================
   GALLERY IMAGE CLICK (OPTIONAL ENHANCEMENT)
   =================================== */
// You can add a lightbox effect here if desired
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        // TODO: You can implement a lightbox here
        // For now, this is just a placeholder for future enhancement
        console.log('Gallery item clicked - you can add lightbox functionality here');
    });
});

/* ===================================
   SCROLL REVEAL ANIMATION (OPTIONAL)
   =================================== */
// Observe elements and add animation when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};