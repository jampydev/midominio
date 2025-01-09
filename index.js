



// Detectar si estamos en un dispositivo móvil
const isMobile = window.innerWidth <= 768;

// Variables de elementos
const loader = document.querySelector('.loader');
const iframe = document.querySelector('iframe');
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

// Función para ejecutar las animaciones
function animatePage() {
    // Ocultar inicialmente el iframe
    iframe.style.visibility = 'hidden';

    // Animación del loader
    gsap.to(loader, { opacity: 0, duration: 1, onComplete: () => loader.classList.add('hidden') });

    // Animaciones completas para todos los elementos cuando no estamos en móvil
    if (!isMobile) {
        // Animación de entrada para el header (deslizar desde arriba)
        gsap.from(header, { y: -100, opacity: 0, duration: 1, ease: 'power4.out' });

        // Animación de entrada para el iframe (deslizar desde la izquierda)
        gsap.from(iframe, { x: -200, opacity: 0, duration: 1, delay: 0.5, ease: 'power4.out' });

        // Animación de entrada para el footer (deslizar desde abajo)
        gsap.from(footer, { y: 100, opacity: 0, duration: 1, delay: 1, ease: 'power4.out' });

        // Animación de entrada para el contenido principal (desvanecer)
        gsap.from(main, { opacity: 0, duration: 1, delay: 1.5, ease: 'power4.out' });
    } else {
        // Para móviles, simplificamos la animación para no afectar el rendimiento
        gsap.set('.video-container', { opacity: 1, y: 0 });
        gsap.set('iframe', { x: 0, opacity: 1 });
        gsap.set('header', { y: 0, opacity: 1 });
        gsap.set('footer', { y: 0, opacity: 1 });
        gsap.set(main, { opacity: 1 });
    }

    // Mostrar el iframe solo después de que el loader se oculte
    gsap.to(loader, { opacity: 0, duration: 1, onComplete: () => {
        loader.classList.add('hidden');
        iframe.style.visibility = 'visible'; // Mostrar el iframe
    }});

    // Animación de paralaje (GSAP)
    const videoBackground = document.querySelector('.video-background');
    window.addEventListener('scroll', () => {
        if (!isMobile) {
            const offset = window.scrollY * 0.2;
            gsap.to(videoBackground, { y: offset, duration: 0.5 });
        }
    });

    // Animación para el iframe en hover (solo en escritorio)
    if (!isMobile) {
        iframe.addEventListener('mouseover', () => {
            gsap.to(iframe, { scale: 1.05, duration: 0.3, ease: 'power1.out' });
        });

        iframe.addEventListener('mouseout', () => {
            gsap.to(iframe, { scale: 1, duration: 0.3, ease: 'power1.in' });
        });
    }

    // Animación de salida cuando la página se va a salir
    document.querySelector('.exit-button').addEventListener('click', () => {
        gsap.to([header, main, footer], { opacity: 0, duration: 0.5, ease: 'power1.in' });
        gsap.to(iframe, { opacity: 0, scale: 0.9, duration: 0.5, delay: 0.2, ease: 'power1.in' });
        gsap.to(loader, { opacity: 1, duration: 1, onComplete: () => {
            // Reaparecer todos los elementos al hacer clic en el botón de salida
            gsap.to([header, main, footer, iframe], { opacity: 1, duration: 1, delay: 0.5, ease: 'power4.out' });
            iframe.style.visibility = 'visible'; // Asegura que el iframe se vea
        }});
    });
}

// Iniciar las animaciones cuando la página carga
window.addEventListener('load', animatePage);
