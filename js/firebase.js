// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAuDN_k0khhingSDii2MAlY8tM0ZFyyBuQ",
  authDomain: "abc-holidays-c9b60.firebaseapp.com",
  projectId: "abc-holidays-c9b60",
  storageBucket: "abc-holidays-c9b60.firebasestorage.app",
  messagingSenderId: "966618927371",
  appId: "1:966618927371:web:c3af0ce597703a2b5c120e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Export
export { db, auth, storage };