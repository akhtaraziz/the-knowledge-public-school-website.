// JavaScript for The Knowledge Public School Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Update active link
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Admission Form Submission
    const applicationForm = document.getElementById('applicationForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    const applicationId = document.getElementById('applicationId');
    
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const studentName = document.getElementById('studentName').value;
        const fatherName = document.getElementById('fatherName').value;
        const cnic = document.getElementById('cnic').value;
        const dob = document.getElementById('dob').value;
        const grade = document.getElementById('grade').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const previousSchool = document.getElementById('previousSchool').value;
        
        // Validate required fields
        if (!studentName || !fatherName || !cnic || !dob || !grade || !phone || !address) {
            alert('Please fill in all required fields marked with *');
            return;
        }
        
        // Validate CNIC format (simple validation)
        const cnicRegex = /^\d{5}-\d{7}-\d{1}$|^\d{13}$/;
        if (!cnicRegex.test(cnic)) {
            alert('Please enter a valid CNIC in format XXXXX-XXXXXXX-X or 13 digits');
            return;
        }
        
        // Validate phone number
        const phoneRegex = /^03\d{9}$/;
        const cleanPhone = phone.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            alert('Please enter a valid Pakistani phone number starting with 03 (11 digits)');
            return;
        }
        
        // Generate random application ID
        const randomId = Math.floor(10000 + Math.random() * 90000);
        applicationId.textContent = `TKPS-2024-${randomId}`;
        
        // Show success modal
        successModal.style.display = 'flex';
        
        // In a real application, you would send data to server here
        console.log('Application Submitted:', {
            studentName,
            fatherName,
            cnic,
            dob,
            grade,
            phone,
            email,
            address,
            previousSchool,
            applicationId: applicationId.textContent
        });
        
        // Reset form
        applicationForm.reset();
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
    
    // Close modal when clicking X
    closeModal.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
    
    // Format CNIC input
    const cnicInput = document.getElementById('cnic');
    if (cnicInput) {
        cnicInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 13) {
                value = value.substring(0, 13);
            }
            
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5);
            }
            
            if (value.length > 13) {
                value = value.substring(0, 13) + '-' + value.substring(13);
            }
            
            e.target.value = value;
        });
    }
    
    // Format phone input
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            if (value.startsWith('03') && value.length > 2) {
                e.target.value = value.substring(0, 4) + '-' + value.substring(4);
            } else {
                e.target.value = value;
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add animation to stats
        const statNumbers = document.querySelectorAll('.stat-item h3');
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            let currentValue = 0;
            const increment = finalValue / 50;
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    currentValue = finalValue;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('%') ? '%' : '+');
            }, 30);
        });
    });
});
