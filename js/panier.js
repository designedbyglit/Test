let cart = JSON.parse(localStorage.getItem("cart")) || []

function addToCart(name, price){

cart.push({
name:name,
price:price
})

localStorage.setItem("cart", JSON.stringify(cart))

updateCartCount()

}

function updateCartCount(){

const count = document.getElementById("cart-count")

if(count){
count.innerText = cart.length
}

}

function clearCart(){

localStorage.removeItem("cart")

cart = []

updateCartCount()

}

window.onload = updateCartCount
