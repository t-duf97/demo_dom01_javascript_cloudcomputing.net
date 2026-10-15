'use strict';

const champNombre1 = document.getElementById('nombre1');
const champNombre2 = document.getElementById('nombre2');
const listeOperation = document.getElementById('operation');
const boutonCalculer = document.getElementById('calculer');
const paragrapheResultat = document.getElementById('resultat');

boutonCalculer.addEventListener('click', function() {
    const nombre1 = champNombre1.valueAsNumber;
    const nombre2 = champNombre2.valueAsNumber;
    const operation = listeOperation.value;


    if (isNaN(nombre1) || isNaN(nombre2)) {
        paragrapheResultat.textContent = "Veuillez introduire deux nombres!";
        paragrapheResultat.classList.add('erreur');
    } else if (operation === "/" && nombre2 === 0) {
        paragrapheResultat.textContent = "Division par zéro impossible!"
        paragrapheResultat.classList.add('erreur');
    } else {
    let resultat;
    let symbole;
    switch(operation) {
        case '+':
            resultat = nombre1 + nombre2;
            symbole = "+";
            break;
        case '-':
            resultat = nombre1 - nombre2;
            symbole = "-";
            break;
        case '*':
            resultat = nombre1 * nombre2;
            symbole = "x";
            break;
        case '/':
            resultat = nombre1 / nombre2;
            symbole = ":";
            break;
    }
    paragrapheResultat.textContent = `${nombre1} ${symbole} ${nombre2} = ${parseFloat(resultat.toFixed(2))} `;
    paragrapheResultat.classList.remove('erreur');
}
});