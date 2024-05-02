//Permet de charcher la page HTML pour les manipuler
document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("connextion");
    const connecter = localStorage.getItem(connextion)
    if(connecter !== "true"){
        //écoute sur la soumission de formulaire 
        form.addEventListener("submit", function(event) {
            //Pour empêcher la soumission du formulaire
            event.preventDefault(); 
            //Saisie de l'user
            const saisieMdp = document.getElementById("mdp").value;
            const saisieNon = document.getElementById("name").value;
            //récupération du localStorage
            let valNom = localStorage.getItem("user_name");
            let valMdp = localStorage.getItem("password");
            //si storage et dif de la saisie
            if(valNom !== saisieNon){
                const baliseMessage = document.getElementById("name-existe");
                const message = "Votre nom d'utilisateur n'existe pas";
                baliseMessage.style.color = "red";
                baliseMessage.textContent = message;
            }
            if (valMdp !== saisieMdp){
                const baliseMessage = document.getElementById("mdp-existe");
                const message = "Votre mot de passe n'est pas valide";
                baliseMessage.style.color = "red";
                baliseMessage.textContent = message;
            }
            if(valMdp === saisieMdp && valNom === saisieNon){
            //Suprrime le formulaire pour laisser place a un message 
            form.remove();
            const baliseFinal = document.getElementById("message-succée");
            const message = `Bienvene, ${valNom}, sur notre Site de jeux. Grace a ta connextion tu pourra souvegardé t'est score`;
            baliseFinal.style.color = "black";
            baliseFinal.textContent = message;
            localStorage.setItem("connextion", true);
            }
        });
    }else {
            const baliseFinal = document.getElementById("message-succée");
            form.remove();
            const message = `Bienvene, ${valNom}, sur notre Site de jeux. Grace a ta connextion tu pourra souvegardé t'est score`;
            baliseFinal.style.color = "black";
            baliseFinal.textContent = message;
    }
});
