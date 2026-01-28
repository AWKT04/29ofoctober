const observerOptions = {
    threshold: 0.2, // Se activa cuando el 20% del elemento es visible
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Lógica especial para los titulares pop-up
            if (entry.target.classList.contains('headlines-container')) {
                const pops = entry.target.querySelectorAll('.headline-pop');
                pops.forEach((pop, index) => {
                    setTimeout(() => {
                        pop.classList.add('visible');
                    }, index * 800); // Retraso escalonado (800ms entre cada uno)
                });
            }
            
            // Lógica para las fotos de voluntarios (collage)
            if (entry.target.classList.contains('collage')) {
               // Ya manejado por la clase vol-img abajo
            }
        }
    });
}, observerOptions);

// Seleccionar elementos a animar
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .headlines-container').forEach(el => {
    observer.observe(el);
});

// Observador específico para imágenes del collage (para que salgan una a una)
const collageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.vol-img').forEach(img => {
    collageObserver.observe(img);
});


// 2. EFECTO DE BARRO (MUD SCROLL)
const mudLayer = document.getElementById('mud-layer');
const section2000 = document.getElementById('section-2000');
const sectionHope = document.getElementById('hope');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Intensidad del barro basada en el scroll
    // Aumenta a medida que bajamos, llega al máximo en la sección 20:00
    
    // Calculamos posición relativa
    let intensity = Math.min(scrollY / (windowHeight * 2), 1);
    
    // Modificar el gradiente dinámicamente
    // Expandimos los círculos del gradiente para que cubran más pantalla
    const size = 15 + (intensity * 40); // Empieza en 15%, crece hasta 55%
    
    mudLayer.style.background = `
        radial-gradient(circle at 0% 0%, var(--color-mud) ${size/2}%, transparent ${size}%),
        radial-gradient(circle at 100% 0%, var(--color-mud) ${size/2}%, transparent ${size}%),
        radial-gradient(circle at 0% 100%, var(--color-mud) ${size/2}%, transparent ${size}%),
        radial-gradient(circle at 100% 100%, var(--color-mud) ${size/2}%, transparent ${size}%)
    `;

    // DETECTAR EL FINAL (LIMPIEZA)
    // Cuando llegamos a la sección HOPE, el barro desaparece
    const hopeRect = sectionHope.getBoundingClientRect();
    
    if (hopeRect.top < windowHeight / 1.5) {
        mudLayer.style.opacity = '0'; // Desvanece el barro
        mudLayer.style.transform = 'translateY(100%)'; // Lo mueve hacia abajo (como si se limpiara)
    } else {
        mudLayer.style.opacity = '0.9';
        mudLayer.style.transform = 'translateY(0)';
    }
});
