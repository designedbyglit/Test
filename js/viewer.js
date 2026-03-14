const params = new URLSearchParams(window.location.search)
const piece = params.get("piece")

let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/500,
0.1,
2000
)

let renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,500)

document.getElementById("viewer").appendChild(renderer.domElement)

camera.position.set(0,80,160)

/* CONTROLES SOURIS */

let controls = new THREE.OrbitControls(camera,renderer.domElement)

controls.enableDamping = true
controls.enableZoom = true
controls.zoomSpeed = 1.2

/* LUMIERES */

let light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(100,100,100)

scene.add(light)

let ambient = new THREE.AmbientLight(0xffffff,0.6)
scene.add(ambient)

/* STOCKAGE PIECES */

let meshes = {}
let colors = {}

let loader = new THREE.STLLoader()

function clearScene(){

for(let key in meshes){
scene.remove(meshes[key])
}

meshes={}
colors={}

document.getElementById("pieceSelect").innerHTML=""

}

/* AJOUT PIECE AVEC POSITION */

function addPiece(name,path,x=0,y=0,z=0){

loader.load(path,function(geometry){

let material = new THREE.MeshStandardMaterial({color:0xa100ff})

let mesh = new THREE.Mesh(geometry,material)

geometry.center()

mesh.position.set(x,y,z)

scene.add(mesh)

meshes[name]=mesh

colors[name]="#a100ff"

let option=document.createElement("option")
option.value=name
option.text=name

document.getElementById("pieceSelect").appendChild(option)

})

}

/* CHARGEMENT PIECES */

function loadPiece(){

clearScene()

let moteur=document.getElementById("moteur").value

/* CACHE ALLUMAGE */

if(piece=="cache_allumage"){

if(moteur=="e3"){

addPiece("base","models/cache_e3_base.stl",0,0,0)
addPiece("rond","models/cache_e3_rond.stl",0,0,0)
addPiece("piece1","models/cache_e3_pieces1.stl",0,0,0)
addPiece("piece2","models/cache_e3_pieces2.stl",0,0,0)

}

}

/* CACHE PIGNON */

if(piece=="cache_pignon"){

if(moteur=="am6"){

addPiece("base","models/pignon_am6_base.stl",0,0,0)
addPiece("piece1","models/pignon_am6_pieces1.stl",0,0,0)

}

if(moteur=="e3"){

addPiece("base","models/pignon_e3_base.stl",0,0,0)
addPiece("piece1","models/pignon_e3_pieces1.stl",0,0,0)

}

}

/* SUPPORT DURITE */

if(piece=="support_durite"){

if(moteur=="am6") addPiece("support","models/support_am6.stl")
if(moteur=="e3") addPiece("support","models/support_e3.stl")

}

/* RECUPERATEUR */

if(piece=="recuperateur"){

if(moteur=="am6"){

addPiece("base","models/recup_am6_base.stl")
addPiece("bouchon","models/recup_am6_bouchon.stl")

}

if(moteur=="e3"){

addPiece("base","models/recup_e3_base.stl")
addPiece("bouchon","models/recup_e3_bouchon.stl")

}

}

/* OBTURATEUR */

if(piece=="obturateur"){

if(moteur=="am6"){

addPiece("base","models/obturateur_am6_base.stl")
addPiece("piece1","models/obturateur_am6_pieces1.stl")
addPiece("piece2","models/obturateur_am6_pieces2.stl")

}

if(moteur=="e3"){

addPiece("base","models/obturateur_e3_base.stl")
addPiece("piece1","models/obturateur_e3_pieces1.stl")
addPiece("piece2","models/obturateur_e3_pieces2.stl")

}

}

/* BIELLETTE */

if(piece=="biellette"){

addPiece("biellette","models/biellette.stl")

}

}

/* COULEUR PAR PIECE */

function setColor(color){

let selected=document.getElementById("pieceSelect").value

if(meshes[selected]){

meshes[selected].material.color.set(color)

colors[selected]=color

}

}

/* AJOUT PANIER AVEC COULEURS */

function addToCart(){

let moteur=document.getElementById("moteur").value

let config = {
piece: piece,
moteur: moteur,
colors: colors
}

let cart = JSON.parse(localStorage.getItem("cart")) || []

cart.push(config)

localStorage.setItem("cart",JSON.stringify(cart))

alert("Produit ajouté au panier")

}

/* RENDER */

function animate(){

requestAnimationFrame(animate)

controls.update()

renderer.render(scene,camera)

}

animate()

loadPiece()
