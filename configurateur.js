
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / 500,
0.1,
10000
)

camera.position.set(0,80,150)

let renderer = new THREE.WebGLRenderer({antialias:true})

renderer.setSize(window.innerWidth,500)

document.getElementById("viewer3d").appendChild(renderer.domElement)

let controls = new THREE.OrbitControls(camera,renderer.domElement)

let light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(100,100,100)

scene.add(light)

scene.add(new THREE.AmbientLight(0xffffff,0.7))

let parts = {}

let loader = new THREE.GLTFLoader()

loader.load("models/cache_e3.glb",function(gltf){

let model = gltf.scene

scene.add(model)

model.traverse(function(child){

if(child.isMesh){

parts[child.name] = child

}

})

})

function changeColor(part,color){

if(parts[part]){

parts[part].material.color.set(color)

}

}

function animate(){

requestAnimationFrame(animate)

controls.update()

renderer.render(scene,camera)

}

animate()
