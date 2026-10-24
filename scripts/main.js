// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Validate form
            if (!validateForm(formData)) {
                return;
            }
            
            // Add loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            addLoadingState(submitButton);
            
            // Try EmailJS first, fallback to mailto
            if (typeof emailjs !== 'undefined') {
                sendEmailWithEmailJS(name, email, phone, service, message, submitButton);
            } else {
                // Fallback to mailto
                const subject = `New Inquiry from ${name} - ${service}`;
                const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nService: ${service}\n\nMessage:\n${message}`;
                const mailtoLink = `mailto:flairshineequitech@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Show success message
                showSuccessMessage('Your email client should open shortly. Please send the email to complete your inquiry.');
                
                // Reset form
                contactForm.reset();
            }
        });
    }

    // EmailJS integration function
    function sendEmailWithEmailJS(name, email, phone, service, message, submitButton) {
        const templateParams = {
            from_name: name,
            from_email: email,
            phone: phone || 'Not provided',
            service: service,
            message: message,
            to_email: 'flairshineequitech@gmail.com'
        };

        emailjs.send('service_04cw07a', 'template_ipjbhzu', templateParams)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                showSuccessMessage('Thank you! Your message has been sent successfully. We will get back to you soon.');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                showErrorMessage('Sorry, there was an error sending your message. Please try again or contact us directly.');
            })
            .finally(function() {
                // Reset button state
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            });
    }

    // Web3Forms integration function (alternative)
    // Success message function
    function showSuccessMessage(message = 'Thank you! Your message has been sent successfully.') {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <span class="success-icon">✓</span>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        successDiv.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: #10B981;
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            transform: translateX(400px);
            transition: all 0.3s ease;
            max-width: 350px;
        `;
        
        const successContent = successDiv.querySelector('.success-content');
        successContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
        `;
        
        const successIcon = successDiv.querySelector('.success-icon');
        successIcon.style.cssText = `
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
        `;
        
        document.body.appendChild(successDiv);
        
        // Animate in
        setTimeout(() => {
            successDiv.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            successDiv.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(successDiv)) {
                    document.body.removeChild(successDiv);
                }
            }, 300);
        }, 5000);
    }

    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <span class="error-icon">⚠</span>
                <span>${message}</span>
            </div>
        `;
        
        errorDiv.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: #EF4444;
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            transform: translateX(400px);
            transition: all 0.3s ease;
            max-width: 350px;
        `;
        
        const errorContent = errorDiv.querySelector('.error-content');
        errorContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
        `;
        
        const errorIcon = errorDiv.querySelector('.error-icon');
        errorIcon.style.cssText = `
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            flex-shrink: 0;
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            errorDiv.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(errorDiv)) {
                    document.body.removeChild(errorDiv);
                }
            }, 300);
        }, 5000);
    }

    // Enhanced form validation
    function validateForm(formData) {
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const service = formData.get('service');
        const message = formData.get('message').trim();
        
        if (!name || name.length < 2) {
            showErrorMessage('Please enter a valid name (at least 2 characters)');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showErrorMessage('Please enter a valid email address');
            return false;
        }
        
        if (!service) {
            showErrorMessage('Please select a service of interest');
            return false;
        }
        
        if (!message || message.length < 10) {
            showErrorMessage('Please enter a message (at least 10 characters)');
            return false;
        }
        
        return true;
    }

    // Add loading states for form submission
    function addLoadingState(button) {
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;
        button.style.opacity = '0.7';
    }

    // Initialize EmailJS (if using EmailJS)
    function initializeEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init('ZTq9giTeDZtT7IXpP');
        }
    }

    // Call initialization
    initializeEmailJS();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = '#000000';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = '#000000';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.about-card, .product-card, .contact-card, .leader-card').forEach(el => {
        observer.observe(el);
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(navLinks);

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Phone number formatting
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{3})$/);
    if (match) {
        return `${match[1]} ${match[2]} ${match[3]}`;
    }
    return phoneNumber;
}

// Initialize phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            const formatted = formatPhoneNumber(e.target.value);
            e.target.value = formatted;
        });
    }
});

// Add loading states for form submission
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        button.style.opacity = '1';
    }, 2000);
}

// Enhanced form validation
function validateForm(formData) {
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    if (!name || name.length < 2) {
        showErrorMessage('Please enter a valid name (at least 2 characters)');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showErrorMessage('Please enter a valid email address');
        return false;
    }
    
    if (!message || message.length < 10) {
        showErrorMessage('Please enter a message (at least 10 characters)');
        return false;
    }
    
    return true;
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div class="error-content">
            <span class="error-icon">⚠</span>
            <span>${message}</span>
        </div>
    `;
    
    errorDiv.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: #EF4444;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        transform: translateX(400px);
        transition: all 0.3s ease;
    `;
    
    const errorContent = errorDiv.querySelector('.error-content');
    errorContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        errorDiv.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 300);
    }, 4000);
}