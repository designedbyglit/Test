const products = document.querySelectorAll(".product")

window.addEventListener("scroll",()=>{

products.forEach((product)=>{

const position = product.getBoundingClientRect().top
const screenPosition = window.innerHeight / 1.2

if(position < screenPosition){
product.classList.add("visible")
}

})

})
