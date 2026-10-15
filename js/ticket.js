'use strict';

const champArticle = document.getElementById('article');
const champPrix = document.getElementById('prix');
const champQuantite = document.getElementById('quantite');
const message = document.getElementById('message');
const ticket = document.getElementById('ticket');
const paragrapheVide = document.getElementById('vide');
const paragrapheTotal = document.getElementById('total');
const paragrapheLivraison = document.getElementById('livraison');
const paragrapheDate = document.getElementById('date-ticket');

const SEUIL_LIVRAISON = 50;
let totalCentimes = 0;

document.getElementById('btn-ajouter').addEventListener('click', function() {
    const nom = champArticle.value;
    const prix = champPrix.valueAsNumber;
    const quantite = champQuantite.valueAsNumber;

    if (nom === '') {
        message.textContent = 'Veuillez saisir un nom d’article.';
        message.classList.add('erreur');
    } else if (isNaN(prix) || prix <= 0) {
        message.textContent = 'Veuillez saisir un prix supérieur à 0.';
        message.classList.add('erreur');
    } else if (isNaN(quantite) || quantite < 1) {
        message.textContent = 'La quantité doit être au moins 1.';
        message.classList.add('erreur');
    } else {
        message.textContent = '';
        message.classList.remove('erreur');


        if (paragrapheDate.textContent === '') {
            paragrapheDate.textContent = 'Ticket du ' + new Date().toLocaleString('fr-BE');
        }

        const montantCentimes = Math.round(prix * 100) * quantite;

        const li = document.createElement('li');
        li.textContent = `${quantite} × ${nom} - ${prix.toFixed(2)} € = ${(montantCentimes / 100).toFixed(2)} €`;

        const btnRetirer = document.createElement('button');
        btnRetirer.textContent = 'Retirer';
        btnRetirer.addEventListener('click', function() {
            li.remove();
            totalCentimes -= montantCentimes;

            const total = totalCentimes / 100;
            paragrapheTotal.textContent = `Total : ${total.toFixed(2)} €`;
            paragrapheLivraison.textContent = total >= SEUIL_LIVRAISON
                ? 'Livraison gratuite !'
                : `Encore ${(SEUIL_LIVRAISON - total).toFixed(2)} € pour la livraison gratuite.`;
            if (total >= SEUIL_LIVRAISON) {
                paragrapheLivraison.classList.add('gratuite');
            } else {
                paragrapheLivraison.classList.remove('gratuite');
            }
            if (ticket.firstElementChild === null) {
                paragrapheVide.classList.remove('cache');
            }
        });

        li.append(btnRetirer);
        ticket.append(li);
        paragrapheVide.classList.add('cache');

        totalCentimes += montantCentimes;

        const total = totalCentimes / 100;
        paragrapheTotal.textContent = `Total : ${total.toFixed(2)} €`;
        paragrapheLivraison.textContent = total >= SEUIL_LIVRAISON
            ? 'Livraison gratuite !'
            : `Encore ${(SEUIL_LIVRAISON - total).toFixed(2)} € pour la livraison gratuite.`;
        if (total >= SEUIL_LIVRAISON) {
            paragrapheLivraison.classList.add('gratuite');
        } else {
            paragrapheLivraison.classList.remove('gratuite');
        }

        champArticle.value = '';
        champPrix.value = '';
        champQuantite.value = '1';
    }
});

document.getElementById('btn-vider').addEventListener('click', function() {
    ticket.innerHTML = '';
    totalCentimes = 0;
    paragrapheTotal.textContent = 'Total : 0.00 €';
    paragrapheLivraison.textContent = `Encore ${SEUIL_LIVRAISON.toFixed(2)} € pour la livraison gratuite.`;
    paragrapheLivraison.classList.remove('gratuite');
    paragrapheVide.classList.remove('cache');
    paragrapheDate.textContent = '';
});