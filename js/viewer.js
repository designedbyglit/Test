let scene = new THREE.Scene()

scene.background = new THREE.Color(0xf2f2f2)



let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

camera.position.set(0,50,140)



let renderer = new THREE.WebGLRenderer({antialias:true})

renderer.setSize(window.innerWidth*0.7,window.innerHeight*0.8)

renderer.shadowMap.enabled = true

document.getElementById("viewer").appendChild(renderer.domElement)



/* LUMIERES */

let keyLight = new THREE.DirectionalLight(0xffffff,1)

keyLight.position.set(200,200,200)

keyLight.castShadow = true

scene.add(keyLight)

let fillLight = new THREE.DirectionalLight(0xffffff,0.5)

fillLight.position.set(-200,100,100)

scene.add(fillLight)

let ambient = new THREE.AmbientLight(0xffffff,0.4)

scene.add(ambient)



/* SOL */

let planeGeometry = new THREE.PlaneGeometry(600,600)

let planeMaterial = new THREE.ShadowMaterial({opacity:0.25})

let plane = new THREE.Mesh(planeGeometry,planeMaterial)

plane.rotation.x = -Math.PI/2

plane.position.y = -12

plane.receiveShadow = true

scene.add(plane)



/* STL */

let loader = new THREE.STLLoader()

let pieces = []

function chargerPiece(nom,couleur){

loader.load("models/"+nom,function(geometry){

let material = new THREE.MeshStandardMaterial({

color:couleur,
roughness:0.35,
metalness:0.05

})

let mesh = new THREE.Mesh(geometry,material)

mesh.rotation.x = -Math.PI/2

mesh.castShadow = true

scene.add(mesh)

pieces.push(mesh)

})

}

chargerPiece("piece_corps.STL",0x7a00ff)
chargerPiece("piece_contour.STL",0xffffff)
chargerPiece("piece_logo.STL",0x000000)



/* ROTATION SOURIS */

let isDragging=false
let prev={x:0,y:0}

renderer.domElement.addEventListener("mousedown",()=>isDragging=true)

renderer.domElement.addEventListener("mouseup",()=>isDragging=false)

renderer.domElement.addEventListener("mousemove",(e)=>{

if(!isDragging)return

let dx=e.offsetX-prev.x
let dy=e.offsetY-prev.y

scene.rotation.y+=dx*0.01
scene.rotation.x+=dy*0.01

prev={x:e.offsetX,y:e.offsetY}

})



/* ZOOM */

renderer.domElement.addEventListener("wheel",(e)=>{

camera.position.z+=e.deltaY*0.05

})



/* SELECTION PIECE */

let raycaster=new THREE.Raycaster()

let mouse=new THREE.Vector2()

let selectedPiece=null

renderer.domElement.addEventListener("click",(event)=>{

mouse.x=(event.offsetX/renderer.domElement.clientWidth)*2-1
mouse.y=-(event.offsetY/renderer.domElement.clientHeight)*2+1

raycaster.setFromCamera(mouse,camera)

let intersects=raycaster.intersectObjects(pieces)

if(intersects.length>0){

selectedPiece=intersects[0].object

}

})



/* CHANGEMENT COULEUR */

document.getElementById("colorPicker").addEventListener("input",(e)=>{

if(selectedPiece){

selectedPiece.material.color.set(e.target.value)

}

})



/* EXPORT IMAGE */

function exportImage(){

let link=document.createElement("a")

link.download="configurateur_piece.png"

link.href=renderer.domElement.toDataURL()

link.click()

}



/* RENDER */

function animate(){

requestAnimationFrame(animate)

renderer.render(scene,camera)

}

animate()
