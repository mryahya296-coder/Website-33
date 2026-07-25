import { auth } from "./firebase.js";

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

       document.querySelector(".login-box").style.display = "none";

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

        <br><br>

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

            <tbody id="hotelTable">

            </tbody>

        </table>

    `;
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