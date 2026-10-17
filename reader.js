let currentNovel = null;
let currentChapterIndex = 0;
let fontSize = 18;

document.addEventListener('DOMContentLoaded', function() {
    loadNovel();
    loadSettings();
});

function loadNovel() {
    const params = new URLSearchParams(window.location.search);
    const novelId = parseInt(params.get('id'));
    
    const stored = loadFromLocalStorage();
    currentNovel = stored.find(n => n.id === novelId);
    
    if (!currentNovel) {
        alert('Novel tidak ditemukan!');
        backToLibrary();
        return;
    }
    
    document.getElementById('novelTitle').textContent = currentNovel.title;
    loadChapter(0);
    populateChapterSelect();
}

function loadChapter(index) {
    if (index < 0 || index >= currentNovel.chapters.length) return;
    
    currentChapterIndex = index;
    const chapter = currentNovel.chapters[index];
    
    document.getElementById('chapterTitle').textContent = chapter.title;
    document.getElementById('chapterNumber').textContent = `Bab ${chapter.number} dari ${currentNovel.chapters.length}`;
    document.getElementById('chapterContent').innerHTML = chapter.content;
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === currentNovel.chapters.length - 1;
    document.getElementById('chapterSelect').value = index;
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Save progress
    saveProgress();
}

function populateChapterSelect() {
    const select = document.getElementById('chapterSelect');
    select.innerHTML = '';
    
    currentNovel.chapters.forEach((chapter, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `Bab ${chapter.number}: ${chapter.title}`;
        select.appendChild(option);
    });
}

function jumpToChapter(index) {
    loadChapter(parseInt(index));
}

function nextChapter() {
    if (currentChapterIndex < currentNovel.chapters.length - 1) {
        loadChapter(currentChapterIndex + 1);
    }
}

function previousChapter() {
    if (currentChapterIndex > 0) {
        loadChapter(currentChapterIndex - 1);
    }
}

function changeFontSize(delta) {
    fontSize += delta;
    if (fontSize < 12) fontSize = 12;
    if (fontSize > 32) fontSize = 32;
    
    document.getElementById('chapterContent').style.fontSize = fontSize + 'px';
    localStorage.setItem('fontSize', fontSize);
}

function changeFont(fontFamily) {
    document.getElementById('chapterContent').style.fontFamily = fontFamily;
    localStorage.setItem('fontFamily', fontFamily);
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDark);
}

function loadSettings() {
    // Load font size
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        fontSize = parseInt(savedFontSize);
        document.getElementById('chapterContent').style.fontSize = fontSize + 'px';
    }
    
    // Load font family
    const savedFont = localStorage.getItem('fontFamily');
    if (savedFont) {
        document.getElementById('chapterContent').style.fontFamily = savedFont;
        document.getElementById('fontFamily').value = savedFont;
    }
    
    // Load theme
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    }
}

function saveProgress() {
    const progress = {
        novelId: currentNovel.id,
        chapterIndex: currentChapterIndex,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem(`progress_${currentNovel.id}`, JSON.stringify(progress));
}

function backToLibrary() {
    window.location.href = 'index.html';
}
