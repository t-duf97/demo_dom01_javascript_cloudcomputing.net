'use strict';

const message = document.getElementById('message');
const titreNom = document.getElementById('nom');
const image = document.getElementById('image');
const paragrapheTypes = document.getElementById('types');
const API = 'https://pokeapi.co/api/v2/pokemon/';


async function chargerPokemon(nom) {

    message.textContent =  'Chargement en cours...';
    try {
        const reponse = await fetch(`${API}/${nom}`);
        if (!reponse.ok) {
            message.textContent = `Chargement interrompu/ Erreur HTTP : ${reponse.status}`;
            return;
        }
    
        const pokemon = await reponse.json();
        titreNom.textContent = pokemon.name;
        
        image.src = pokemon.sprites.front_default;
        paragrapheTypes.textContent = pokemon.types.map((t) => t.type.name).join(', ');
        message.textContent = '';
    } catch (erreur) {
        message.textContent = 'Impossible de joindre l API';
    };
}

chargerPokemon('pikachu');
