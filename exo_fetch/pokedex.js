'use strict';

const message = document.getElementById('message');
const titreNom = document.getElementById('nom');
const image = document.getElementById('image');
const paragrapheTypes = document.getElementById('types');
const API = 'https://pokeapi.co/api/v2/pokemon/';
const PAR_PAGE = 30;
const DELAI_SPRITE = 3000; // temps entre 2 sprites

const NOMS_SPRITES = ['Face', 'Dos', 'Face shiny', 'Dos shiny'];

const TYPES = {
    normal: {nom : 'Normal', couleur: '#A8A77A'},
    fire: {nom : 'Feu', couleur: '#EE8130'},
    water: {nom : 'Eau', couleur: '#6390F0'},
    electric: {nom : 'Électrik', couleur: '#F7D02C'},
    grass: {nom : 'Plante', couleur: '#7AC74C'},
    ice: {nom : 'Glace', couleur: '#96D9D6'},
    fighting: {nom : 'Combat', couleur: '#C22E28'},
    poison: {nom : 'Poison', couleur: '#A33EA1'},
    ground: {nom : 'Sol', couleur: '#E2BF65'},
    flying: {nom : 'Vol', couleur: '#A98FF3'},
    psychic: {nom : 'Psy', couleur: '#F95587'},
    bug: {nom : 'Insecte', couleur: '#A6B91A'},
    rock: {nom : 'Roche', couleur: '#B6A136'},
    ghost: {nom : 'Spectre', couleur: '#735797'},
    dragon: {nom : 'Dragon', couleur: '#6F35FC'},
    dark: {nom : 'Ténèbres', couleur: '#705746'},
    steel: {nom : 'Acier', couleur: '#B7B7CE'},
    fairy: {nom : 'Fée', couleur: '#D685AD'}
}

const NOMS_STATS = {
    'hp': 'PV',
    'attack': 'Attaque',
    'defense': 'Défense',
    'special-attack': 'Attaque Spéciale',
    'special-defense': 'Défense Spéciale',
    'speed': 'Vitesse'
};

const message = document.getElementById('message');
const voyant = document.getElementById('voyant');
const vueListe = document.getElementById('vue-liste');
const vueDetail = document.getElementById('vue-detail');
const grille = document.getElementById('grille');

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
