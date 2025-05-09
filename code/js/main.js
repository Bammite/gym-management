document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
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
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Schedule tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const scheduleDays = document.querySelectorAll('.schedule-day');
    
    // Sample schedule data (would normally come from backend)
    const scheduleData = {
        lundi: [
            { time: '07:00 - 08:00', class: 'HIIT', coach: 'Sophie' },
            { time: '12:00 - 13:00', class: 'Yoga', coach: 'Thomas' },
            { time: '18:00 - 19:00', class: 'CrossFit', coach: 'Alex' }
        ],
        mardi: [
            { time: '07:30 - 08:30', class: 'Pilates', coach: 'Emma' },
            { time: '17:30 - 18:30', class: 'Boxe', coach: 'Karim' }
        ]
        // Add other days...
    };
    
    function renderSchedule(day) {
        const dayContent = document.getElementById(day);
        if (!dayContent || !scheduleData[day]) return;
        
        let html = '<div class="schedule-header">';
        html += '<div>Heure</div><div>Cours</div><div>Coach</div></div>';
        
        scheduleData[day].forEach(item => {
            html += `
                <div class="schedule-item">
                    <div>${item.time}</div>
                    <div>${item.class}</div>
                    <div>${item.coach}</div>
                </div>
            `;
        });
        
        dayContent.innerHTML = html;
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const day = btn.dataset.day;
            // Hide all schedule days
            scheduleDays.forEach(dayEl => dayEl.classList.remove('active'));
            // Show selected day
            document.getElementById(day).classList.add('active');
            
            // Render schedule for selected day
            renderSchedule(day);
        });
    });
    
    // Initialize with first day
    if (tabBtns.length > 0) {
        tabBtns[0].click();
    }

    // Form submission
    const contactForm = document.getElementById('gymForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to a server
            alert('Merci pour votre message! Nous vous contacterons bientôt.');
            this.reset();
        });
    }

    // Scroll reveal animations
    const scrollElements = document.querySelectorAll('.about-card, .pricing-card, .schedule, .contact-info, .contact-form');
    
    const elementInView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight)
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('animated');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            }
        });
    };
    
    // Initialize scroll animations
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Trigger initial check
    handleScrollAnimation();
});