// ---------- BASE DE DATOS DE LIBROS (TRES LIBROS) ----------
const booksDatabase = [
    {
        id: "book1",
        title: "Elipsis suspendida/Clima semántico",
        date: "Año, 2025",
        genre: "Literatura",
        price: 300,
        description: "Novela de ficción y economía",
        cover: "https://picsum.photos/id/1015/400/600"
    },
    {
        id: "book2",
        title: "Orgint - Introducción al Paradigma Integral Más que humano",
        date: "Año, 2015",
        genre: "Literatura",
        price: 300,
        description: "Propuesta teórica para superar el tope trifásico económico-político-social.",
        cover: "https://picsum.photos/id/1018/400/600"
    },
    {
        id: "book3",
        title: "Exonomía de Traxión - Cimientos de un Mundo Integral",
        date: "Año, 2026",
        genre: "Literatura",
        price: 400,
        description: "Propuesta teórica para consolidar la civilización humana, mediante un sistema económico.",
        cover: "https://picsum.photos/id/104/400/600"
    }
];

// ---------- BASE DE DATOS DE CUENTOS POR CATEGORÍA ----------
const storiesDatabase = {
    mystery: [
        { id: "mys1", title: "La casa del espejo", date: "05/02/2024", genre: "Misterio", price: 120, description: "Un espejo antiguo guarda secretos que cambiarán la vida de quien lo mira.", cover: "https://picsum.photos/id/104/400/600" },
        { id: "mys2", title: "El código oculto", date: "18/03/2024", genre: "Misterio", price: 130, description: "Un manuscrito perdido revela una conspiración milenaria.", cover: "https://picsum.photos/id/105/400/600" },
        { id: "mys3", title: "La desaparición", date: "22/01/2024", genre: "Misterio", price: 110, description: "Un pueblo entero desaparece sin dejar rastro.", cover: "https://picsum.photos/id/106/400/600" }
    ],
    suspense: [
        { id: "sus1", title: "El vigilante", date: "10/02/2024", genre: "Suspenso", price: 125, description: "Alguien observa cada movimiento del protagonista desde las sombras.", cover: "https://picsum.photos/id/107/400/600" },
        { id: "sus2", title: "La última llamada", date: "25/03/2024", genre: "Suspenso", price: 115, description: "Una llamada telefónica cambiará el destino de toda una familia.", cover: "https://picsum.photos/id/108/400/600" },
        { id: "sus3", title: "Sin salida", date: "05/01/2024", genre: "Suspenso", price: 135, description: "Atrapado en un lugar sin escape, el tiempo corre en contra.", cover: "https://picsum.photos/id/109/400/600" }
    ],
    scifi: [
        { id: "sf1", title: "El último androide", date: "12/02/2024", genre: "Ciencia Ficción", price: 140, description: "En un mundo postapocalíptico, un androide busca su propósito.", cover: "https://picsum.photos/id/110/400/600" },
        { id: "sf2", title: "Realidad simulada", date: "28/03/2024", genre: "Ciencia Ficción", price: 145, description: "¿Estamos viviendo en una simulación?", cover: "https://picsum.photos/id/111/400/600" },
        { id: "sf3", title: "Viaje dimensional", date: "15/01/2024", genre: "Ciencia Ficción", price: 150, description: "Un científico logra viajar entre dimensiones alternas.", cover: "https://picsum.photos/id/112/400/600" }
    ],
    microfiction: [
        { id: "mic1", title: "El instante eterno", date: "01/03/2024", genre: "Minificción", price: 80, description: "Un segundo puede cambiar una vida.", cover: "https://picsum.photos/id/113/400/600" },
        { id: "mic2", title: "La última palabra", date: "20/02/2024", genre: "Minificción", price: 75, description: "Antes de morir, un hombre pronuncia una palabra que lo cambia todo.", cover: "https://picsum.photos/id/114/400/600" },
        { id: "mic3", title: "El beso", date: "10/03/2024", genre: "Minificción", price: 70, description: "Un beso robado en la oscuridad que perdura en la memoria.", cover: "https://picsum.photos/id/115/400/600" },
        { id: "mic4", title: "Reflejo", date: "05/03/2024", genre: "Minificción", price: 65, description: "Un espejo muestra más de lo que debería.", cover: "https://picsum.photos/id/116/400/600" }
    ]
};

// Libro/Cuento destacado
const featuredStory = {
    id: "featured1",
    title: "Mar Intangible",
    date: "año 2013",
    genre: "Literatura",
    price: 300,
    description: "19 cuentos completos",
    cover: "https://picsum.photos/id/104/600/400"
};

// Variables de estado
let currentScreen = 'main';
let previousScreen = 'main';
let currentSlide = 0;
let slides = [];
let dots = [];
let autoSlideInterval = null;

