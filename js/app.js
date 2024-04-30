document.addEventListener("DOMContentLoaded", function() {
    // Sélection du formulaire
    const form = document.getElementById("Validation");

    // Écouteur d'événement pour la soumission du formulaire
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire

        // Sélection des champs de formulaire
        const userName = document.getElementById("name2").value;
        const userEmail = document.getElementById("mail2").value;
        const password = document.getElementById("motDePasse").value;
        const confirmPassword = document.getElementById("confMotDePasse").value;
        //Caractére accepter:
        const accepterNom = /^[a-zA-Z\-]+$/;
        const accepterMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const accepterMdp = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=-`~{\[}\]:;'\|,./<>?])[A-Za-z0-9!@#$%^&*()_+=-`~{\[}\]:;'\|,./<>?]{12,}$/;
        //Si la saisie et bonne par raport au regex
        if (accepterNom.test(userName)){
            //On ajoute au local storage sous la clef User_name
            localStorage.setItem("user_name", userName);
            const balise = document.getElementById("erreur-name");
            const message = "Votre nom est correcte";
            balise.style.color = "green"
            balise.textContent = message
        } else {
            const balise = document.getElementById("erreur-name");
            const message = "Votre nom est incorrecte";
            balise.style.color = "red"
            balise.textContent = message
        }
        if (accepterMail.test(userEmail)){
            localStorage.setItem("user_mail", userEmail);
            const balise = document.getElementById("erreur-mail");
            const message = "Votre mail est correcte";
            balise.style.color = "green"
            balise.textContent = message
        } else {
            const balise = document.getElementById("erreur-mail");
            const message = "Votre mail est incorrecte";
            balise.style.color = "red"
            balise.textContent = message
        }
        if (accepterMdp.test(password)) {
            if(password === confirmPassword) {
                localStorage.setItem("password", password);
                const balise = document.getElementById("erreur-motdepasse");
                const message = "Votre mot de passe est correcte";
                balise.style.color = "green";
                balise.textContent = message;
            } else {
                const message ="Votre mot de passe ne sont pas identique";
                const balise = document.getElementById("pasLeMemeMotDePasse")
                balise.style.color = "Red";
                balise.textContent = message;
            }
        } else {
            const balise = document.getElementById("erreur-motdepasse");
            const message = "Le mot de passe n'est pas correcte";
            balise.style.color = "red"
            balise.textContent = message
        }

        // Stockage des données dans le localStorage

        // Réinitialisation des champs de formulaire après la soumission
        form.reset();

        // Confirmation pour l'utilisateur
        alert("Les données ont été enregistrées avec succès dans le localStorage !");
    }); 
});
    //On récupére toute les carte
    const cartes = document.querySelectorAll(".carte-pair");
    //création d'une fonction qui retourne la carte
    function retourneCarte() {
        this.classList.toggle("flip");
    }
    //Une écoute sur le clique d'une carte
    cartes.forEach(carte => carte.addEventListener("click",retourneCarte));