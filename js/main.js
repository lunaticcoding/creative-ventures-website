/**
 * Creative Ventures - Main JavaScript
 */

$(document).ready(function() {
    'use strict';

    // Set current year in footer
    $('#year').text(new Date().getFullYear());

    // Navigation scroll effect
    const $navbar = $('.navbar');
    const scrollThreshold = 50;

    function handleScroll() {
        if ($(window).scrollTop() > scrollThreshold) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    }

    $(window).on('scroll', handleScroll);
    handleScroll(); // Check initial state

    // Mobile menu toggle
    const $navToggle = $('.nav-toggle');
    const $navMenu = $('.nav-menu');

    $navToggle.on('click', function() {
        $(this).toggleClass('active');
        $navMenu.toggleClass('active');
    });

    // Close mobile menu when clicking a link
    $('.nav-link').on('click', function() {
        $navToggle.removeClass('active');
        $navMenu.removeClass('active');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $navToggle.removeClass('active');
            $navMenu.removeClass('active');
        }
    });

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 600);
        }
    });

    // Active nav link on scroll
    const sections = $('section[id]');
    const navLinks = $('.nav-link');

    function updateActiveNavLink() {
        const scrollPosition = $(window).scrollTop() + 100;

        sections.each(function() {
            const section = $(this);
            const sectionTop = section.offset().top;
            const sectionBottom = sectionTop + section.outerHeight();
            const sectionId = section.attr('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.removeClass('active');
                $(`.nav-link[href="#${sectionId}"]`).addClass('active');
            }
        });
    }

    $(window).on('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // Fade in animation on scroll
    function initFadeInAnimations() {
        const fadeElements = [
            '.section-header',
            '.portfolio-card',
            '.about-text',
            '.about-visual',
            '.contact-card'
        ];

        fadeElements.forEach(selector => {
            $(selector).addClass('fade-in');
        });

        function checkFadeIn() {
            $('.fade-in').each(function() {
                const element = $(this);
                const elementTop = element.offset().top;
                const elementBottom = elementTop + element.outerHeight();
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();

                // Check if element is in viewport
                if (elementBottom > viewportTop && elementTop < viewportBottom - 100) {
                    element.addClass('visible');
                }
            });
        }

        $(window).on('scroll', checkFadeIn);
        checkFadeIn(); // Check initial state
    }

    initFadeInAnimations();

    // Parallax effect for gradient orbs
    function initParallax() {
        const orbs = $('.gradient-orb');

        $(window).on('mousemove', function(e) {
            const mouseX = e.clientX / $(window).width();
            const mouseY = e.clientY / $(window).height();

            orbs.each(function(index) {
                const speed = (index + 1) * 10;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;

                $(this).css('transform', `translate(${x}px, ${y}px)`);
            });
        });
    }

    // Only enable parallax on desktop
    if ($(window).width() > 768) {
        initParallax();
    }

    // Portfolio card hover effects
    $('.portfolio-card').on('mouseenter', function() {
        $(this).find('.card-glow').css('opacity', '1');
    }).on('mouseleave', function() {
        $(this).find('.card-glow').css('opacity', '0');
    });

    // Add subtle tilt effect to portfolio cards
    if ($(window).width() > 768) {
        $('.portfolio-card').on('mousemove', function(e) {
            const card = $(this);
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`);
        }).on('mouseleave', function() {
            $(this).css('transform', 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)');
        });
    }

    // Button ripple effect
    $('.btn').on('click', function(e) {
        const button = $(this);
        const ripple = $('<span class="ripple"></span>');

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.css({
            left: x + 'px',
            top: y + 'px'
        });

        button.append(ripple);

        setTimeout(() => ripple.remove(), 600);
    });

    // Add ripple styles dynamically
    $('<style>')
        .text(`
            .btn {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes rippleEffect {
                to {
                    transform: translate(-50%, -50%) scale(20);
                    opacity: 0;
                }
            }
        `)
        .appendTo('head');

    // Preloader (optional - uncomment if needed)
    // $(window).on('load', function() {
    //     $('.preloader').fadeOut(500);
    // });

    // Console Easter egg
    console.log(
        '%c Creative Ventures ',
        'background: linear-gradient(135deg, #a880ff 0%, #ff80bf 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;'
    );
    console.log('Building apps that matter. 🚀');
});