import {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "./firebase.js";


/* CATEGORY */
window.setCat = function (c) {
  cat = c;
  document.getElementById("currentCat").innerText = c;

  document.querySelectorAll(".cat").forEach(el => {
    el.classList.toggle("active", el.innerText === c);
  });

  loadNotes();
};

/* CREATE */
window.createNote = async function () {
  const title = document.getElementById("noteTitle").value;
  const content = document.getElementById("noteContent").value;

  await addDoc(collection(db, "notes"), {
    title,
    content,
    category: cat,
    time: Date.now()
  });

  loadNotes();
};

/* LOAD */
window.loadNotes = async function () {
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
      <button onclick="del('${d.id}')">Delete</button>
    `;

    box.appendChild(div);
  });
};

/* RESERVE */
const CLOUD_NAME = "dchcfewzs";
const UPLOAD_PRESET = "hurfpbdu";

async function uploadToCloudinary(file) {
  if (!file) return "";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();

    if (!data.secure_url) {
      console.error("Cloudinary error:", data);
      alert("Image upload failed");
      return "";
    }

    return data.secure_url;

  } catch (err) {
    console.error("Upload error:", err);
    alert("Upload failed");
    return "";
  }
}

/* DELETE */
window.del = async function (id) {
  await deleteDoc(doc(db, "notes", id));
  loadNotes();
};

/* SETTINGS */
window.openSettings = function () {
  document.getElementById("modal").style.display = "flex";
};

window.closeSettings = function () {
  document.getElementById("modal").style.display = "none";
};

/* THEME */
window.setTheme = function (c) {
  document.documentElement.style.setProperty("--theme", c);
};

/* INIT */
setCat("French");
loadNotes();
