
let cart = JSON.parse(localStorage.getItem("cart")) || []

let container = document.getElementById("cart")

let total = 0

cart.forEach(item =>{

let div = document.createElement("div")

div.innerHTML = item.name + " - " + item.price + "€"

container.appendChild(div)

total += item.price

})

document.getElementById("total").innerHTML = "Total : " + total + "€"


function clearCart(){

localStorage.removeItem("cart")

location.reload()

}
