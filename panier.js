let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {

cart.push({
name:name,
price:price
});

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

alert(name + " ajouté au panier");

}

function updateCartCount(){

let count = cart.length;

let el = document.getElementById("cart-count");

if(el){
el.innerText = count;
}

}

function displayCart(){

let container = document.getElementById("cart-items");

if(!container) return;

container.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

let div=document.createElement("div");

div.className="cart-item";

div.innerHTML=`

<span>${item.name}</span>

<span>${item.price} €</span>

<button onclick="removeItem(${index})">Supprimer</button>

`;

container.appendChild(div);

total+=item.price;

});

let totalDiv=document.getElementById("total");

if(totalDiv){
totalDiv.innerText="Total : "+total+" €";
}

}

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart", JSON.stringify(cart));

displayCart();

updateCartCount();

}

window.onload=function(){

updateCartCount();

displayCart();

}
