// ============================================
// DENTALLYS — Scripts
// ============================================

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Hero fullscreen slider
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
let currentSlide = 0;
const totalSlides = heroSlides.length;

function changeHeroSlide(index) {
    currentSlide = index;
    heroSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    heroDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextHeroSlide() {
    changeHeroSlide((currentSlide + 1) % totalSlides);
}

// Auto-rotate hero slides every 5 seconds
setInterval(nextHeroSlide, 5000);

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// Antes/Depois Carousel
const carousel = document.getElementById('carousel');
const carouselDots = document.querySelectorAll('.carousel-dot');
let currentCarouselSlide = 0;
const totalCarouselSlides = 4;

function scrollCarousel(direction) {
    currentCarouselSlide = (currentCarouselSlide + direction + totalCarouselSlides) % totalCarouselSlides;
    goToSlide(currentCarouselSlide);
}

function goToSlide(index) {
    currentCarouselSlide = index;
    const item = carousel.querySelector('.carousel-item');
    if (!item) return;
    const itemWidth = item.offsetWidth + 32; // gap
    carousel.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
    carouselDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Update dots on scroll
carousel.addEventListener('scroll', () => {
    const item = carousel.querySelector('.carousel-item');
    if (!item) return;
    const itemWidth = item.offsetWidth + 32;
    const newIndex = Math.round(carousel.scrollLeft / itemWidth);
    if (newIndex !== currentCarouselSlide && newIndex >= 0 && newIndex < totalCarouselSlides) {
        currentCarouselSlide = newIndex;
        carouselDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentCarouselSlide);
        });
    }
});

// WhatsApp form
function sendToWhatsApp(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data').value;
    const mensagem = document.getElementById('mensagem').value;

    let texto = 'Ola! Vim pelo site da Dentallys e gostaria de agendar uma avaliacao.';
    texto += '%0A%0A*Nome:* ' + encodeURIComponent(nome);
    texto += '%0A*Telefone:* ' + encodeURIComponent(telefone);
    texto += '%0A*Servico:* ' + encodeURIComponent(servico);
    if (data) texto += '%0A*Melhor dia:* ' + encodeURIComponent(data);
    if (mensagem) texto += '%0A%0A*Mensagem:* ' + encodeURIComponent(mensagem);

    window.open('https://wa.me/5549999080777?text=' + texto, '_blank');
}

// Mobile menu toggle
function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.position = 'fixed';
    nav.style.top = '70px';
    nav.style.left = '0';
    nav.style.width = '100%';
    nav.style.flexDirection = 'column';
    nav.style.background = 'rgba(135, 154, 116, 0.98)';
    nav.style.padding = '2rem';
    nav.style.gap = '1.5rem';
    nav.style.backdropFilter = 'blur(20px)';
    nav.style.zIndex = '999';
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
