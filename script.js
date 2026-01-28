const observerOptions = { threshold: 0.15, rootMargin: "0px" };

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    if (entry.target.classList.contains('headlines-container')) {
        const pops = entry.target.querySelectorAll('.headline-pop');
        pops.forEach((pop, i) => {
          setTimeout(() => pop.classList.add('visible'), i * 900);
        });
    }
    }
});
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .headlines-container').forEach(el => {
observer.observe(el);
});

const collageObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
});
}, { threshold: 0.1 });

document.querySelectorAll('.vol-img').forEach(img => collageObserver.observe(img));

const mudLayer = document.getElementById('mud-layer');

window.addEventListener('scroll', () => {
const scrollY = window.scrollY;
const scrollThreshold = 1000;
const progress = Math.min(scrollY / scrollThreshold, 1);
const translateY = -100 + (progress * 100);
mudLayer.style.transform = `translateY(${translateY}%)`;
mudLayer.style.opacity = progress;
});



