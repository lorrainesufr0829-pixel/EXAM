document.addEventListener('DOMContentLoaded', loadNotes);

// 1. Theme Switcher (Cycles colors when clicking the emoji button)
const themes = ['#f5f7fb', '#fff0f5', '#e6f2ff', '#e6ffe6', '#fff5e6'];
let themeIndex = 0;

document.getElementById('secretColorBtn').onclick = () => {
    themeIndex = (themeIndex + 1) % themes.length;
    document.body.style.backgroundColor = themes[themeIndex];
};

// 2. Upload/Add Note Logic
function addNote() {
    const title = document.getElementById('noteTitle').value;
    const category = document.getElementById('noteCategory').value;
    const body = document.getElementById('noteBody').value;

    if (!title || !body) {
        alert("Please enter both a title and some text for your diary entry!");
        return;
    }

    const note = { title, category, body, id: Date.now() };

    saveToStorage(note);
    renderNoteHTML(note);

    // Clear the inputs
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteBody').value = '';
}

// 3. Render Note on Screen
function renderNoteHTML(note) {
    const container = document.getElementById('notesContainer');
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note-card';
    noteDiv.setAttribute('data-id', note.id);

    noteDiv.innerHTML = `
        <h3>${note.title} <span class="category-tag">${note.category}</span></h3>
        <p>${note.body}</p>
        <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
        <div style="clear:both;"></div>
    `;
    container.prepend(noteDiv); // Puts newest notes at the top
}

// 4. Persistence (LocalStorage) Logic
function saveToStorage(note) {
    let notes = JSON.parse(localStorage.getItem('diaryNotes') || '[]');
    notes.push(note);
    localStorage.setItem('diaryNotes', JSON.stringify(notes));
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('diaryNotes') || '[]');
    notes.forEach(renderNoteHTML);
}

// 5. Delete Logic
function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem('diaryNotes') || '[]');
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('diaryNotes', JSON.stringify(notes));
    document.querySelector(`[data-id="${id}"]`).remove();
}
