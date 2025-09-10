document.addEventListener('DOMContentLoaded', () => {

    const portfolioCategories = document.querySelector('.portfolio-categories');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const featuredProjectsGrid = document.querySelector('#featured-projects .portfolio-grid');

    // Removed portfolioItems array and related functions for dynamic generation
    // const portfolioItems = [
    //     {
    //         category: 'residential',
    //         title: 'Modern Family Home',
    //         image: 'https://via.placeholder.com/300x200/FF0000/FFFFFF?text=Residential+Project',
    //         description: 'A modern family home with open-plan living, spacious bedrooms, and a modern kitchen.',
    //         beforeAfterImage: true,
    //         beforeImage: 'https://via.placeholder.com/600x400/CCCCCC/FFFFFF?text=Before+Residential',
    //         afterImage: 'https://via.placeholder.com/600x400/FF0000/FFFFFF?text=After+Residential'
    //     },
    //     {
    //         category: 'commercial',
    //         title: 'Office Space Redesign',
    //         image: 'https://via.placeholder.com/300x200/000080/FFFFFF?text=Commercial+Project',
    //         description: 'A sleek and functional office space that maximizes space and promotes collaboration.',
    //         beforeAfterImage: false
    //     },
    //     {
    //         category: 'luxury-interiors',
    //         title: 'Elegant Living Room',
    //         image: 'https://via.placeholder.com/300x200/8B0000/FFFFFF?text=Luxury+Interior',
    //         description: 'An elegant living room with a sophisticated color palette and luxurious finishes.',
    //         beforeAfterImage: true,
    //         beforeImage: 'https://via.placeholder.com/600x400/CCCCCC/FFFFFF?text=Before+LivingRoom',
    //         afterImage: 'https://via.placeholder.com/600x400/8B0000/FFFFFF?text=After+LivingRoom'
    //     },
    //     {
    //         category: 'residential',
    //         title: 'Luxury Villa',
    //         image: 'https://via.placeholder.com/300x200/FF0000/FFFFFF?text=Residential+Project+2',
    //         description: 'A luxurious villa with a modern design, spacious interiors, and breathtaking views.',
    //         beforeAfterImage: false
    //     },
    //     {
    //         category: 'commercial',
    //         title: 'Retail Store Fit-out',
    //         image: 'https://via.placeholder.com/300x200/000080/FFFFFF?text=Commercial+Project+2',
    //         description: 'A retail store fit-out that combines functionality with a modern and inviting atmosphere.',
    //         beforeAfterImage: true,
    //         beforeImage: 'https://via.placeholder.com/600x400/CCCCCC/FFFFFF?text=Before+Retail',
    //         afterImage: 'https://via.placeholder.com/600x400/000080/FFFFFF?text=After+Retail'
    //     },
    //     {
    //         category: 'luxury-interiors',
    //         title: 'High-end Bedroom',
    //         image: 'https://via.placeholder.com/300x200/8B0000/FFFFFF?text=Luxury+Interior+2',
    //         description: 'A high-end bedroom with a luxurious design, comfortable layout, and premium materials.',
    //         beforeAfterImage: false
    //     }
    // ];

    // Removed renderPortfolioItems function as portfolio items are now static in HTML.
    // function renderPortfolioItems(targetGrid, itemsToRender) {
    //     targetGrid.innerHTML = '';
    //     itemsToRender.forEach(item => {
    //         const portfolioItemDiv = document.createElement('div');
    //         portfolioItemDiv.classList.add('portfolio-item');
    //         portfolioItemDiv.innerHTML = `
    //             <img src="${item.image}" alt="${item.title} - Afric Luxury Interiors & Construction">
    //             <h3>${item.title}</h3>
    //             <p class="portfolio-description">A brief description of the ${item.title.toLowerCase()} project, highlighting key design elements and challenges overcome.</p>
    //             <!-- Placeholder for Before/After if available -->
    //             ${item.beforeAfterImage ? `<a href="#" class="btn portfolio-btn" data-before="${item.beforeImage}" data-after="${item.afterImage}" data-title="${item.title}">View Before & After</a>` : ''}
    //         `;
    //         portfolioItemDiv.querySelector('img').classList.add('lazy-load'); // Add lazy-load class to portfolio images
    //         targetGrid.appendChild(portfolioItemDiv);
    //     });
    // }

    // Removed dynamic loading calls for portfolio items as they are now static in HTML.
    // if (portfolioGrid) {
    //     renderPortfolioItems(portfolioGrid, portfolioItems);
    // }

    // if (featuredProjectsGrid) {
    //     const featuredItems = portfolioItems.slice(0, 3); // Show first 3 projects
    //     renderPortfolioItems(featuredProjectsGrid, featuredItems);
    // }

    // Event listener for category buttons (removed as filtering is now handled by static HTML/CSS or not needed)
    if (portfolioCategories) {
        portfolioCategories.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                const filterCategory = e.target.dataset.category;
                const portfolioCards = document.querySelectorAll('#portfolio .portfolio-item');
                const galleryItemsNew = document.querySelectorAll('#portfolio .gallery-item');
                const targets = portfolioCards.length ? portfolioCards : galleryItemsNew;
                targets.forEach(item => {
                    if (filterCategory === 'all' || item.dataset.category === filterCategory) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    }

    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
        portfolioSection.classList.add('is-visible');
    }

    // Lazy Loading Images and Backgrounds
    const lazyLoadTargets = document.querySelectorAll('.lazy-load, .parallax-bg[data-bg-image], .hero-video-background');

    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                if (target.tagName === 'IMG' && target.dataset.src) {
                    target.src = target.dataset.src;
                    target.onload = () => target.classList.remove('lazy-load'); // Remove class after load
                } else if (target.classList.contains('parallax-bg') && target.dataset.bgImage) {
                    target.style.backgroundImage = `url('${target.dataset.bgImage}')`;
                } else if (target.tagName === 'VIDEO' && target.dataset.src) {
                    const sourceMp4 = target.querySelector('source[type="video/mp4"]');
                    const sourceWebm = target.querySelector('source[type="video/webm"]');
                    if (sourceMp4) sourceMp4.src = target.dataset.src;
                    if (sourceWebm) sourceWebm.src = target.dataset.webm; // Load webm source if available
                    target.load();
                }
                observer.unobserve(target);
            }
        });
    }, {
        rootMargin: '0px 0px 100px 0px',
        threshold: 0.01
    });

    lazyLoadTargets.forEach(target => {
        lazyLoadObserver.observe(target);
    });

    // Simple scroll animation for sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // For text elements, add textFadeIn as well
                const textElements = entry.target.querySelectorAll('p, h1, h2, h3, h4, h5, h6, strong, span, li');
                textElements.forEach((textEl, index) => {
                    textEl.style.animationDelay = `${index * 0.1}s`;
                    // textEl.classList.add('textFadeIn'); // Removed as fadeInUp already handles text animation
                });
                observer.unobserve(entry.target);
            } else {
                // Optional: Remove is-visible and textFadeIn when out of view to allow re-animation
                entry.target.classList.remove('is-visible');
                const textElements = entry.target.querySelectorAll('p, h1, h2, h3, h4, h5, h6, strong, span, li');
                textElements.forEach(textEl => {
                    // textEl.classList.remove('textFadeIn'); // Removed as fadeInUp already handles text animation
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Our Process Timeline Animation (re-using general section observer)
    // Removed dedicated timeline observer, using the general section observer instead.
    // No changes needed for timeline items as they already have .is-visible class logic handled by the main observer.

    // Client/Partnership Showcase Animation (re-using general section observer)
    const clientsSection = document.getElementById('clients');
    if (clientsSection) {
        const clientLogos = document.querySelectorAll('.client-logo img'); // Target images directly
        clientLogos.forEach(logo => {
            logo.classList.add('lazy-load'); // Add lazy-load class for client logos
            lazyLoadObserver.observe(logo);
        });
    }

    // Animated Statistics Counters
    const statisticsSection = document.getElementById('statistics');
    if (statisticsSection) {
        const counters = document.querySelectorAll('.statistic-item .counter');
        const speed = 200; // The lower the speed, the faster the count

        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const updateCount = () => {
                const count = +counter.innerText;
                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 1); // Adjust speed of animation
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        };

        const statisticsObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the section is visible
        };

        const statisticsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(animateCounter);
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, statisticsObserverOptions);

        statisticsObserver.observe(statisticsSection);
    }

    // Dynamic header on scroll
    const header = document.querySelector('header');
    const setHeaderSpace = () => {
        if (!header) return;
        const headerHeight = header.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--header-space', `${Math.ceil(headerHeight)}px`);
    };
    setHeaderSpace();
    window.addEventListener('resize', setHeaderSpace, { passive: true });
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // Progress Bar on Scroll
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        });
    }

    // Custom cursor and micro-interactions
    // Conditionally create custom cursor for desktop only
    if (window.innerWidth > 992) {
        const customCursor = document.createElement('div');
        customCursor.classList.add('custom-cursor');
        document.body.appendChild(customCursor);

        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = `${e.clientX}px`;
            customCursor.style.top = `${e.clientY}px`;
        });

        const interactiveElements = document.querySelectorAll('button, .btn, a, .category-btn, .team-member, .service-item, .portfolio-item, .social-links a');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseover', () => {
                customCursor.classList.add('hovered');
            });
            element.addEventListener('mouseout', () => {
                customCursor.classList.remove('hovered');
            });
        });
    }

    // Back to Top button functionality (dynamic visibility)
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        const toggleBackToTop = () => {
            if (window.scrollY > 150) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        };

        // Initial state
        toggleBackToTop();

        // Listen for scroll
        window.addEventListener('scroll', toggleBackToTop, { passive: true });

        // Smooth scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact form UX: simple toast on submit (no backend)
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const sendOptions = document.getElementById('sendOptions');
    const closeSendOptions = document.getElementById('closeSendOptions');
    const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');
    const sendEmailBtn = document.getElementById('sendEmailBtn');
    if (contactForm) {
        const gatherPayload = () => {
            const formData = new FormData(contactForm);
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const phone = formData.get('phone') || '';
            const service = formData.get('service') || '';
            const message = formData.get('message') || '';
            return { name, email, phone, service, message };
        };

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Open send options modal
            if (sendOptions) sendOptions.style.display = 'block';
        });

        closeSendOptions && closeSendOptions.addEventListener('click', () => {
            sendOptions.style.display = 'none';
        });

        // WhatsApp flow
        sendWhatsAppBtn && sendWhatsAppBtn.addEventListener('click', () => {
            const { name, email, phone, service, message } = gatherPayload();
            const text = `Hello Afric Luxury,%0A%0AMy Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
            const waUrl = `https://wa.me/254790274288?text=${text}`;
            window.open(waUrl, '_blank');
            sendOptions.style.display = 'none';
            contactForm.reset();
            if (toast) { toast.textContent = 'Opening WhatsApp…'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2500); }
        });

        // Email flow - opens mail client
        sendEmailBtn && sendEmailBtn.addEventListener('click', () => {
            const { name, email, phone, service, message } = gatherPayload();
            const subject = encodeURIComponent(`New Inquiry – ${service || 'General'}`);
            const body = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AService: ${service}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
            const mailto = `mailto:info@africluxuryinteriors.co.ke?subject=${subject}&body=${body}`;
            window.location.href = mailto;
            sendOptions.style.display = 'none';
            contactForm.reset();
            if (toast) { toast.textContent = 'Opening email client…'; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2500); }
        });

        // Close modal by clicking outside
        sendOptions && sendOptions.addEventListener('click', (e) => {
            if (e.target === sendOptions) sendOptions.style.display = 'none';
        });
    }

    // Hamburger menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) {
        const setMenuState = (isOpen) => {
            hamburgerMenu.classList.toggle('active', isOpen);
            navLinks.classList.toggle('active', isOpen);
            hamburgerMenu.setAttribute('aria-expanded', String(isOpen));
            hamburgerMenu.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
            document.body.classList.toggle('menu-open', isOpen);
            if (isOpen) {
                // Move focus to first link for accessibility
                const firstLink = navLinks.querySelector('a');
                if (firstLink) firstLink.focus();
            }
        };

        hamburgerMenu.addEventListener('click', () => {
            const isOpen = !hamburgerMenu.classList.contains('active');
            setMenuState(isOpen);
        });

        // Close on Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hamburgerMenu.classList.contains('active')) {
                setMenuState(false);
                hamburgerMenu.focus();
            }
        });

        // Close menu when a link is clicked (for navigation)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenuState(false));
        });
    }

    // Highlight active navigation link
    const navLinksList = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop(); // Get current page filename

    navLinksList.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Pre-loader functionality
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Ensure the preloader fades out only after all critical resources are loaded
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
            preloader.addEventListener('transitionend', () => {
                preloader.remove();
            }, { once: true }); // Remove event listener after it fires once
        });
    }

    // Testimonials Carousel functionality
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    if (testimonialsCarousel) {
        const testimonialItems = testimonialsCarousel.querySelectorAll('.testimonial-item');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const paginationDots = document.querySelectorAll('.pagination-dots .dot');
        let currentIndex = 0;
        let intervalId;

        function showTestimonial(index) {
            testimonialItems.forEach((item, i) => {
                item.classList.remove('active');
                if (i === index) {
                    item.classList.add('active');
                }
            });
            paginationDots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
        }

        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            showTestimonial(currentIndex);
        }

        function prevTestimonial() {
            currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(currentIndex);
        }

        function startAutoplay() {
            intervalId = setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds
        }

        function stopAutoplay() {
            clearInterval(intervalId);
        }

        prevBtn.addEventListener('click', () => {
            stopAutoplay();
            prevTestimonial();
            startAutoplay();
        });

        nextBtn.addEventListener('click', () => {
            stopAutoplay();
            nextTestimonial();
            startAutoplay();
        });

        paginationDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoplay();
                currentIndex = index;
                showTestimonial(currentIndex);
                startAutoplay();
            });
        });

        // Initial display and autoplay start
        showTestimonial(currentIndex);
        startAutoplay();
    }

    // Image Slideshow functionality
    let slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        if (slides.length > 0) {
            slides[slideIndex-1].style.display = "block";
            if (dots.length > 0) {
                dots[slideIndex-1].className += " active";
            }
        }
    }

    // Automatic slideshow (optional, can be added later if desired)
    setInterval(() => {
        plusSlides(1);
    }, 5000); // Change image every 5 seconds

    // Unified Lightbox for Latest Works and Portfolio Card Images
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-image') : null;
    const lightboxCaption = lightbox ? lightbox.querySelector('.lightbox-caption') : null;
    const btnPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const btnNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;
    const btnClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

    // Build a flat list of clickable items with caption getters
    const latestFigures = Array.from(document.querySelectorAll('#latest-works .gallery-item'));
    const portfolioImgs = Array.from(document.querySelectorAll('#portfolio .portfolio-item img'));

    const lightboxItems = [
        ...latestFigures.map(fig => ({
            getSrc: () => (fig.querySelector('img') ? fig.querySelector('img').src : ''),
            // Suppress captions for Latest Works items as requested
            getCaption: () => ''
        })),
        ...portfolioImgs.map(img => ({
            getSrc: () => img.src,
            getCaption: () => {
                const card = img.closest('.portfolio-item');
                const title = card ? card.querySelector('h3') : null;
                return title ? title.textContent.trim() : '';
            }
        }))
    ];

    let currentIdx = 0;

    const openLightboxByIndex = (idx) => {
        if (!lightbox || !lightboxImg || !lightboxItems.length) return;
        const item = lightboxItems[idx];
        if (!item) return;
        lightboxImg.src = item.getSrc();
        if (lightboxCaption) lightboxCaption.textContent = item.getCaption();
        currentIdx = idx;
        lightbox.classList.add('show');
        document.body.classList.add('menu-open');
        lightbox.setAttribute('aria-hidden', 'false');
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('show');
        document.body.classList.remove('menu-open');
        lightbox.setAttribute('aria-hidden', 'true');
    };

    const navLightbox = (delta) => {
        const total = lightboxItems.length;
        if (!total) return;
        currentIdx = (currentIdx + delta + total) % total;
        openLightboxByIndex(currentIdx);
    };

    if (lightbox && lightboxItems.length) {
        // Click bindings: latest figures
        latestFigures.forEach((fig, idx) => {
            fig.addEventListener('click', () => openLightboxByIndex(idx));
        });
        // Click bindings: portfolio card images
        portfolioImgs.forEach((img, pIdx) => {
            const idx = latestFigures.length + pIdx;
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => openLightboxByIndex(idx));
        });

        btnClose && btnClose.addEventListener('click', closeLightbox);
        btnPrev && btnPrev.addEventListener('click', () => navLightbox(-1));
        btnNext && btnNext.addEventListener('click', () => navLightbox(1));
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('show')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navLightbox(-1);
            if (e.key === 'ArrowRight') navLightbox(1);
        });
    }

});