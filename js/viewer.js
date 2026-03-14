const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / 600,
0.1,
10000
)

const renderer = new THREE.WebGLRenderer({ antialias:true })
renderer.setSize(window.innerWidth,600)

document.getElementById("viewer").appendChild(renderer.domElement)

camera.position.set(200,200,200)

/* CONTROLES SOURIS */

const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

/* LUMIERES */

const light1 = new THREE.DirectionalLight(0xffffff,1)
light1.position.set(200,200,200)

scene.add(light1)

scene.add(new THREE.AmbientLight(0xffffff,0.6))

/* CHARGEMENT STL */

const loader = new THREE.STLLoader()

let model

loader.load("models/yes.STL", function(geometry){

const material = new THREE.MeshStandardMaterial({
color:0xa100ff,
metalness:0.3,
roughness:0.6
})

model = new THREE.Mesh(geometry,material)

scene.add(model)

/* centre la caméra sur le modèle */

const box = new THREE.Box3().setFromObject(model)
const center = box.getCenter(new THREE.Vector3())

controls.target.copy(center)

})

/* COULEUR */

function setColor(color){
if(model){
model.material.color.set(color)
}
}

/* ANIMATION */

function animate(){

requestAnimationFrame(animate)

controls.update()

renderer.render(scene,camera)

}

animate()
