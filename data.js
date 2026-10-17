// Template data novel - Tambahkan novel Anda di sini
const novels = [
    // Contoh format (hapus atau biarkan kosong):
    /*
    {
        id: 1,
        title: "Judul Novel",
        genre: "romance",
        cover: "url-gambar-sampul.jpg", // atau biarkan kosong untuk default
        description: "Deskripsi novel",
        chapters: [
            {
                number: 1,
                title: "Bab 1: Judul Bab",
                content: `Isi bab pertama di sini...`
            },
            {
                number: 2,
                title: "Bab 2: Judul Bab",
                content: `Isi bab kedua di sini...`
            }
        ]
    }
    */
];

// Fungsi untuk menambah novel baru (bisa dipanggil dari console)
function addNovel(novelData) {
    novels.push(novelData);
    saveToLocalStorage();
    console.log("Novel berhasil ditambahkan!");
}

// Simpan ke localStorage
function saveToLocalStorage() {
    localStorage.setItem('novels', JSON.stringify(novels));
}

// Load dari localStorage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('novels');
    if (saved) {
        return JSON.parse(saved);
    }
    return novels;
}
