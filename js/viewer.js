const params = new URLSearchParams(window.location.search)
const piece = params.get("piece")

let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/600,
0.1,
5000
)

let renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,600)

document.getElementById("viewer").appendChild(renderer.domElement)

camera.position.set(0,150,300)

/* CONTROLES SOURIS */

let controls = new THREE.OrbitControls(camera,renderer.domElement)
controls.enableDamping = true
controls.enableZoom = true

/* LUMIERES */

let light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(200,200,200)

scene.add(light)
scene.add(new THREE.AmbientLight(0xffffff,0.6))

/* STL */

let loader = new THREE.STLLoader()
let meshes = {}

function clearScene(){

for(let m in meshes){
scene.remove(meshes[m])
}

meshes={}
document.getElementById("pieceSelect").innerHTML=""

}

function addPiece(name,path){

loader.load(path,function(geometry){

let material = new THREE.MeshStandardMaterial({
color:0xa100ff,
metalness:0.3,
roughness:0.6
})

let mesh = new THREE.Mesh(geometry,material)

scene.add(mesh)

meshes[name]=mesh

/* centre automatiquement la caméra */

let box = new THREE.Box3().setFromObject(mesh)
let center = box.getCenter(new THREE.Vector3())

controls.target.copy(center)

let option=document.createElement("option")
option.value=name
option.text=name

document.getElementById("pieceSelect").appendChild(option)

})

}

function loadPiece(){

clearScene()

let moteur=document.getElementById("moteur").value

/* CACHE ALLUMAGE */

if(piece=="cache_allumage"){

if(moteur=="e3"){

addPiece("base","models/cache_e3_base.stl")
addPiece("rond","models/cache_e3_rond.stl")
addPiece("piece1","models/cache_e3_pieces1.stl")
addPiece("piece2","models/cache_e3_pieces2.stl")

}

}

/* CACHE PIGNON */

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
}

}

function animate(){

requestAnimationFrame(animate)

controls.update()

renderer.render(scene,camera)

}

animate()

loadPiece()
