gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

window.smoother = ScrollSmoother.create({
    smooth: 1.5,
    effects: true
});

document.addEventListener('DOMContentLoaded', function () {
    // Preloader Animation
    const counterElement = document.getElementById("preloader-counter");
    const preloader = document.getElementById("preloader");

    if (preloader && counterElement) {
        let progress = { value: 0 };
        let countingTween = gsap.to(progress, {
            value: 80,
            duration: 3,
            ease: "power1.out",
            onUpdate: () => {
                counterElement.innerText = Math.round(progress.value) + "%";
            }
        });

        window.addEventListener("load", () => {
            countingTween.kill();
            let tl = gsap.timeline();
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
        });
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
