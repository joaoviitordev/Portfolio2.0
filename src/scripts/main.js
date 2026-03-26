document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.header__hamburger');
    const menu = document.querySelector('.header__nav');
    const links = document.querySelectorAll('.header__menu a');

    if (hamburger && menu) {
        hamburger.addEventListener('click', function () {
            const isOpen = menu.classList.toggle('open');

            // GSAP stagger animation for links when opening on mobile
            if (isOpen && window.innerWidth <= 440 && window.gsap) {
                gsap.fromTo(links,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.2 }
                );
            }
        });
    }

    // Smooth Scroll for navigation links
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');

            if (menu.classList.contains('open')) {
                menu.classList.remove('open');
            }

            if (window.smoother && target.startsWith('#')) {
                window.smoother.scrollTo(target, true);
            } else if (target.startsWith('#')) {
                document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Back to Top Button Logic
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if(window.ScrollTrigger) {
            // Show/Hide button when reaching the footer
            ScrollTrigger.create({
                trigger: ".footer",
                start: "top 80%",
                onEnter: () => backToTop.classList.add('visible'),
                onLeaveBack: () => backToTop.classList.remove('visible')
            });
        }

        backToTop.addEventListener('click', () => {
            if (window.smoother) {
                window.smoother.scrollTo("#hero", true);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
});
