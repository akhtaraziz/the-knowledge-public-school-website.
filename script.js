// JavaScript Code
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Update active link
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Form submission
    const admissionForm = document.getElementById('admissionForm');
    admissionForm.addEventListener('submit', function(e) {
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
        
        // Validate form
        if (!studentName || !fatherName || !cnic || !dob || !grade || !phone || !address) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Validate CNIC format (simple validation)
        if (!/^\d{5}-\d{7}-\d{1}$/.test(cnic) && !/^\d{13}$/.test(cnic)) {
            alert('Please enter a valid CNIC in format XXXXX-XXXXXXX-X or 13 digits.');
            return;
        }
        
        // Validate phone number
        if (!/^\d{11,}$/.test(phone.replace(/\D/g, ''))) {
            alert('Please enter a valid 11-digit phone number.');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For this example, we'll just show a success message
        const gradeText = document.querySelector(`#grade option[value="${grade}"]`).textContent;
        alert(`Thank you, ${studentName}!\n\nYour application for ${gradeText} has been submitted successfully.\n\nApplication Details:\n- Father: ${fatherName}\n- CNIC: ${cnic}\n- DOB: ${dob}\n- Phone: ${phone}\n\nWe will contact you shortly for the next steps.`);
        
        // Reset form
        admissionForm.reset();
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
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
    
    // Format CNIC input
    const cnicInput = document.getElementById('cnic');
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
    
    // Format phone input
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        if (value.length > 4) {
            value = value.substring(0, 4) + '-' + value.substring(4);
        }
        
        e.target.value = value;
    });
});
