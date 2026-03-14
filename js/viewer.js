const params = new URLSearchParams(window.location.search)
const piece = params.get("piece")

let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/500,
0.1,
1000
)

let renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,500)

document.getElementById("viewer").appendChild(renderer.domElement)

camera.position.set(0,50,120)

let controls = new THREE.OrbitControls(camera,renderer.domElement)

controls.enableDamping = true

let light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(0,1,1)
scene.add(light)

let ambient = new THREE.AmbientLight(0xffffff,0.6)
scene.add(ambient)

let meshes = {}
let loader = new THREE.STLLoader()

function clearScene(){

for(let key in meshes){
scene.remove(meshes[key])
}

meshes = {}

document.getElementById("pieceSelect").innerHTML=""

}

function addPiece(name,path){

loader.load(path,function(geometry){

let material = new THREE.MeshStandardMaterial({color:0xa100ff})

let mesh = new THREE.Mesh(geometry,material)

geometry.center()

scene.add(mesh)

meshes[name]=mesh

let option=document.createElement("option")
option.value=name
option.text=name

document.getElementById("pieceSelect").appendChild(option)

})

}

function loadPiece(){

clearScene()

let moteur=document.getElementById("moteur").value

if(piece=="cache_allumage"){

if(moteur=="e3"){

addPiece("base","models/cache_e3_base.stl")
addPiece("rond","models/cache_e3_rond.stl")
addPiece("piece1","models/cache_e3_pieces1.stl")
addPiece("piece2","models/cache_e3_pieces2.stl")

}

}

if(piece=="cache_pignon"){

if(moteur=="am6"){

addPiece("base","models/pignon_am6_base.stl")
addPiece("piece1","models/pignon_am6_pieces1.stl")

}

if(moteur=="e3"){

addPiece("base","models/pignon_e3_base.stl")
addPiece("piece1","models/pignon_e3_pieces1.stl")

}

}

if(piece=="support_durite"){

if(moteur=="am6") addPiece("support","models/support_am6.stl")
if(moteur=="e3") addPiece("support","models/support_e3.stl")

}

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

if(piece=="biellette"){

addPiece("biellette","models/biellette.stl")

}

}

function setColor(color){

let selected=document.getElementById("pieceSelect").value

if(meshes[selected]){

meshes[selected].material.color.set(color)

}

}

function animate(){

requestAnimationFrame(animate)

controls.update()

renderer.render(scene,camera)

}

animate()

loadPiece()
