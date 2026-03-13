let cart = JSON.parse(localStorage.getItem("cart")) || []

function addToCart(name, price){

cart.push({name,price})

localStorage.setItem("cart",JSON.stringify(cart))

updateCartCount()

alert("Produit ajouté au panier")

}

function updateCartCount(){

const count = cart.length

const el = document.getElementById("cart-count")

if(el){
el.innerText = count
}

}

function loadCart(){

const container = document.getElementById("cart-items")

if(!container) return

container.innerHTML = ""

let total = 0

cart.forEach(item => {

const div = document.createElement("div")

div.className = "cart-item"

div.innerHTML = `
<span>${item.name}</span>
<span>${item.price}€</span>
`

container.appendChild(div)

total += item.price

})

document.getElementById("total").innerText = total + "€"

}

updateCartCount()
loadCart()
