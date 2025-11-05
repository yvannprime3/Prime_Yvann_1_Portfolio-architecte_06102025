document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

const email = document.getElementById("email").value.trim();
const password = document.getElementById("pwd").value.trim();
const message = document.getElementById("message");

message.style.color = "black";
message.textContent = "Connexion en cours...";

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

// Connexion réussie //
    if (response.status === 200) {
        const data = await response.json();
        

// Stocke le token //
    if (data.token) {
        localStorage.setItem("token", data.token);
    }

    message.style.color = "green";
    message.textContent = "Connexion réussie ! Redirection...";

// Redirection vers la page d'accueil //
    setTimeout(() => {
        window.location.href = "index.html";
        }, 1000); 
// Connexion échoué
    } else if (response.status === 401 || response.status === 404) {
        message.style.color = "red";
        message.textContent = "Email ou mot de passe incorrect.";
    } else {
        message.style.color = "red";
        message.textContent = "Erreur serveur. Veuillez réessayer plus tard.";
    }

    } catch (error) {
        console.error("Erreur :", error);
        message.style.color = "red";
        message.textContent = "Impossible de contacter le serveur. Vérifie ta connexion.";
    }
});

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (token) {
    const modifier = document.querySelector(".btn-modifier");
    modifier.style.display = "flex";
    
}
});

//const modifier = document.querySelector(".btn-modifier");
//modifier.style.display = "flex";