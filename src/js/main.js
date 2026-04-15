/* ==========================================================================
   Shvil Lavan - Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Header scroll effect ----------
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---------- Mobile menu ----------
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
        const isOpen = nav.classList.contains('open');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    function closeMenu() {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
    }

    // Close menu on link click
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on overlay click (clicking outside the nav)
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('open') &&
            !nav.contains(e.target) &&
            !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    // ---------- Nav dropdown ----------
    const navDropdown = document.getElementById('navDropdown');
    if (navDropdown) {
        const toggle = navDropdown.querySelector('.nav-dropdown-toggle');
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navDropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', navDropdown.classList.contains('open'));
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close dropdown when clicking a link inside it
        navDropdown.querySelectorAll('.nav-dropdown-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navDropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---------- Active page detection ----------
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .nav-dropdown-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.split('#')[0] === currentPage) {
            link.classList.add('active');
        }
        // Highlight dropdown toggle if a child route is active
        if (href === currentPage && link.closest('.nav-dropdown')) {
            const parentToggle = link.closest('.nav-dropdown').querySelector('.nav-dropdown-toggle');
            if (parentToggle) parentToggle.classList.add('active');
        }
    });

    // ---------- Smooth scroll for anchor links ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // ---------- Scroll-triggered fade-in animations ----------
    const fadeElements = document.querySelectorAll(
        '.service-card, .gallery-item-overlay, .route-card, .why-us-item, .contact-info-item'
    );

    fadeElements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeElements.forEach(el => observer.observe(el));

    // ---------- Active nav link on scroll ----------
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ---------- Form submission ----------
    const form = document.querySelector('.contact-form');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate phone
            const phone = form.querySelector('#phone');
            const phoneVal = phone.value.replace(/[-\s]/g, '');
            if (phoneVal.length < 9 || phoneVal.length > 13) {
                phone.focus();
                phone.style.borderColor = '#e74c3c';
                return;
            }
            phone.style.borderColor = '';

            // Disable button while submitting
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'שולח...';
            btn.disabled = true;

            // Submit via fetch to Netlify
            const formData = new FormData(form);
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(response => {
                if (response.ok) {
                    // Animate form out, show success
                    form.classList.add('submitted');
                    setTimeout(() => {
                        form.style.display = 'none';
                        formSuccess.classList.add('show');
                    }, 400);
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                alert('שגיאה בשליחת הטופס. אנא נסו שוב או שלחו הודעה בוואטסאפ.');
            });
        });
    }
});