// Elementos DOM
const mainScreen = document.getElementById('main-screen');
const booksScreen = document.getElementById('books-screen');
const storiesCategoriesScreen = document.getElementById('stories-categories-screen');
const storiesGalleryScreen = document.getElementById('stories-gallery-screen');
const detailScreen = document.getElementById('detail-screen');
const modal = document.getElementById('fullscreen-modal');
const modalImg = document.getElementById('fullscreen-image');

// ========== FUNCIONES DE NAVEGACIÓN ==========
function showScreen(screenName) {
    mainScreen.classList.remove('active');
    booksScreen.classList.remove('active');
    storiesCategoriesScreen.classList.remove('active');
    storiesGalleryScreen.classList.remove('active');
    detailScreen.classList.remove('active');
    
    if (screenName === 'main') mainScreen.classList.add('active');
    if (screenName === 'books') booksScreen.classList.add('active');
    if (screenName === 'storiesCategories') storiesCategoriesScreen.classList.add('active');
    if (screenName === 'storiesGallery') storiesGalleryScreen.classList.add('active');
    if (screenName === 'detail') detailScreen.classList.add('active');
    
    currentScreen = screenName;
}

// ========== CARRUSEL - VERSIÓN CORREGIDA ==========
function initCarousel() {
    console.log('Inicializando carrusel...');
    
    slides = document.querySelectorAll('.carousel-slide');
    dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (slides.length === 0) {
        console.error('No se encontraron slides');
        return;
    }
    
    // Limpiar todas las clases activas
    slides.forEach(slide => slide.classList.remove('active-slide'));
    dots.forEach(dot => dot.classList.remove('active-dot'));
    
    // Activar el primer slide
    slides[0].classList.add('active-slide');
    if (dots[0]) dots[0].classList.add('active-dot');
    
    currentSlide = 0;
    
    // Eventos para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Eventos para los botones
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }
    
    startAutoSlide();
    console.log('Carrusel inicializado correctamente');
}

function updateCarousel() {
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active-slide');
        } else {
            slide.classList.remove('active-slide');
        }
    });
    
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active-dot');
        } else {
            dot.classList.remove('active-dot');
        }
    });
}

function nextSlide() {
    if (slides.length === 0) return;
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
    resetAutoSlide();
}

function prevSlide() {
    if (slides.length === 0) return;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
    resetAutoSlide();
}

function goToSlide(index) {
    if (slides.length === 0) return;
    currentSlide = index;
    updateCarousel();
    resetAutoSlide();
}

function startAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        if (currentScreen === 'main' && slides.length > 0) {
            nextSlide();
        }
    }, 5000);
}

function resetAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
}

// ========== FUNCIONES DE RENDERIZADO ==========
function renderBooks() {
    const container = document.getElementById('books-container');
    if (!container) return;
    container.innerHTML = '';
    
    booksDatabase.forEach(book => {
        const card = createItemCard(book);
        container.appendChild(card);
    });
}

function renderStories(category) {
    const stories = storiesDatabase[category];
    if (!stories) return;
    
    const container = document.getElementById('stories-grid');
    if (!container) return;
    container.innerHTML = '';
    
    let categoryName = '';
    switch(category) {
        case 'mystery': categoryName = 'Misterio'; break;
        case 'suspense': categoryName = 'Suspenso'; break;
        case 'scifi': categoryName = 'Ciencia Ficción'; break;
        case 'microfiction': categoryName = 'Minificciones'; break;
    }
    const titleElem = document.getElementById('stories-category-title');
    if (titleElem) titleElem.textContent = categoryName;
    
    stories.forEach(story => {
        const card = createItemCard(story);
        container.appendChild(card);
    });
}

function createItemCard(item) {
    const card = document.createElement('div');
    card.classList.add('item-card');
    
    const img = document.createElement('img');
    img.src = item.cover;
    img.alt = item.title;
    img.classList.add('item-cover');
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        openFullscreen(item.cover);
    });
    
    const info = document.createElement('div');
    info.classList.add('item-info');
    
    const title = document.createElement('div');
    title.classList.add('item-title');
    title.textContent = item.title;
    
    const date = document.createElement('div');
    date.classList.add('item-date');
    date.innerHTML = `<i class="far fa-calendar-alt"></i> ${item.date}`;
    
    const genre = document.createElement('div');
    genre.classList.add('item-genre');
    genre.innerHTML = `<i class="fas fa-tag"></i> ${item.genre}`;
    
    const price = document.createElement('div');
    price.classList.add('item-price');
    price.innerHTML = `<i class="fas fa-dollar-sign"></i> ${item.price} MXN`;
    
    const description = document.createElement('div');
    description.classList.add('item-description');
    description.textContent = item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description;
    
    const whatsappBtn = document.createElement('button');
    whatsappBtn.classList.add('whatsapp-btn');
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Interesado';
    whatsappBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sendWhatsApp(item);
    });
    
    info.appendChild(title);
    info.appendChild(date);
    info.appendChild(genre);
    info.appendChild(price);
    info.appendChild(description);
    info.appendChild(whatsappBtn);
    card.appendChild(img);
    card.appendChild(info);
    
    card.addEventListener('click', (e) => {
        if (e.target === whatsappBtn || e.target.parentElement === whatsappBtn) return;
        if (e.target === img) return;
        showDetail(item);
    });
    
    return card;
}

