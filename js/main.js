/**
 * Portfolio Website JavaScript
 * Handles mobile navigation and accessibility features
 */

// Mobile Menu Toggle Functionality
class MobileMenu {
    constructor() {
        this.toggleButton = document.querySelector('.mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.isOpen = false;

        this.init();
    }

    init() {
        if (this.toggleButton && this.navMenu) {
            this.toggleButton.addEventListener('click', () => this.toggleMenu());
            this.addKeyboardSupport();
            this.addClickOutsideSupport();
        }
    }

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.updateMenuState();
    }

    updateMenuState() {
        // Update ARIA attributes
        this.toggleButton.setAttribute('aria-expanded', this.isOpen);

        // Update menu visibility
        if (this.isOpen) {
            this.navMenu.classList.add('is-open');
        } else {
            this.navMenu.classList.remove('is-open');
        }
    }

    addKeyboardSupport() {
        // Close menu on Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.isOpen) {
                this.toggleMenu();
            }
        });

        // Close menu when focus moves outside
        document.addEventListener('focusin', (event) => {
            if (this.isOpen && !this.navMenu.contains(event.target) && event.target !== this.toggleButton) {
                this.toggleMenu();
            }
        });
    }

    addClickOutsideSupport() {
        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (this.isOpen &&
                !this.navMenu.contains(event.target) &&
                event.target !== this.toggleButton) {
                this.toggleMenu();
            }
        });
    }
}

// Smooth Scrolling for Anchor Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Handle smooth scrolling for same-page anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (event) => {
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    event.preventDefault();
                    this.scrollToElement(targetElement);
                }
            });
        });
    }

    scrollToElement(element) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Accessibility Enhancements
class AccessibilityEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceFocusVisibility();
        this.addLiveRegionSupport();
    }

    enhanceFocusVisibility() {
        // Ensure focus is visible on keyboard navigation
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    addLiveRegionSupport() {
        // Create a live region for dynamic content announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);

        this.liveRegion = liveRegion;
    }

    announce(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
            // Clear after announcement
            setTimeout(() => {
                this.liveRegion.textContent = '';
            }, 1000);
        }
    }
}

// Performance and Loading Optimizations
class PerformanceOptimizations {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.addLoadingStates();
    }

    lazyLoadImages() {
        // Simple lazy loading for images (can be enhanced with Intersection Observer)
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    addLoadingStates() {
        // Add loading states for interactive elements
        const buttons = document.querySelectorAll('.cta-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                if (!button.disabled) {
                    button.classList.add('loading');
                    button.setAttribute('aria-disabled', 'true');

                    // Remove loading state after action (simulate async operation)
                    setTimeout(() => {
                        button.classList.remove('loading');
                        button.removeAttribute('aria-disabled');
                    }, 1000);
                }
            });
        });
    }
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu
    new MobileMenu();

    // Initialize smooth scrolling
    new SmoothScroll();

    // Initialize accessibility enhancements
    new AccessibilityEnhancements();

    // Initialize performance optimizations
    new PerformanceOptimizations();

    // Announce page load for screen readers
    const accessibility = new AccessibilityEnhancements();
    accessibility.announce('Portfolio homepage loaded successfully');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause non-essential operations
        console.log('Page hidden - pausing operations');
    } else {
        // Page is visible again, resume operations
        console.log('Page visible - resuming operations');
    }
});