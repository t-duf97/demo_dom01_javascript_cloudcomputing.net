'use strict';

const titre = document.getElementById('titre');
const paragraphe = document.querySelector('.intro');
const bouton1 = document.getElementById('bouton1');
const bouton2 = document.getElementById('bouton2');
const premierItem = document.querySelector('li');


titre.textContent = 'Interaction avec le DOM';
paragraphe.textContent = 'Ce paragraphe a été modifié.';
console.log(paragraphe.textContent);
console.log(titre.textContent);

bouton1.addEventListener('click', function(){
    paragraphe.classList.add('surligne');
    console.log(paragraphe.className);
})

bouton2.addEventListener('click', function(){
  /*  if (paragraphe.classList.contains('grand')) {
        paragraphe.classList.remove('grand');
    } else {
        paragraphe.classList.add('grand');
    }*/

    paragraphe.classList.toggle('grand');
});

premierItem.addEventListener('click', function(){
    if (premierItem.textContent.endsWith(' (selectionné)')) {
        premierItem.textContent = premierItem.textContent.replace(' (selectionné)', '');
    } else {
        premierItem.textContent = premierItem.textContent + ' (selectionné)';
    }
});



const champNote = document.getElementById('note');
const boutonEvaluer = document.getElementById('evaluer');
const paragrapheAppreciation = document.getElementById('appreciation');


boutonEvaluer.addEventListener('click', function(){
    const note = champNote.value === '' ? null : champNote.value;
    let appreciation;

    if (note === null) {
        paragrapheAppreciation.textContent = 'Aucune note encodée!';
    } else {
        if (note >= 18) {
            appreciation = 'Excellent!';
        } else if (note >= 14) {
            appreciation = 'Bien';
        } else if(note >= 10) {
            appreciation = 'Suffisant!'
        } else {
            appreciation = 'Insuffisant';
        }
        paragrapheAppreciation.textContent = `${note}/20 : ${appreciation}`;
    }
})
