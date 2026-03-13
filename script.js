
const products = document.querySelectorAll(".product")

window.addEventListener("scroll",()=>{

products.forEach((p)=>{

const position = p.getBoundingClientRect().top

const screenPosition = window.innerHeight/1.2

if(position < screenPosition){

p.classList.add("visible")

}

})

})
