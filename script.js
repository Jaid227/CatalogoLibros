
// ---------- BASE DE DATOS DE LIBROS (POR CATEGORÍA) ----------
// Cada libro contiene: id, título, autor, género, fechaImp, editorial, descripcion, portada (imagen placeholder local o URL)
// Utilizaremos imágenes de placeholder con temática literaria (Unsplash / placeholder con estilo)
// Para hacer el proyecto funcional sin dependencias externas, usamos imágenes generativas de LoremFlick pero estilo portada.
// Se pueden reemplazar por URLs reales; aquí usamos imágenes de placeholder con colores + texto simbólico.
// Cada portada es una imagen distinta según el libro.

const booksDatabase = {
    fiction: [
        { id: "fic1", title: "Elipsis suspendida", author: "Emmanuel Ciaro", genre: "Ficción especulativa", date: "15/03/2022", publisher: "Alfaguara", description: "Una historia donde la realidad y los sueños se entrelazan en un jardín secreto que cambia el destino de sus protagonistas.", cover: "imagenes/libro1.jpeg" },
        { id: "fic2", title: "Mar intangible", author: "Emmanuel Ciaro", genre: "Ficción distópica", date: "10/10/2023", publisher: "Salamandra", description: "En un futuro donde las ciudades flotan, un grupo de rebeldes busca la verdad oculta tras la niebla.", cover: "imagenes/libro2.jpeg" },
        { id: "fic3", title: "OrgInt", author: "Emmanuel Ciaro", genre: "Realismo mágico", date: "22/07/2021", publisher: "Anagrama", description: "Un viaje emocional por la memoria familiar, donde los objetos cuentan historias olvidadas.", cover: "imagenes/libro3.jpeg" }
    ],
    horror: [
        { id: "hor1", title: "La casa del espejo roto", author: "Carlos M. Negrete", genre: "Terror gótico", date: "05/09/2020", publisher: "Minotauro", description: "Una mansión antigua esconde un espejo que refleja los miedos más profundos de quienes lo miran.", cover: "https://picsum.photos/id/104/400/600?grayscale" },
        { id: "hor2", title: "Susurros en la niebla", author: "Elena Carranza", genre: "Suspenso sobrenatural", date: "18/11/2023", publisher: "Océano", description: "Cada noche, una niebla espesa cubre el pueblo, trayendo consigo voces del pasado.", cover: "https://picsum.photos/id/42/400/600" },
        { id: "hor3", title: "El ritual de las sombras", author: "Daniel Ortuño", genre: "Terror psicológico", date: "30/01/2024", publisher: "Páginas de Espuma", description: "Un antropólogo descubre un antiguo ritual que amenaza con consumir su cordura.", cover: "https://picsum.photos/id/39/400/600" }
    ],
    drama: [
        { id: "dra1", title: "Ausencia y ceniza", author: "Mariana Luján", genre: "Drama familiar", date: "14/05/2019", publisher: "Seix Barral", description: "La historia de tres generaciones marcadas por la pérdida y la redención.", cover: "https://picsum.photos/id/76/400/600" },
        { id: "dra2", title: "Bajo el mismo cielo", author: "Jorge Alarcón", genre: "Drama social", date: "02/08/2022", publisher: "Tusquets", description: "Dos amigos separados por la guerra reencuentran sus vidas décadas después.", cover: "https://picsum.photos/id/88/400/600" },
        { id: "dra3", title: "La decisión del faro", author: "Sofía Irigoyen", genre: "Drama psicológico", date: "19/12/2020", publisher: "Lumen", description: "Un guardafaros aislado debe tomar una decisión que cambiará su vida para siempre.", cover: "https://picsum.photos/id/22/400/600" }
    ],
    novel: [
        { id: "nov1", title: "Ríos profundos", author: "José María Arguedas (homenaje)", genre: "Novela contemporánea", date: "10/04/2023", publisher: "Planeta", description: "Una novela que explora la identidad y las raíces andinas en la ciudad moderna.", cover: "https://picsum.photos/id/23/400/600" },
        { id: "nov2", title: "La biblioteca de medianoche", author: "Matt Haig (estilo)", genre: "Novela filosófica", date: "15/09/2021", publisher: "AdN", description: "Entre la vida y la muerte, una biblioteca infinita permite explorar caminos alternos.", cover: "https://picsum.photos/id/24/400/600" },
        { id: "nov3", title: "Marea de tinta", author: "Clara Montes", genre: "Novela histórica", date: "27/07/2023", publisher: "Grijalbo", description: "Una imprenta del siglo XIX guarda secretos que cambiarán la historia de una familia.", cover: "https://picsum.photos/id/26/400/600" },
        { id: "nov4", title: "Los días eternos", author: "Gabriel Estrada", genre: "Novela romántica", date: "03/11/2022", publisher: "Espasa", description: "Un encuentro fortuito desencadena una historia de amor que desafía al tiempo.", cover: "https://picsum.photos/id/29/400/600" }
    ]
};

