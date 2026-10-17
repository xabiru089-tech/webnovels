let currentGenre = 'all';
let filteredNovels = [];

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    loadNovels();
    setupSearch();
});

function loadNovels() {
    const stored = loadFromLocalStorage();
    filteredNovels = stored.length > 0 ? stored : [];
    displayNovels(filteredNovels);
}

function displayNovels(novelsToShow) {
    const grid = document.getElementById('novelGrid');
    grid.innerHTML = '';
    
    if (novelsToShow.length === 0) {
        grid.innerHTML = '<p style="color: white; text-align: center; grid-column: 1/-1;">Belum ada novel. Tambahkan novel pertama Anda!</p>';
        return;
    }
    
    novelsToShow.forEach(novel => {
        const card = createNovelCard(novel);
        grid.appendChild(card);
    });
}

function createNovelCard(novel) {
    const card = document.createElement('div');
    card.className = 'novel-card';
    card.onclick = () => openNovel(novel.id);
    
    const coverDiv = document.createElement('div');
    coverDiv.className = 'novel-cover';
    if (novel.cover) {
        coverDiv.style.backgroundImage = `url(${novel.cover})`;
        coverDiv.style.backgroundSize = 'cover';
        coverDiv.style.backgroundPosition = 'center';
    } else {
        coverDiv.textContent = novel.title.substring(0, 2).toUpperCase();
    }
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'novel-info';
    
    const title = document.createElement('div');
    title.className = 'novel-title';
    title.textContent = novel.title;
    
    const genre = document.createElement('div');
    genre.className = 'novel-genre';
    genre.textContent = novel.genre.charAt(0).toUpperCase() + novel.genre.slice(1);
    
    const chapters = document.createElement('div');
    chapters.className = 'novel-chapters';
    chapters.textContent = `${novel.chapters.length} Bab`;
    
    infoDiv.appendChild(title);
    infoDiv.appendChild(genre);
    infoDiv.appendChild(chapters);
    
    card.appendChild(coverDiv);
    card.appendChild(infoDiv);
    
    return card;
}

function filterByGenre(genre) {
    currentGenre = genre;
    
    // Update active button
    document.querySelectorAll('.genre-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const stored = loadFromLocalStorage();
    if (genre === 'all') {
        filteredNovels = stored;
    } else {
        filteredNovels = stored.filter(novel => novel.genre === genre);
    }
    
    displayNovels(filteredNovels);
}

function searchNovels() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const stored = loadFromLocalStorage();
    
    filteredNovels = stored.filter(novel => 
        novel.title.toLowerCase().includes(searchTerm) ||
        novel.genre.toLowerCase().includes(searchTerm)
    );
    
    displayNovels(filteredNovels);
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchNovels();
        }
    });
}

function openNovel(novelId) {
    window.location.href = `reader.html?id=${novelId}`;
          }