function showDetail(item) {
    const container = document.getElementById('book-detail-container');
    if (!container) return;
    
    container.innerHTML = `
        <div style="text-align: center;">
            <img src="${item.cover}" alt="${item.title}" class="detail-cover" id="detail-cover-img">
        </div>
        <h3>${item.title}</h3>
        <div class="meta-line">
            <span><i class="far fa-calendar-alt"></i> <strong>Fecha:</strong> ${item.date}</span>
            <span><i class="fas fa-tag"></i> <strong>Género:</strong> ${item.genre}</span>
            <span><i class="fas fa-dollar-sign"></i> <strong>Costo:</strong> $${item.price} MXN</span>
        </div>
        <div class="description">
            <strong>Descripción:</strong><br> ${item.description}
        </div>
        <button id="detail-whatsapp-btn" class="detail-whatsapp"><i class="fab fa-whatsapp"></i> Interesado en este libro</button>
    `;
    
    const detailImg = document.getElementById('detail-cover-img');
    if (detailImg) {
        detailImg.addEventListener('click', () => openFullscreen(item.cover));
    }
    
    const detailWhatsBtn = document.getElementById('detail-whatsapp-btn');
    if (detailWhatsBtn) {
        detailWhatsBtn.addEventListener('click', () => sendWhatsApp(item));
    }
    
    previousScreen = currentScreen;
    showScreen('detail');
}

function sendWhatsApp(item) {
    const phone = "5562076076";
    const message = encodeURIComponent(`Hola, me interesa el libro "${item.title}" 📅 Fecha: ${item.date} 🎭 Género: ${item.genre} 💰 Costo: $${item.price} MXN`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

function updateFeaturedStory() {
    const featuredImg = document.getElementById('featured-story-img');
    const featuredTitle = document.getElementById('featured-title');
    const featuredDate = document.getElementById('featured-date');
    const featuredGenre = document.getElementById('featured-genre');
    const featuredPrice = document.getElementById('featured-price');
    const featuredDescription = document.getElementById('featured-description');
    const featuredWhatsappBtn = document.getElementById('featured-whatsapp-btn');
    
    if (featuredImg) {
        featuredImg.src = featuredStory.cover;
        featuredImg.alt = featuredStory.title;
        featuredImg.addEventListener('click', () => openFullscreen(featuredStory.cover));
    }
    if (featuredTitle) featuredTitle.textContent = featuredStory.title;
    if (featuredDate) featuredDate.innerHTML = `<i class="far fa-calendar-alt"></i> ${featuredStory.date}`;
    if (featuredGenre) featuredGenre.innerHTML = `<i class="fas fa-tag"></i> ${featuredStory.genre}`;
    if (featuredPrice) featuredPrice.innerHTML = `<i class="fas fa-dollar-sign"></i> ${featuredStory.price} MXN`;
    if (featuredDescription) featuredDescription.textContent = featuredStory.description;
    if (featuredWhatsappBtn) featuredWhatsappBtn.addEventListener('click', () => sendWhatsApp(featuredStory));
}

function openFullscreen(imageUrl) {
    if (modalImg) modalImg.src = imageUrl;
    if (modal) modal.classList.add('active-modal');
}

function closeFullscreen() {
    if (modal) modal.classList.remove('active-modal');
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado - Iniciando aplicación');
    
    renderBooks();
    updateFeaturedStory();
    initCarousel();
    
    // Botones principales
    const booksMainBtn = document.getElementById('books-main-btn');
    const storiesMainBtn = document.getElementById('stories-main-btn');
    
    if (booksMainBtn) booksMainBtn.addEventListener('click', () => showScreen('books'));
    if (storiesMainBtn) storiesMainBtn.addEventListener('click', () => showScreen('storiesCategories'));
    
    // Botones de regreso
    const backBtns = ['back-to-main-from-books', 'back-to-main-from-stories', 'back-to-categories', 'back-to-previous'];
    backBtns.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                if (id === 'back-to-main-from-books' || id === 'back-to-main-from-stories') showScreen('main');
                else if (id === 'back-to-categories') showScreen('storiesCategories');
                else if (id === 'back-to-previous') {
                    if (previousScreen === 'books') showScreen('books');
                    else if (previousScreen === 'storiesGallery') showScreen('storiesGallery');
                    else if (previousScreen === 'storiesCategories') showScreen('storiesCategories');
                    else showScreen('main');
                }
            });
        }
    });
    
    // Botones de categorías
    document.querySelectorAll('[data-story-category]').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-story-category');
            previousScreen = 'storiesCategories';
            renderStories(category);
            showScreen('storiesGallery');
        });
    });
    
    // Modal
    if (modal) modal.addEventListener('click', closeFullscreen);
});
