let chapterCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Preview cover image
    document.getElementById('novelCover').addEventListener('input', function(e) {
        const preview = document.getElementById('coverPreview');
        if (e.target.value) {
            preview.src = e.target.value;
            preview.style.display = 'block';
        } else {
            preview.style.display = 'none';
        }
    });
    
    // Add first chapter by default
    addChapter();
});

function addChapter() {
    chapterCount++;
    const chaptersList = document.getElementById('chaptersList');
    
    const chapterDiv = document.createElement('div');
    chapterDiv.className = 'chapter-item';
    chapterDiv.id = `chapter-${chapterCount}`;
    
    chapterDiv.innerHTML = `
        <div class="chapter-header">
            <h3>Bab ${chapterCount}</h3>
            <button type="button" onclick="removeChapter(${chapterCount})" class="btn btn-danger btn-small">
                🗑️ Hapus
            </button>
        </div>
        
        <div class="form-group">
            <label>Judul Bab</label>
            <input type="text" class="chapter-title" placeholder="Contoh: Pertemuan Pertama" required>
        </div>
        
        <div class="form-group">
            <label>Isi Bab (bisa pakai HTML)</label>
            <textarea class="chapter-content" placeholder="<p>Tulis isi bab di sini...</p><p>Gunakan tag HTML seperti &lt;p&gt; untuk paragraf, &lt;strong&gt; untuk tebal, dll.</textarea>
            <small style="color: #666;">Tips: Gunakan &lt;p&gt;teks&lt;/p&gt; untuk paragraf baru</small>
        </div>
    `;
    
    chaptersList.appendChild(chapterDiv);
}

function removeChapter(id) {
    const chapter = document.getElementById(`chapter-${id}`);
    if (chapter) {
        chapter.remove();
        renumberChapters();
    }
}

function renumberChapters() {
    const chapters = document.querySelectorAll('.chapter-item');
    chapters.forEach((chapter, index) => {
        const header = chapter.querySelector('h3');
        header.textContent = `Bab ${index + 1}`;
        
        const deleteBtn = chapter.querySelector('button');
        deleteBtn.setAttribute('onclick', `removeChapter(${chapter.id.split('-')[1]})`);
    });
    
    chapterCount = chapters.length;
}

document.getElementById('novelForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const title = document.getElementById('novelTitle').value.trim();
    const genre = document.getElementById('novelGenre').value;
    const cover = document.getElementById('novelCover').value.trim();
    const description = document.getElementById('novelDescription').value.trim();
    
    // Get all chapters
    const chapterItems = document.querySelectorAll('.chapter-item');
    const chapters = [];
    
    chapterItems.forEach((item, index) => {
        const chapterTitle = item.querySelector('.chapter-title').value.trim();
        const chapterContent = item.querySelector('.chapter-content').value.trim();
        
        if (chapterTitle && chapterContent) {
            chapters.push({
                number: index + 1,
                title: chapterTitle,
                content: `<p>${chapterContent.replace(/\n/g, '</p><p>')}</p>`
            });
        }
    });
    
    if (chapters.length === 0) {
        alert('Minimal harus ada 1 bab!');
        return;
    }
    
    // Generate unique ID
    const stored = loadFromLocalStorage();
    const newId = stored.length > 0 ? Math.max(...stored.map(n => n.id)) + 1 : 1;
    
    // Create novel object
    const newNovel = {
        id: newId,
        title: title,
        genre: genre,
        cover: cover,
        description: description,
        chapters: chapters
    };
    
    // Save to localStorage
    stored.push(newNovel);
    localStorage.setItem('novels', JSON.stringify(stored));
    
    alert(`✅ Novel "${title}" berhasil ditambahkan dengan ${chapters.length} bab!`);
    
    // Reset form
    resetForm();
    
    // Redirect to library after 2 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
});

function resetForm() {
    document.getElementById('novelForm').reset();
    document.getElementById('chaptersList').innerHTML = '';
    document.getElementById('coverPreview').style.display = 'none';
    chapterCount = 0;
    addChapter();
                                                           }
