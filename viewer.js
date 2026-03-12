let scene = new THREE.Scene()
scene.background = new THREE.Color(0x111111)

let camera = new THREE.PerspectiveCamera(
75,
600/400,
0.1,
1000
)

camera.position.set(0,0,120)

let renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(600,400)

document.getElementById("viewer").appendChild(renderer.domElement)



/* LUMIERES */

let light1 = new THREE.DirectionalLight(0xffffff,1)
light1.position.set(100,100,100)

scene.add(light1)

let light2 = new THREE.AmbientLight(0xffffff,0.6)
scene.add(light2)



/* STL LOADER */

let loader = new THREE.STLLoader()

let corps
let contour
let logo



/* CORPS */

loader.load("models/piece_corps.STL", function (geometry){

let material = new THREE.MeshStandardMaterial({
color:0x7a00ff,
roughness:0.4,
metalness:0.2
})

corps = new THREE.Mesh(geometry,material)

corps.rotation.x = -Math.PI/2

scene.add(corps)

})



/* CONTOUR */

loader.load("models/piece_contour.STL", function (geometry){

let material = new THREE.MeshStandardMaterial({
color:0xffffff
})

contour = new THREE.Mesh(geometry,material)

contour.rotation.x = -Math.PI/2

scene.add(contour)

})



/* LOGO */

loader.load("models/piece_logo.STL", function (geometry){

let material = new THREE.MeshStandardMaterial({
color:0x000000
})

logo = new THREE.Mesh(geometry,material)

logo.rotation.x = -Math.PI/2

scene.add(logo)

})



/* ROTATION SOURIS */

let isDragging = false
let prev = {x:0,y:0}

renderer.domElement.addEventListener("mousedown",()=>isDragging=true)
renderer.domElement.addEventListener("mouseup",()=>isDragging=false)

renderer.domElement.addEventListener("mousemove",(e)=>{

if(!isDragging) return

let dx = e.offsetX - prev.x
let dy = e.offsetY - prev.y

scene.rotation.y += dx * 0.01
scene.rotation.x += dy * 0.01

prev = {x:e.offsetX,y:e.offsetY}

})



/* ZOOM MOLETTE */

renderer.domElement.addEventListener("wheel",(e)=>{

camera.position.z += e.deltaY * 0.05

})



/* CHANGEMENT COULEURS */

document.getElementById("colorCorps").addEventListener("input",(e)=>{

if(corps) corps.material.color.set(e.target.value)

})

document.getElementById("colorContour").addEventListener("input",(e)=>{

if(contour) contour.material.color.set(e.target.value)

})

document.getElementById("colorLogo").addEventListener("input",(e)=>{

if(logo) logo.material.color.set(e.target.value)

})



/* ANIMATION */

function animate(){

requestAnimationFrame(animate)

renderer.render(scene,camera)

}

animate()