// Elementos del DOM
const mainScreen = document.getElementById('main-screen');
const galleryScreen = document.getElementById('gallery-screen');
const detailScreen = document.getElementById('detail-screen');
const booksGrid = document.getElementById('books-grid');
const categoryTitleSpan = document.getElementById('category-title');
const backToMainBtn = document.getElementById('back-to-main');
const backToGalleryBtn = document.getElementById('back-to-gallery');
const bookDetailContainer = document.getElementById('book-detail-container');

let currentCategory = '';
let lastSelectedBook = null; // para posible uso

// Función para mostrar pantalla específica
function showScreen(screenName) {
    mainScreen.classList.remove('active');
    galleryScreen.classList.remove('active');
    detailScreen.classList.remove('active');
    
    if (screenName === 'main') mainScreen.classList.add('active');
    if (screenName === 'gallery') galleryScreen.classList.add('active');
    if (screenName === 'detail') detailScreen.classList.add('active');
}

// Renderizar galería según categoría
function renderGallery(category) {
    const books = booksDatabase[category];
    if (!books) return;
    
    // Limpiar grid y actualizar título
    booksGrid.innerHTML = '';
    let categoryDisplay = '';
    switch(category) {
        case 'fiction': categoryDisplay = 'Ficción'; break;
        case 'horror': categoryDisplay = 'Terror'; break;
        case 'drama': categoryDisplay = 'Drama'; break;
        case 'novel': categoryDisplay = 'Novela'; break;
        default: categoryDisplay = 'Libros';
    }
    categoryTitleSpan.textContent = categoryDisplay;
    
    // Generar cada tarjeta de libro (portada + título)
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-id', book.id);
        bookCard.setAttribute('data-category', category);
        
        const coverImg = document.createElement('img');
        coverImg.src = book.cover;
        coverImg.alt = `Portada de ${book.title}`;
        coverImg.classList.add('book-cover');
        coverImg.loading = 'lazy';
        
        const titleSpan = document.createElement('div');
        titleSpan.classList.add('book-title');
        titleSpan.textContent = book.title;
        
        bookCard.appendChild(coverImg);
        bookCard.appendChild(titleSpan);
        
        // Al hacer click en el libro, mostrar detalle
        bookCard.addEventListener('click', (e) => {
            e.stopPropagation();
            showBookDetail(book, category);
        });
        
        booksGrid.appendChild(bookCard);
    });
}

// Mostrar detalle completo del libro
function showBookDetail(book, category) {
    // Crear contenido detallado con todos los campos solicitados: descripción, autor, género, fecha de impresión, editorial
    // Además se incluye la portada nuevamente
    bookDetailContainer.innerHTML = `
        <div style="text-align: center;">
            <img src="${book.cover}" alt="${book.title}" class="detail-cover" style="width: 180px; border-radius: 12px; margin-bottom: 1.2rem;">
        </div>
        <h3>${book.title}</h3>
        <div class="meta-line">
            <span><strong>Autor:</strong> ${book.author}</span>
            <span><strong>Género:</strong> ${book.genre}</span>
            <span><strong>Fecha impresión:</strong> ${book.date}</span>
            <span><strong>Editorial:</strong> ${book.publisher}</span>
        </div>
        <div class="description">
            <strong>Descripción:</strong><br> ${book.description}
        </div>
    `;
    // Guardamos referencia del último libro (opcional)
    lastSelectedBook = book;
    showScreen('detail');
}

// Eventos de botones de categoría desde pantalla principal
const categoryBtns = document.querySelectorAll('.category-btn');
categoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const category = btn.getAttribute('data-category');
        if (category && booksDatabase[category]) {
            currentCategory = category;
            renderGallery(category);
            showScreen('gallery');
        }
    });
});

// Botón regreso: de galería a pantalla principal
backToMainBtn.addEventListener('click', () => {
    showScreen('main');
});

// Botón regreso: de detalle a galería (con la misma categoría actual)
backToGalleryBtn.addEventListener('click', () => {
    if (currentCategory) {
        // Re-renderizar la galería para mantener estado actualizado
        renderGallery(currentCategory);
        showScreen('gallery');
    } else {
        // fallback a principal
        showScreen('main');
    }
});

// Inicialización: mostrar pantalla principal
showScreen('main');

// Por si se necesita manejar el responsive y algunos ajustes de imágenes alternativas
// Aseguramos que todas las imágenes de portada carguen correctamente (los picsum son funcionales)
console.log('Aplicación de catálogo de libros lista - diseño minimalista');