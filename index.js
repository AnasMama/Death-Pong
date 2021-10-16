const form = document.querySelector(".firstname-form");
const submitFirstname = document.querySelector(".firstname-input");
const deathPerson = document.querySelector(".death-person");

form.onsubmit = function(event) {
    event.preventDefault();


    if (submitFirstname.value === 'anas' || submitFirstname.value === 'cyril'){
        alert("Impossible de tuer cette personne !")
    } else {
        const dead = document.createElement("li");
        dead.innerHTML = submitFirstname.value;
        dead.classList.add("dead");
        deathPerson.appendChild(dead);
    }


    
}