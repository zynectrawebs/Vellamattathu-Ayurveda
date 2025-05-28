// Main JavaScript file for Vellamattathu Ayurveda Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default behavior
            e.stopPropagation(); // Stop event propagation
            navMenu.classList.toggle('active');
            // Toggle between menu and close icon
            const isOpen = navMenu.classList.contains('active');
            mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active') && !event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
    
    // Hero Slideshow
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    if (heroSlides.length > 0) {
        // Set first slide as active
        heroSlides[0].classList.add('active');
        
        // Function to change slide
        function nextSlide() {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }
        
        // Auto change slide every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Treatment Read More Toggle
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const fullDescription = this.closest('.treatment-content').querySelector('.treatment-full-description');
            
            if (fullDescription) {
                if (fullDescription.style.display === 'block') {
                    fullDescription.style.display = 'none';
                    this.textContent = 'Read More';
                } else {
                    fullDescription.style.display = 'block';
                    this.textContent = 'Read Less';
                }
            }
        });
    });
    
    // Form Validation
    const contactForm = document.getElementById('contact-form');
    const appointmentForm = document.getElementById('appointment-form');
    
    // Contact Form Validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Clear previous error messages
            clearErrors();
            
            // Validate name
            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (email.value.trim() === '') {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate subject
            if (subject.value.trim() === '') {
                showError(subject, 'Subject is required');
                isValid = false;
            }
            
            // Validate message
            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
            } else {
                // For demo purposes - normally this would submit to a server
                e.preventDefault();
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
    
    // Appointment Form Validation
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Get form fields
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            const doctor = document.getElementById('doctor');
            const time = document.getElementById('time');
            
            // Clear previous error messages
            clearErrors();
            
            // Validate name
            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            // Validate phone
            if (phone.value.trim() === '') {
                showError(phone, 'Phone is required');
                isValid = false;
            } else if (!isValidPhone(phone.value)) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate email
            if (email.value.trim() === '') {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate doctor selection
            if (doctor.value === '') {
                showError(doctor, 'Please select a doctor');
                isValid = false;
            }
            
            // Validate time selection
            if (time.value === '') {
                showError(time, 'Please select a time');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
            } else {
                // For demo purposes - normally this would submit to a server
                e.preventDefault();
                alert('Thank you for booking an appointment! We will confirm shortly.');
                appointmentForm.reset();
            }
        });
    }
    
    // Helper Functions
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const error = document.createElement('div');
        error.className = 'form-error';
        error.textContent = message;
        formGroup.appendChild(error);
        input.classList.add('error-input');
    }
    
    function clearErrors() {
        document.querySelectorAll('.form-error').forEach(error => error.remove());
        document.querySelectorAll('.error-input').forEach(input => input.classList.remove('error-input'));
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        const re = /^[\d\s\+\-\(\)]{10,15}$/;
        return re.test(phone);
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        if (mobileMenuBtn) {
                            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                        }
                    }
                }
            }
        });
    });
});