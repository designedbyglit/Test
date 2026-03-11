
/* ANIMATION SCROLL PRODUITS */

const produits = document.querySelectorAll(".produit")

window.addEventListener("scroll", () => {

produits.forEach((p) => {

const position = p.getBoundingClientRect().top
const screenPosition = window.innerHeight / 1.2

if(position < screenPosition){

p.classList.add("visible")

}

})

})



/* PANIER SIMPLE */

let panier = []

function ajouterPanier(nom, prix){

panier.push({
nom: nom,
prix: prix
})

alert("Produit ajouté au panier")

console.log(panier)

}

