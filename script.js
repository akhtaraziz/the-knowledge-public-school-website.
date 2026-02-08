// Main JavaScript for The Knowledge Public School Website

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation flags
            let isValid = true;
            
            // Reset previous error states
            clearErrors();
            
            // Name validation
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            }
            
            // Email validation
            if (email === '') {
                showError('email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Phone validation (optional, but if provided, check format)
            if (phone !== '' && !isValidPhone(phone)) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Subject validation
            if (subject === '') {
                showError('subject', 'Please enter a subject');
                isValid = false;
            }
            
            // Message validation
            if (message === '') {
                showError('message', 'Please enter your message');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Message should be at least 10 characters');
                isValid = false;
            }
            
            // If form is valid, show success message and reset form
            if (isValid) {
                // In a real application, you would send the data to a server here
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
            
            return false;
        });
    }
    
    // Form validation helper functions
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        // Create error element if it doesn't exist
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        // Add error class to form control
        field.classList.add('error');
        
        // Set error message
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '5px';
    }
    
    function clearErrors() {
        // Remove all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        // Remove error class from all form controls
        const errorFields = document.querySelectorAll('.form-control.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    // Gallery image modal (basic implementation)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            // Create modal
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '2000';
            
            // Create image element
            const modalImg = document.createElement('img');
            modalImg.src = imgSrc;
            modalImg.alt = imgAlt;
            modalImg.style.maxWidth = '90%';
            modalImg.style.maxHeight = '90%';
            modalImg.style.borderRadius = '8px';
            
            // Close button
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '20px';
            closeBtn.style.right = '30px';
            closeBtn.style.fontSize = '3rem';
            closeBtn.style.color = 'white';
            closeBtn.style.background = 'none';
            closeBtn.style.border = 'none';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.zIndex = '2001';
            
            // Close modal function
            function closeModal() {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
            
            // Event listeners
            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Add elements to modal and modal to body
            modal.appendChild(modalImg);
            modal.appendChild(closeBtn);
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
});
