'use strict';

const message = document.getElementById('message');
const titreNom = document.getElementById('nom');
const image = document.getElementById('image');
const paragrapheTypes = document.getElementById('types');
const API = 'https://pokeapi.co/api/v2/pokemon/';
const btnInterval = document.getElementById('btnInterval');
const btnStop = document.getElementById('btnStop');
const ListePokemon = ["pikachu", "charmander", "squirtle", "bulbasaur"];

let IntervalId = null;
let index = 1;

btnStop.disabled = true;

async function chargerPokemon(nom) {
    message.textContent = 'Chargement en cours...';
    try {
        const reponse = await fetch(`${API}${nom}`);
        if (!reponse.ok) {
            message.textContent = `Chargement interrompu / Erreur HTTP : ${reponse.status}`;
            return;
        }

        const pokemon = await reponse.json();
        titreNom.textContent = pokemon.name;
        image.src = pokemon.sprites.front_default;
        image.alt = pokemon.name;
        paragrapheTypes.textContent = pokemon.types.map((t) => t.type.name).join(', ');
        message.textContent = '';
    } catch (erreur) {
        message.textContent = "Impossible de joindre l'API";
    }
}

function pokemonSuivant() {
    //Autre manière de faire
    /*
    if (index === ListePokemon.length ) {
        index = 0;
    }
    */
    chargerPokemon(ListePokemon[index])
    //index++;
    index = (index + 1) % ListePokemon.length;
}

chargerPokemon('pikachu');

btnInterval.addEventListener("click", () => {
    btnStop.disabled = false;
    btnInterval.disabled = true;

    if (IntervalId !== null) {
        clearInterval(IntervalId);
    }
    IntervalId = setInterval(pokemonSuivant, 2000);
})

btnStop.addEventListener("click", () => {

    btnStop.disabled = true;
    btnInterval.disabled = false;
    clearInterval(IntervalId);

})