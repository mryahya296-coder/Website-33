import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
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