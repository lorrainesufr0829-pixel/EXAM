const quill =
new Quill('#editor',{

theme:'snow'

});

import { db }
from './firebase.js';

import {

collection,
addDoc

}
from
"https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document
.getElementById("saveBtn")
.addEventListener("click",

async()=>{

const title =
document
.getElementById("noteTitle")
.value;

const category =
document
.getElementById("category")
.value;

const content =
quill.root.innerHTML;

await addDoc(

collection(db,"notes"),

{

title,
category,
content,

createdAt:
new Date()

}

);

alert("saved");

});

import {

ref,
uploadBytes,
getDownloadURL

}
from
"https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

import {
storage
}
from './firebase.js';

async function uploadFile(){

const file =
document
.getElementById("fileInput")
.files[0];

if(!file) return null;

const storageRef =
ref(
storage,
"uploads/"+Date.now()+file.name
);

await uploadBytes(
storageRef,
file
);

return await
getDownloadURL(
storageRef
);

}

const fileUrl =
await uploadFile();

await addDoc(

collection(db,"notes"),

{

title,
category,
content,

fileUrl

}

);

import {

GoogleAuthProvider,
signInWithPopup,
getAuth

}
from
"https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const auth =
getAuth();

const provider =
new GoogleAuthProvider();

await signInWithPopup(
auth,
provider
);
