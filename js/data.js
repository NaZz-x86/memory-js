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
        const accepterMdp = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=-`~{\[}\]:;'\|,./<>?])[A-Za-z0-9!@#$%^&*()_+=-`~{\[}\]:;'\|,./<>?]{6,}$/;
        //Récupération du local storage
        let nomUtilisateur = localStorage.getItem("user_name")
        let mailUtiliser = localStorage.getItem("user_mail");
        validateInput(userName, "erreur-name", accepterNom, nomUtilisateur, "Votre nom");
        validateInput(userEmail, "erreur-mail", accepterMail, mailUtiliser, "Votre mail");
        validatePassword(password, confirmPassword);
    if (accepterNom.test(userName) && accepterMail.test(userEmail) && accepterMdp.test(password) && userEmail !== mailUtiliser) {
        console.log("Tout est ok");
        localStorage.setItem("user_name", userName);
        localStorage.setItem("user_mail", userEmail);
        localStorage.setItem("password", password);
        form.reset();
    }
function validateInput(input, errorId, regex, storedValue, defaultMessage) {
    const balise = document.getElementById(errorId);
    if (regex.test(input)) {
        if (input === storedValue) {
            setMessage(balise, "red", "déjà utilisé");
        } else {
            setMessage(balise, "green", "est correct");
        }
    } else {
        setMessage(balise, "red", "est incorrect");
    }
}
function validatePassword(password, confirmPassword) {
    const balise = document.getElementById("erreur-motdepasse");
    if (accepterMdp.test(password)) {
        if (password !== confirmPassword) {
            setMessage(balise, "red", "ne sont pas identiques");
        } else {
             setMessage(balise, "green", "est correct");
        }
    } else {
        setMessage(balise, "red", "n'est pas correct");
    }
}
function setMessage(element, color, message) {
    element.style.color = color;
    element.textContent = `Le mot de passe ${message}`;
}
});

});