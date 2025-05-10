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
    
   // Dans votre fichier main.js
        const scheduleData = {
            lundi: [
                { time: '07:00 - 08:00', class: 'HIIT', coach: 'Sophie' },
                { time: '12:00 - 13:00', class: 'Yoga', coach: 'Thomas' },
                { time: '18:00 - 19:00', class: 'CrossFit', coach: 'Alex' }
            ],
            mardi: [
                { time: '07:30 - 08:30', class: 'Pilates', coach: 'Emma' },
                { time: '17:30 - 18:30', class: 'Boxe', coach: 'Karim' }
            ],
            mercredi: [
                { time: '08:00 - 09:00', class: 'Yoga', coach: 'Thomas' },
                { time: '18:30 - 19:30', class: 'HIIT', coach: 'Sophie' }
            ],
            jeudi: [
                { time: '07:00 - 08:00', class: 'CrossFit', coach: 'Alex' },
                { time: '12:30 - 13:30', class: 'Pilates', coach: 'Emma' }
            ],
            vendredi: [
                { time: '09:00 - 10:00', class: 'Boxe', coach: 'Karim' },
                { time: '17:00 - 18:00', class: 'Yoga', coach: 'Thomas' }
            ]
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

    // Gestion de la navigation active
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href').substring(1) === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Mode sombre
    function initThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        const root = document.documentElement;
        
        // Définition des thèmes
        const themes = {
            light: {
                'bg-color': '#FFFFFF',
                'text-color': '#212529',
                'heading-color': '#1A2C3D',
                'surface-color': '#FFFFFF',
                'border-color': '#ddd',
                'shadow-color': 'rgba(0, 0, 0, 0.1)',
                'overlay-color': 'rgba(255, 255, 255, 0.98)',
                'muted-color': '#6C757D'
            },
            dark: {
                'bg-color': '#1A1A1A',
                'text-color': '#FFFFFF',
                'heading-color': '#FFFFFF',
                'surface-color': '#2A2A2A',
                'border-color': '#404040',
                'shadow-color': 'rgba(0, 0, 0, 0.3)',
                'overlay-color': 'rgba(26, 26, 26, 0.98)',
                'muted-color': '#9CA3AF'
            }
        };

        // Fonction pour appliquer le thème
        function applyTheme(isDark) {
            const theme = isDark ? themes.dark : themes.light;
            
            // Appliquer chaque couleur
            Object.entries(theme).forEach(([key, value]) => {
                root.style.setProperty(`--${key}`, value);
            });

            // Mettre à jour l'icône
            const icon = themeToggle.querySelector('i');
            if (isDark) {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }

            // Sauvegarder le thème
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }

        // Initialiser le thème
        const savedTheme = localStorage.getItem('theme') === 'dark';
        applyTheme(savedTheme);

        // Gérer le clic sur le bouton
        themeToggle.addEventListener('click', () => {
            const isDark = localStorage.getItem('theme') === 'dark';
            applyTheme(!isDark);
        });
    }
    
    initThemeToggle();

    // Menu mobile amélioré
    // const menuToggle = document.querySelector('.menu-toggle');
    const navRight = document.querySelector('.nav-right');

    if (menuToggle && navRight) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navRight.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Fermer le menu mobile lors du clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navRight.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Mettre à jour le lien actif au scroll
    window.addEventListener('scroll', updateActiveNavLink);
});