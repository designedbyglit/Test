let scene = new THREE.Scene()

scene.background = new THREE.Color(0xf0f0f0)



let camera = new THREE.PerspectiveCamera(
75,
600/400,
0.1,
1000
)

camera.position.set(0,40,120)



let renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(600,400)

renderer.shadowMap.enabled = true

document.getElementById("viewer").appendChild(renderer.domElement)



/* LUMIERES */

let light1 = new THREE.DirectionalLight(0xffffff,1)

light1.position.set(100,200,100)
light1.castShadow = true

scene.add(light1)

let light2 = new THREE.AmbientLight(0xffffff,0.6)

scene.add(light2)



/* SOL */

let planeGeometry = new THREE.PlaneGeometry(500,500)

let planeMaterial = new THREE.ShadowMaterial({opacity:0.2})

let plane = new THREE.Mesh(planeGeometry,planeMaterial)

plane.rotation.x = -Math.PI/2
plane.position.y = -10

plane.receiveShadow = true

scene.add(plane)



/* STL LOADER */

let loader = new THREE.STLLoader()

let corps
let contour
let logo



/* CORPS */

loader.load("models/piece_corps.STL", function (geometry){

let material = new THREE.MeshStandardMaterial({
color:0x7a00ff,
roughness:0.35
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

renderer.domElement.addEventListener("mousedown",()=>{

isDragging = true

})

renderer.domElement.addEventListener("mouseup",()=>{

isDragging = false

})

renderer.domElement.addEventListener("mousemove",(e)=>{

if(!isDragging) return

let dx = e.offsetX - prev.x
let dy = e.offsetY - prev.y

scene.rotation.y += dx * 0.01
scene.rotation.x += dy * 0.01

prev = {x:e.offsetX,y:e.offsetY}

})



/* ZOOM */

renderer.domElement.addEventListener("wheel",(e)=>{

camera.position.z += e.deltaY * 0.05

})



/* SELECTION PIECE */

let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()

let selectedPiece = null



renderer.domElement.addEventListener("click",(event)=>{

mouse.x = (event.offsetX / 600) * 2 - 1
mouse.y = -(event.offsetY / 400) * 2 + 1

raycaster.setFromCamera(mouse,camera)

let intersects = raycaster.intersectObjects(scene.children)

if(intersects.length > 0){

selectedPiece = intersects[0].object

}

})



/* CHANGER COULEUR */

document.getElementById("colorCorps").addEventListener("input",(e)=>{

if(selectedPiece){

selectedPiece.material.color.set(e.target.value)

}

})



/* EXPORT IMAGE */

function exportImage(){

let link = document.createElement("a")

link.download = "piece_config.png"

link.href = renderer.domElement.toDataURL()

link.click()

}



/* ANIMATION */

function animate(){

requestAnimationFrame(animate)

renderer.render(scene,camera)

}

animate()
