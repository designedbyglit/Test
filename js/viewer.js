const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/600,
0.1,
10000
)

const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,600)

document.getElementById("viewer").appendChild(renderer.domElement)

camera.position.set(200,200,200)

const controls = new THREE.OrbitControls(camera, renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(200,200,200)

scene.add(light)
scene.add(new THREE.AmbientLight(0xffffff,0.6))

const loader = new THREE.STLLoader()

let meshes = {}

function loadPiece(name,file){

loader.load(file,function(geometry){

const material = new THREE.MeshStandardMaterial({
color:0xaaaaaa
})

const mesh = new THREE.Mesh(geometry,material)

scene.add(mesh)

meshes[name] = mesh

})

}

loadPiece("base","models/base.stl")
loadPiece("rond","models/rond.stl")
loadPiece("piece1","models/piece1.stl")
loadPiece("piece2","models/piece2.stl")

function animate(){

requestAnimationFrame(animate)

controls.update()

renderer.render(scene,camera)

}

animate()
