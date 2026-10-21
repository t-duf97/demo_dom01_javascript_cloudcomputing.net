// ============================================================
// Correctif — Réservation de cinéma (version avec bonus)
// ============================================================

// ---------- Étape 1 : la collection ----------
const reservations = [
    { film: 'Dune', places: 2, prix: 12.5, seance: 'imax' },
    { film: 'Le Roi Lion', places: 3, prix: 9.5, seance: '2d' }
];

// Éléments du DOM utilisés dans le script
const form = document.getElementById('form-reservation');
const listeReservations = document.getElementById('reservations');
const total = document.getElementById('total');
const message = document.getElementById('message');
const compteARebours = document.getElementById('compte-a-rebours');

// Id du timeout en cours pour le message (voir étape 6)
let timeoutMessageId;


// ---------- Étape 2 : les calculs ----------
function calculerPrixReservation(reservation) {
    return reservation.places * reservation.prix;
}

function calculerNombrePlaces() {
    let nombre = 0;
    for (const reservation of reservations) {
        nombre += reservation.places;
    }
    return nombre;
}

function calculerTotal() {
    let somme = 0;
    for (const reservation of reservations) {
        somme += calculerPrixReservation(reservation);
    }

    // Réduction groupe : -10 % à partir de 10 places
    if (calculerNombrePlaces() >= 10) {
        somme = somme * 0.9;
    }
    return somme;
}


// ---------- Étape 3 : l'affichage ----------
function obtenirLibelleSeance(seance) {
    switch (seance) {
        case '2d':
            return '2D';
        case '3d':
            return '3D';
        case 'imax':
            return 'IMAX';
        case 'vip':
            return 'Salle VIP';
        default:
            return 'Inconnue';
    }
}

function afficherReservations() {
    // On vide la liste
    listeReservations.innerHTML = '';

    // Un <li> par réservation
    reservations.forEach((reservation, index) => {
        const li = document.createElement('li');
        const prix = calculerPrixReservation(reservation).toFixed(2);
        const libelle = obtenirLibelleSeance(reservation.seance);
        li.textContent = `${reservation.film} x${reservation.places} — ${prix} € (${libelle}) `;

        // Bonus 1 : bouton « Annuler »
        const bouton = document.createElement('button');
        bouton.textContent = 'Annuler';
        bouton.addEventListener('click', () => {
            reservations.splice(index, 1);
            afficherReservations();
        });
        li.appendChild(bouton);

        listeReservations.appendChild(li);
    });

    // Le total, avec 2 décimales
    total.textContent = `Total : ${calculerTotal().toFixed(2)} €`;

    // Mention de la réduction groupe
    if (calculerNombrePlaces() >= 10) {
        total.textContent += ' (Réduction groupe -10 % appliquée)';
    }
}


// ---------- Étape 4 : la validation ----------
function validerReservation(reservation) {
    if (reservation.film.length < 2) {
        throw new Error('Le nom du film doit contenir au moins 2 caractères.');
    }
    if (isNaN(reservation.places) || reservation.places < 1 || reservation.places > 10) {
        throw new Error('Le nombre de places doit être compris entre 1 et 10.');
    }
    if (isNaN(reservation.prix) || reservation.prix <= 0) {
        throw new Error('Le prix par place doit être supérieur à 0.');
    }
}


// ---------- Bonus 2 : même film, même type de séance ----------
function trouverReservation(film, seance) {
    for (const reservation of reservations) {
        // Comparaison sans tenir compte des majuscules : « dune » = « Dune »
        if (reservation.film.toLowerCase() === film.toLowerCase() && reservation.seance === seance) {
            return reservation;
        }
    }
    return undefined;
}


// ---------- Étape 6 (1) : message temporaire (setTimeout) ----------
function afficherMessage(texte) {
    message.textContent = texte;

    // Si un message précédent devait encore s'effacer, on annule son timer
    clearTimeout(timeoutMessageId);

    timeoutMessageId = setTimeout(() => {
        message.textContent = '';
    }, 3000);
}


// ---------- Étape 5 : le formulaire ----------
form.addEventListener('submit', (event) => {
    // La page ne se recharge pas
    event.preventDefault();

    // Récupération des valeurs et création de l'objet
    const reservation = {
        film: form.film.value.trim(),
        places: parseInt(form.places.value),
        prix: parseFloat(form.prix.value),
        seance: form.seance.value
    };

    try {
        validerReservation(reservation);

        // Bonus 2 : si le film est déjà réservé dans ce type de séance, on ajoute les places
        const existante = trouverReservation(reservation.film, reservation.seance);
        if (existante) {
            if (existante.places + reservation.places > 10) {
                throw new Error(`Maximum 10 places par réservation (déjà ${existante.places} pour ce film).`);
            }
            existante.places += reservation.places;
        }
        else {
            reservations.push(reservation);
        }

        afficherReservations();
        form.reset();
        afficherMessage('Réservation ajoutée !');

        // Bonus 3 : on relance le compte à rebours
        demarrerCompteARebours();
    }
    catch (error) {
        afficherMessage(error.message);
    }
});


// ---------- Étape 6 (2 et 3) : le compte à rebours (setInterval) ----------
let secondesRestantes;
let intervalId;

function afficherCompteARebours() {
    compteARebours.textContent = `Votre réservation expire dans ${secondesRestantes} s`;
}

// Bonus 3 : le compte à rebours est dans une fonction pour pouvoir le relancer
function demarrerCompteARebours() {
    // On arrête l'ancien compte à rebours, sinon deux intervalles tourneraient en même temps
    clearInterval(intervalId);

    secondesRestantes = 120;
    afficherCompteARebours();

    intervalId = setInterval(() => {
        secondesRestantes--;

        if (secondesRestantes > 0) {
            afficherCompteARebours();
        }
        else {
            clearInterval(intervalId);
            reservations.splice(0);
            afficherReservations();
            compteARebours.textContent = 'Temps écoulé : votre réservation a expiré.';
        }
    }, 1000);
}

demarrerCompteARebours();


// ---------- Affichage initial ----------
afficherReservations();
