/*
  File: script.js
  Description: Handles all interactivity for the NETD4TE promotional website.
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Dark Mode Toggle ---
    const darkModeToggles = document.querySelectorAll('#darkModeToggleDesktop, #darkModeToggleMobile');
    const themeIcons = document.querySelectorAll('#theme-icon-desktop, #theme-icon-mobile');
    const sunIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
    const moonIcon = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;

    const applyTheme = (isDark) => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            themeIcons.forEach(icon => icon.innerHTML = sunIcon);
        } else {
            document.documentElement.classList.remove('dark');
            themeIcons.forEach(icon => icon.innerHTML = moonIcon);
        }
    };

    // Check for saved theme preference
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    applyTheme(isDarkMode);

    darkModeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isCurrentlyDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('theme', isCurrentlyDark ? 'light' : 'dark');
            applyTheme(!isCurrentlyDark);
        });
    });

    // --- Mobile Drawer Menu ---
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const drawerMenu = document.getElementById('drawer-menu');

    if (menuBtn && drawerMenu && closeMenuBtn) {
        menuBtn.addEventListener('click', () => {
            drawerMenu.classList.remove('translate-x-full');
        });

        closeMenuBtn.addEventListener('click', () => {
            drawerMenu.classList.add('translate-x-full');
        });
    }

    // --- Download Modal ---
    const downloadBtns = document.querySelectorAll('#downloadBtnDesktop, #downloadBtnMobile');
    const downloadModal = document.getElementById('downloadModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (downloadModal) {
         downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                downloadModal.classList.remove('hidden');
            });
        });

        closeModalBtn.addEventListener('click', () => {
            downloadModal.classList.add('hidden');
        });

        // Close modal when clicking outside of it
        downloadModal.addEventListener('click', (e) => {
            if (e.target === downloadModal) {
                downloadModal.classList.add('hidden');
            }
        });
    }
   

    // --- Screenshot Carousel ---
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        const cards = Array.from(carousel.querySelectorAll('.carousel-card'));
        const prevBtn = carousel.querySelector('.carousel-nav.prev');
        const nextBtn = carousel.querySelector('.carousel-nav.next');
        let currentIndex = Math.floor(cards.length / 2); // Start with the middle card

        const updateCarousel = () => {
            cards.forEach((card, index) => {
                const pos = index - currentIndex;
                card.dataset.pos = pos;
            });
        };

        const moveCarousel = (direction) => {
            currentIndex += direction;
            if (currentIndex < 0) {
                currentIndex = cards.length - 1;
            } else if (currentIndex >= cards.length) {
                currentIndex = 0;
            }
            updateCarousel();
        };

        prevBtn.addEventListener('click', () => moveCarousel(-1));
        nextBtn.addEventListener('click', () => moveCarousel(1));
        
        // Allow clicking on side cards to navigate
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const pos = parseInt(card.dataset.pos);
                if (pos !== 0) {
                    moveCarousel(pos > 0 ? 1 : -1);
                }
            });
        });

        // Initialize carousel
        updateCarousel();
    }
});
