'use strict';

const produits = [
  { nom: 'Clavier', prix: 49.9, stock: 12 },
  { nom: 'Souris', prix: 24.5, stock: 0 },
  { nom: 'Écran', prix: 279, stock: 4 },
  { nom: 'Webcam', prix: 59.99, stock: 7 },
  { nom: 'Casque', prix: 89, stock: 0 },
  { nom: 'Hub USB', prix: 34.9, stock: 15 }
];

const catalogue = document.getElementById('catalogue');
const resume = document.getElementById('resume');
const inputRecherche = document.getElementById('input-recherche');


const valeurStock = (liste) => {
    let total = 0;
    for (const produit of liste) {
        total += produit.prix * produit.stock;
    }
    return total;
}

const afficherProduits = (liste) => {
    catalogue.innerHTML = '';
   
    liste.forEach((produit) => {
        const li = document.createElement('li');
        if (produit.stock ===0) {
            li.textContent = `${produit.nom} - ${produit.prix.toFixed(2)}€ - Rupture de stock`;
            li.classList.add('rupture');
        } else {
            li.textContent = `${produit.nom} - ${produit.prix.toFixed(2)}€ - Stock: ${produit.stock}`;
        }
        catalogue.append(li);
    });

    resume.textContent = `${liste.length} produits - valeur du stock : ${valeurStock(liste).toFixed(2)}€`;
};



document.getElementById('btn-tous').addEventListener('click', () => {
    afficherProduits(produits);
});

document.getElementById('btn-en-stock').addEventListener('click', () => {
    afficherProduits(produits.filter(produit => produit.stock > 0));
});

/*document.getElementById('btn-prix-croissant').addEventListener('click', () => {
    afficherProduits(produits.sort((a, b) => a.prix - b.prix));
});*/


document.getElementById('btn-prix-croissant').addEventListener('click', () => {
    afficherProduits(produits.slice().sort((a, b) => a.prix - b.prix));
});

document.getElementById('btn-prix-decroissant').addEventListener('click', () => {
    afficherProduits(produits.slice().sort((a, b) => b.prix - a.prix));
});

document.getElementById('btn-nom').addEventListener('click', () => {
    afficherProduits(produits.slice().sort((a, b) => a.nom.localeCompare(b.nom)));
});


document.getElementById('btn-recherche').addEventListener('click', () => {
    const texte = inputRecherche.value.trim().toLowerCase();
    afficherProduits(produits.filter((p) => p.nom.toLowerCase().includes(texte)));
});



const inputNom = document.getElementById('input-nom');
const inputPrix = document.getElementById('input-prix');
const inputStock = document.getElementById('input-stock');

const messageAjout = document.getElementById('message-ajout');

document.getElementById('btn-ajouter').addEventListener('click', () => {
    const nom = inputNom.value.trim();
    const prix = inputPrix.valueAsNumber;
    const stock = inputStock.valueAsNumber;

    if (nom === '') {
        messageAjout.textContent = 'Le nom du produit est requis.';
        messageAjout.classList.add('erreur');
    } else if (isNaN(prix) || prix <= 0) {
        messageAjout.textContent = 'Le prix doit être un nombre positif.';
        messageAjout.classList.add('erreur');
    } else if (isNaN(stock) || stock < 0) {
        messageAjout.textContent = 'Le stock doit être un nombre positif ou nul.';
        messageAjout.classList.add('erreur');
    } else if (produits.some(p => p.nom.toLowerCase() === nom.toLowerCase())) {
        messageAjout.textContent = 'Un produit avec ce nom existe déjà.';
        messageAjout.classList.add('erreur');
    } else { 
        produits.push({nom: nom, prix: prix, stock: stock});
        afficherProduits(produits);

        messageAjout.textContent =  `Produit "${nom}" ajouté avec succès.`;
        messageAjout.classList.remove('erreur');
        inputNom.value = '';
        inputPrix.value = '';
        inputStock.value = '';
    }
});