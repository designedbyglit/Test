let scene = new THREE.Scene()

scene.background = new THREE.Color(0x111111)



let camera = new THREE.PerspectiveCamera(
75,
600 / 400,
0.1,
1000
)

camera.position.z = 4



let renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(600,400)

document.getElementById("viewer").appendChild(renderer.domElement)



/* LUMIERES */

let light1 = new THREE.DirectionalLight(0xffffff,1)
light1.position.set(5,5,5)
scene.add(light1)

let light2 = new THREE.AmbientLight(0xffffff,0.5)
scene.add(light2)



/* PIECE TEST */

let geometry = new THREE.BoxGeometry(1.5,1,1)

let material = new THREE.MeshStandardMaterial({
color:0x7a00ff,
metalness:0.2,
roughness:0.4
})

let piece = new THREE.Mesh(geometry,material)

scene.add(piece)



/* ROTATION SOURIS */

let isDragging = false
let previousMousePosition = { x:0, y:0 }

renderer.domElement.addEventListener("mousedown", () => {
isDragging = true
})

renderer.domElement.addEventListener("mouseup", () => {
isDragging = false
})

renderer.domElement.addEventListener("mousemove", (e)=>{

if(!isDragging) return

let deltaMove = {
x: e.offsetX - previousMousePosition.x,
y: e.offsetY - previousMousePosition.y
}

piece.rotation.y += deltaMove.x * 0.01
piece.rotation.x += deltaMove.y * 0.01

previousMousePosition = {
x: e.offsetX,
y: e.offsetY
}

})



/* ZOOM MOLETTE */

renderer.domElement.addEventListener("wheel",(e)=>{

camera.position.z += e.deltaY * 0.01

})



/* COULEURS */

document.querySelectorAll(".color").forEach(c=>{

c.addEventListener("click",()=>{

let color = c.dataset.color

piece.material.color.set(color)

})

})



/* ANIMATION */

function animate(){

requestAnimationFrame(animate)

renderer.render(scene,camera)

}

animate()
