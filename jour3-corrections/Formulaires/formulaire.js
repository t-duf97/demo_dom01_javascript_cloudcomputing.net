const formulaire = document.getElementById("formulaire");

const inputPrenom = document.getElementById("prenom");
const inputAge = document.getElementById("age");
const selectPays = document.getElementById("pays");
const checkboxConditions = document.getElementById("conditions");

const erreurPrenom = document.getElementById("erreurPrenom");
const erreurAge = document.getElementById("erreurAge");
const erreurConditions = document.getElementById("erreurConditions");

const recapitulatif = document.getElementById("recapitulatif");

formulaire.addEventListener("submit", function (event) {
    // Empêche le rechargement de la page
    event.preventDefault();

    // On efface les messages de la soumission précédente
    erreurPrenom.textContent = "";
    erreurAge.textContent = "";
    erreurConditions.textContent = "";
    recapitulatif.textContent = "";

    let estValide = true;

    // Prénom : au moins 2 caractères (espaces au début et à la fin ignorés)
    const prenom = inputPrenom.value.trim();
    if (prenom.length < 2) {
        erreurPrenom.textContent = "Le prénom doit contenir au moins 2 caractères.";
        estValide = false;
    }

    // Âge : entre 18 et 99 (un champ vide donne NaN, donc invalide)
    const age = Number(inputAge.value);
    if (inputAge.value === "" || isNaN(age) || age < 18 || age > 99) {
        erreurAge.textContent = "L'âge doit être compris entre 18 et 99.";
        estValide = false;
    }

    // Conditions d'utilisation : la case doit être cochée
    if (!checkboxConditions.checked) {
        erreurConditions.textContent = "Vous devez accepter les conditions d'utilisation.";
        estValide = false;
    }

    if (!estValide) {
        return;
    }

    // Tout est valide : on affiche le récapitulatif
    const pays = selectPays.value === ""
        ? "Non renseigné"
        : selectPays.options[selectPays.selectedIndex].text;

    const titre = document.createElement("h2");
    titre.textContent = "Récapitulatif";

    const lignePrenom = document.createElement("p");
    lignePrenom.textContent = `Prénom : ${prenom}`;

    const ligneAge = document.createElement("p");
    ligneAge.textContent = `Âge : ${age}`;

    const lignePays = document.createElement("p");
    lignePays.textContent = `Pays : ${pays}`;

    const ligneConditions = document.createElement("p");
    ligneConditions.textContent = "Conditions d'utilisation : acceptées";

    //Ajoute les différents éléments à récapitulatif
    recapitulatif.append(titre, lignePrenom, ligneAge, lignePays, ligneConditions);

});
