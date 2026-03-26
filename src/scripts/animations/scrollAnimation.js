// Registration with safety checks for paid plugins
const plugins = [ScrollTrigger];
if (typeof ScrollSmoother !== 'undefined') plugins.push(ScrollSmoother);
if (typeof SplitText !== 'undefined') plugins.push(SplitText);

if (window.gsap) {
    gsap.registerPlugin(...plugins);

    if (typeof ScrollSmoother !== 'undefined') {
        window.smoother = ScrollSmoother.create({
            smooth: 1.5,
            effects: true,
            smoothTouch: 0.1 // Better for mobile
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Preloader Animation
    const counterElement = document.getElementById("preloader-counter");
    const preloader = document.getElementById("preloader");

    if (preloader && counterElement && window.gsap) {
        let progress = { value: 0 };
        let countingTween = gsap.to(progress, {
            value: 80,
            duration: 3,
            ease: "power1.out",
            onUpdate: () => {
                counterElement.innerText = Math.round(progress.value) + "%";
            }
        });

        const hidePreloader = (tl) => {
            tl.to(progress, {
                value: 100,
                duration: 0.6,
                ease: "power2.inOut",
                onUpdate: () => {
                    counterElement.innerText = Math.round(progress.value) + "%";
                }
            })
            .to(preloader, {
                yPercent: -100,
                duration: 1,
                ease: "power4.inOut",
                onComplete: () => preloader.style.display = 'none'
            }, "+=0.2");
        };

        window.addEventListener("load", () => {
            countingTween.kill();
            let tl = gsap.timeline();
            hidePreloader(tl);
        });

        // Safety timeout to hide preloader if window.load takes too long
        setTimeout(() => {
            if (preloader.style.display !== 'none') {
                countingTween.kill();
                let tl = gsap.timeline();
                hidePreloader(tl);
            }
        }, 5000);
    } else if (preloader) {
        // Fallback hide if GSAP is missing
        preloader.style.display = 'none';
    }

    // Footer ScrollTrigger Animation
    gsap.from("footer", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: "footer",
            start: "top bottom",
            end: "bottom bottom",
            scrub: true
        }
    });
});
