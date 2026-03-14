
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


/* CONFIG FIREBASE */

const firebaseConfig = {
  apiKey: "AIzaSyB8zyAwlTAkOcFi9IU3VOkKb0HaxNwCQ4E",
  authDomain: "designedbyglit.firebaseapp.com",
  projectId: "designedbyglit",
  storageBucket: "designedbyglit.firebasestorage.app",
  messagingSenderId: "694213083753",
  appId: "1:694213083753:web:691f3b62975c2a3db318f8"
};


/* INITIALISATION */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


/* CREER COMPTE */

window.register = function(){

const email = document.getElementById("email").value
const password = document.getElementById("password").value

createUserWithEmailAndPassword(auth,email,password)

.then(() => {

alert("Compte créé avec succès")

})

.catch(error => {

alert(error.message)

})

}


/* CONNEXION */

window.login = function(){

const email = document.getElementById("email").value
const password = document.getElementById("password").value

signInWithEmailAndPassword(auth,email,password)

.then(() => {

alert("Connexion réussie")

})

.catch(error => {

alert(error.message)

})

}


/* DECONNEXION */

window.logout = function(){

signOut(auth)

.then(()=>{

alert("Déconnecté")

})

}
