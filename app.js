import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ================= CONFIG ================= */
const firebaseConfig = {
  apiKey: "AIzaSyCA0xyzDy7JmaQEINTvqmXfVzfAh1cNyk0",
  authDomain: "exam0829-3c850.firebaseapp.com",
  projectId: "exam0829-3c850",
  storageBucket: "exam0829-3c850.firebasestorage.app",
  messagingSenderId: "617125485040",
  appId: "1:617125485040:web:434b11e219543789882535",
  measurementId: "G-8TLDDWCC7V"
};
};

const CLOUD_NAME = "dchcfewzs";
const UPLOAD_PRESET = "hurfpbdu";

/* ================= INIT ================= */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ================= STATE ================= */
let cat = "French";

/* ================= CATEGORY ================= */
document.querySelectorAll(".cat").forEach(el => {
  el.onclick = () => {
    cat = el.dataset.cat;

    document.getElementById("currentCat").innerText = cat;

    document.querySelectorAll(".cat").forEach(c =>
      c.classList.remove("active")
    );
    el.classList.add("active");

    loadNotes();
  };
});

/* ================= CLOUDINARY ================= */
async function upload(file) {
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
    { method: "POST", body: form }
  );

  const data = await res.json();
  return data.secure_url;
}

/* ================= CREATE ================= */
document.getElementById("createBtn").onclick = async () => {
  const title = document.getElementById("noteTitle").value;
  const content = document.getElementById("noteContent").value;
  const file = document.getElementById("file").files[0];

  let imageUrl = "";
  if (file) imageUrl = await upload(file);

  await addDoc(collection(db, "notes"), {
    title,
    content,
    imageUrl,
    category: cat,
    time: Date.now()
  });

  loadNotes();
};

/* ================= LOAD ================= */
async function loadNotes() {
  const snap = await getDocs(collection(db, "notes"));
  const box = document.getElementById("notes");
  const search = document.getElementById("search").value.toLowerCase();

  box.innerHTML = "";

  snap.forEach(d => {
    const data = d.data();

    if (data.category !== cat) return;

    if (
      search &&
      !data.title.toLowerCase().includes(search) &&
      !data.content.toLowerCase().includes(search)
    ) return;

    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      <b>${data.title}</b>
      <p>${data.content}</p>
      ${data.imageUrl ? `<img src="${data.imageUrl}" width="180">` : ""}
      <br><br>
      <button onclick="del('${d.id}')">Delete</button>
    `;

    box.appendChild(div);
  });
}

window.del = async (id) => {
  await deleteDoc(doc(db, "notes", id));
  loadNotes();
};

/* ================= SEARCH ================= */
document.getElementById("search").oninput = loadNotes;

/* ================= SETTINGS ================= */
const modal = document.getElementById("modal");

document.getElementById("settingsBtn").onclick = () => {
  modal.style.display = "flex";
};

document.getElementById("closeModal").onclick = () => {
  modal.style.display = "none";
};

/* ================= THEME ================= */
document.getElementById("colorPicker").oninput = (e) => {
  document.documentElement.style.setProperty("--main", e.target.value);
  localStorage.setItem("theme", e.target.value);
};

if (localStorage.getItem("theme")) {
  document.documentElement.style.setProperty("--main", localStorage.getItem("theme"));
}

/* INIT */
loadNotes();
