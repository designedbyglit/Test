let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

let renderer = new THREE.WebGLRenderer({antialias:true})

renderer.setSize(600,400)

document.getElementById("viewer").appendChild(renderer.domElement)


let geometry = new THREE.BoxGeometry()

let material = new THREE.MeshStandardMaterial({
color:0x7a00ff
})

let piece = new THREE.Mesh(geometry,material)

scene.add(piece)


camera.position.z = 3


let light = new THREE.DirectionalLight(0xffffff,1)

light.position.set(5,5,5)

scene.add(light)


function animate(){

requestAnimationFrame(animate)

piece.rotation.y += 0.01

renderer.render(scene,camera)

}

animate()



document.querySelectorAll(".color").forEach(c=>{

c.addEventListener("click",()=>{

let color = c.dataset.color

piece.material.color.set(color)

})

})
