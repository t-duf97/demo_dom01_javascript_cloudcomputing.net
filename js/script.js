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