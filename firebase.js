import { initializeApp }
from
"https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import {
getFirestore
}
from
"https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

import {
getStorage
}
from
"https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

const firebaseConfig = {

apiKey:"YOUR_KEY",

authDomain:"YOUR_DOMAIN",

projectId:"YOUR_PROJECT",

storageBucket:"YOUR_BUCKET",

appId:"YOUR_APP"

};

const app =
initializeApp(firebaseConfig);

export const db =
getFirestore(app);

export const storage =
getStorage(app);
