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

camera.position.z = 120

let light = new THREE.DirectionalLight(0xffffff,1)

light.position.set(0,1,1)

scene.add(light)

let meshes = []

function clearScene(){

meshes.forEach(m=>{
scene.remove(m)
})

meshes=[]

}

function loadSTL(path){

let loader = new THREE.STLLoader()

loader.load(path,function(geometry){

let material = new THREE.MeshStandardMaterial({color:0xa100ff})

let mesh = new THREE.Mesh(geometry,material)

geometry.center()

scene.add(mesh)

meshes.push(mesh)

})

}

function loadPiece(){

clearScene()

let moteur = document.getElementById("moteur").value

if(piece=="cache_pignon"){

if(moteur=="am6"){

loadSTL("models/pignon_am6_base.stl")
loadSTL("models/pignon_am6_pieces1.stl")

}

if(moteur=="e3"){

loadSTL("models/pignon_e3_base.stl")
loadSTL("models/pignon_e3_pieces1.stl")

}

}

if(piece=="support_durite"){

if(moteur=="am6") loadSTL("models/support_am6.stl")
if(moteur=="e3") loadSTL("models/support_e3.stl")

}

if(piece=="recuperateur"){

if(moteur=="am6"){

loadSTL("models/recup_am6_base.stl")
loadSTL("models/recup_am6_bouchon.stl")

}

if(moteur=="e3"){

loadSTL("models/recup_e3_base.stl")
loadSTL("models/recup_e3_bouchon.stl")

}

}

if(piece=="biellette"){

loadSTL("models/biellette.stl")

}

if(piece=="obturateur"){

if(moteur=="am6"){

loadSTL("models/obturateur_am6_base.stl")
loadSTL("models/obturateur_am6_pieces1.stl")
loadSTL("models/obturateur_am6_pieces2.stl")

}

if(moteur=="e3"){

loadSTL("models/obturateur_e3_base.stl")
loadSTL("models/obturateur_e3_pieces1.stl")
loadSTL("models/obturateur_e3_pieces2.stl")

}

}

}

function setColor(color){

meshes.forEach(m=>{
m.material.color.set(color)
})

}

function animate(){

requestAnimationFrame(animate)

meshes.forEach(m=>{
m.rotation.y +=0.01
})

renderer.render(scene,camera)

}

animate()

loadPiece()

function addToCart(){

alert("Produit ajouté au panier")

}
