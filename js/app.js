//On récupére toute les carte
const cartes = document.querySelectorAll(".memoir-cartes");
//On ajoute des variable pour gerer l'état de basculement 
let carteRetourné = false;
let premierCarteRetourn;
let deuxiemeCarteRetourn;
let jeuxVerouiller = false;
let nombreDeCoup = 0;
let gagner = false;
let tableauScore = new Array(3);
tableauScore[1] = 0;
let dateDuJour = new Date();
let jour = dateDuJour.getDate();
//+1 Parce qu'il sont indexé a parti de 0
let mois = dateDuJour.getMonth()+1;
let annee = dateDuJour.getFullYear();
dateDuJour = jour+"/"+mois+"/"+annee;
//création d'une fonction qui retourne la carte
function retourneCarte() {
    //Si jeuxverouiller et vrai alors on arrete la function
    if (jeuxVerouiller) return;
    //Verification que this(carte actuelle) et égale a premier carte retournée si vrai on arrete la function
    if (this === premierCarteRetourn) return;
    //Faire pivoter la carte avec CSS
    this.classList.add("flip");
    //Si une carte et retournée, retourne vrais et la stoke dans la variable prévu pour 
    if(!premierCarteRetourn){
        carteRetourné = true;
        premierCarteRetourn = this;
        return
    }
    deuxiemeCarteRetourn = this;
    verifCarteRetourn();
}
//Function pour verifier que les deux carte son identique
function verifCarteRetourn(){
    if(premierCarteRetourn.dataset.stock === deuxiemeCarteRetourn.dataset.stock){
        desactiverCarte();
        nombreDeCoup++
        tableauScore[1] = tableauScore[1]+2;
        //Verification que toute les cartes son retournée 
        let touteCarteTourner = false;
        cartes.forEach(carte => {
            if(!carte.classList.contains("flip")) {
                touteCarteTourner = false;
            }
        });
        //Si toute les carte son bien retourné, il gagne
        if(touteCarteTourner) {
            gagner = true;
            afficheScore();
        }
        return;
    }
    detournecarte();
}
//Permet d'eviter de retourné plus de carte que les deux prévu 
function desactiverCarte(){
    premierCarteRetourn.removeEventListener("click", retourneCarte);
    deuxiemeCarteRetourn.removeEventListener("click", retourneCarte);
    resetJeux();
}
//Si elle ne sont pas identique retourne les carte au bout de 15s
function detournecarte(){
    jeuxVerouiller = true;
    setTimeout(()=>{
        premierCarteRetourn.classList.remove("flip");
        deuxiemeCarteRetourn.classList.remove("flip");
        --tableauScore[1];
        nombreDeCoup++
        resetJeux();
    }, 1200);
}
function resetJeux(){
    [carteRetourné,jeuxVerouiller]=[false,false];
    [premierCarteRetourn, deuxiemeCarteRetourn]=[null,null]
}
//function immédiatement ouverte elle s'xécute elle même juste 
//après sa décalrationb cela permet pour melanger les carte 
(function melange(){
    cartes.forEach(card => {
        let posissionAléa = Math.floor(Math.random()*16);
        card.style.order = posissionAléa;
    });
})();
//Une écoute sur le clique d'une carte
cartes.forEach(carte => carte.addEventListener("click",retourneCarte));
//Ecoute sur la bar d'espace
document.addEventListener("keydown",function(event){
    //32 = barre d'espace
    if(event.keyCode === 32){
        //Reset du jeux
        resetJeux();
        //On mélange
        (function melange(){
    cartes.forEach(card => {
        let posissionAléa = Math.floor(Math.random()*16);
        card.style.order = posissionAléa;
    });
})();   // On suprime la classe flip de toute nos cartes
        cartes.forEach(carte => carte.classList.remove("flip"));
        //On remet l'écouteur d'écoute sur le click
        cartes.forEach(carte => carte.addEventListener("click", retourneCarte));
    }
})
function afficheScore(){
            tableauScore[0] = localStorage.getItem("user_name");
            console.log(tableauScore[0])
            tableauScore[2] = dateDuJour;

            const ajoutNom = document.getElementById("ajout-nom");
            const ajoutScore = document.getElementById("ajout-score");
            const ajoutDate = document.getElementById("ajout-date");
            ajoutNom.textContent = tableauScore[0];
            ajoutScore.textContent = tableauScore[1];
            ajoutDate.textContent = tableauScore[2];
}