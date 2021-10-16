const form = document.querySelector(".firstname-form");
const submitFirstname = document.querySelector(".firstname-input");
const deathPerson = document.querySelector(".death-person");


const promo = [
    "geoffroy",
    "bastien",
    "anais",
    "antonia",
    "claire",
    "cristi",
    "cécile",
    "emma",
    "kachiri",
    "laurie",
    "léo",
    "malik",
    "maxime",
    "thomas",
    "yohann",
    "benjamin",
    "daniel",
    "gaetan",
    "giovanny",
    "julien",
    "sylvain",
    "charlie",
    "loic",
    "lionel",
    "nicolas",
    "ryan"
];
let score = 0;
let temps = 120;
const timerElement = document.querySelector(".timer");
const scoreElement = document.querySelector(".score");

const firstname = prompt("Quel est ton prénom ?");
for(let i=0; i<promo.length; i++){
    if(firstname == promo[i]){
        promo.splice(i, 1);
    }
}

// Fonction pour jouer le son pour l'écriture du nom de la personne
const song = new Audio('./src/Audio.mp3');
// const playAudio = (person) => {
//     const personLength = person.length;
//     for (let i = 0; i < personLength; i++){
//         song.play();
//     }
// }

form.onsubmit = function(event) {
    event.preventDefault();

    if(submitFirstname.value == "anas" || submitFirstname.value == "cyril"){
        alert("IMPOSSIBLE !!! Cet homme est immortel !");
    }
    if(submitFirstname.value == firstname){
        alert("Tu t'es suicidé... imbécile...");
        location.reload();
    }
    
    for(let i=0; i<promo.length; i++){
        if(submitFirstname.value == promo[i]){
            const dead = document.createElement("li");
            // playAudio(deathPerson);
            song.play();
            dead.innerHTML = submitFirstname.value;
            dead.classList.add("dead");
            deathPerson.appendChild(dead);
            promo.splice(i, 1);
            score += 1;
            scoreElement.innerHTML = "Tu as tué " + score + " personnes. Il te reste " + promo.length + " victimes." ;
        }   
    }   
    submitFirstname.value = "";

}

const reduceTimer = () => {
    temps --;
    timerElement.innerHTML = "Il te reste " + temps + " secondes.";
    if(promo.length == 0){
        alert("Bon ba t'as tué tous le monde... POULOULOU comment c'est trop la classe !");
        location.reload();
    }
    if(temps == 0){
        if(score < 10){
            alert("C'est FINI bro' !!! Ton score est de " + score + ". Franchement c'est pas ouf...");
        } else if(score < 20){
            alert("C'est FINI bro' !!! Ton score est de " + score + ". Pas mal mais bon tu peux faire mieux non ?");
        } else if(score >= 20){
            alert("C'est FINI bro' !!! Ton score est de " + score + ". P'sartek !");
        }
        location.reload();
    }
}
setInterval(reduceTimer, 1000);
