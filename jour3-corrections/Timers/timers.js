const horloge = document.getElementById("horloge");
const btnPause = document.getElementById("pause");
const btnReprendre = document.getElementById("reprendre");

let intervalId = null;

function afficherHeure() {
    const maintenant = new Date();
    const heures = maintenant.getHours().toString().padStart(2, "0");
    const minutes = maintenant.getMinutes().toString().padStart(2, "0");
    const secondes = maintenant.getSeconds().toString().padStart(2, "0");
    horloge.textContent = `${heures}:${minutes}:${secondes}`;
}

function demarrer() {
    if (intervalId === null) {
        afficherHeure();
        intervalId = setInterval(afficherHeure, 1000);
    }
}

btnPause.addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
});

btnReprendre.addEventListener("click", demarrer);

demarrer();
