import { auth, db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


import {
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const error = document.getElementById("error");

loginBtn.addEventListener("click", async () => {

    error.textContent = "";

    try{

        await signInWithEmailAndPassword(

            auth,

            email.value,

            password.value

        );

      document.getElementById("loginPage").style.display = "none";

document.getElementById("dashboard").style.display = "block";

        // Dashboard comes next

    }

    catch(err){

        error.textContent = err.message;

    }

});

// ===== DASHBOARD MENU =====

const content = document.getElementById("content");

function showDashboard() {

    content.innerHTML = `

        <h1>Dashboard</h1>

        <div class="cards">

            <div class="card">
                <h2>Hotels</h2>
                <p id="hotelCount">0</p>
            </div>

            <div class="card">
                <h2>Packages</h2>
                <p id="packageCount">0</p>
            </div>

            <div class="card">
                <h2>Reviews</h2>
                <p id="reviewCount">0</p>
            </div>

        </div>

    `;
}

function showHotels(){

    content.innerHTML = `

        <h1>Hotel Management</h1>

        <button id="addHotelBtn">+ Add Hotel</button>

        <div id="hotelFormContainer"></div>

        <table class="table">

            <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody id="hotelTable"></tbody>

        </table>

    `;

    document.getElementById("addHotelBtn").onclick = showHotelForm;

}

function showHotelForm() {

    document.getElementById("hotelFormContainer").innerHTML = `

        <div class="hotelForm">

            <h2>Add Hotel</h2>

            <input id="hotelName" type="text" placeholder="Hotel Name">

            <input id="hotelLocation" type="text" placeholder="Location">

            <input id="hotelPrice" type="number" placeholder="Price">

            <input id="hotelRating" type="number" step="0.1" placeholder="Rating">

            <textarea id="hotelDescription" placeholder="Description"></textarea>

            <input id="hotelImage" type="file">

            <button id="saveHotel">Save Hotel</button>

        </div>

    `;
    document.getElementById("saveHotel").addEventListener("click", saveHotel);
        console.log("Save button connected");

}

async function saveHotel() {

    const name = document.getElementById("hotelName").value.trim();
    const location = document.getElementById("hotelLocation").value.trim();
    const price = document.getElementById("hotelPrice").value.trim();
    const rating = document.getElementById("hotelRating").value.trim();
    const description = document.getElementById("hotelDescription").value.trim();

    const image = document.getElementById("hotelImage").files[0];

    if (!name || !location || !price || !rating || !description || !image) {
        alert("Please fill all fields.");
        return;
    }

    try {

        // Upload image to Cloudinary

        const formData = new FormData();

        formData.append("file", image);
        formData.append("upload_preset", "abc_holidays");

        const uploadResponse = await fetch(
            "https://api.cloudinary.com/v1_1/vena5llr/image/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const uploadData = await uploadResponse.json();

        if (!uploadData.secure_url) {

            console.log(uploadData);

            alert("Image upload failed.");

            return;

        }

        // Save to Firestore

        await addDoc(collection(db, "hotels"), {

            name: name,
            location: location,
            price: Number(price),
            rating: Number(rating),
            description: description,
            image: uploadData.secure_url,
            createdAt: new Date()

        });

        alert("Hotel Added Successfully!");

        document.getElementById("hotelFormContainer").innerHTML = "";

    }

    catch (err) {

        console.error(err);

        alert(err.message);

    }

}



function showPackages(){

    content.innerHTML=`

        <h1>Package Management</h1>

        <button>+ Add Package</button>

    `;

}

function showReviews(){

    content.innerHTML=`

        <h1>Reviews</h1>

        <button>+ Add Review</button>

    `;

}

function showHero(){

    content.innerHTML=`

        <h1>Hero Banner</h1>

        <button>Change Banner</button>

    `;

}

function showSettings(){

    content.innerHTML=`

        <h1>Settings</h1>

        <p>Website settings will appear here.</p>

    `;

}

// Sidebar buttons

document.getElementById("dashboardBtn").onclick=showDashboard;

document.getElementById("manageHotels").onclick=showHotels;

document.getElementById("managePackages").onclick=showPackages;

document.getElementById("manageReviews").onclick=showReviews;

document.getElementById("manageHero").onclick=showHero;

document.getElementById("manageSettings").onclick=showSettings;


document.getElementById("logoutBtn").onclick = async () => {

    await signOut(auth);

   document.getElementById("dashboard").style.display = "none";
document.getElementById("loginPage").style.display = "flex";

email.value = "";
password.value = "";
error.textContent = "";
};