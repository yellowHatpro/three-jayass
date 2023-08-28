import * as THREE from 'three';
import './style.css'
import gsap from 'gsap';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

//Scene
const scene = new THREE.Scene()

//Create sphere  @params:  size, width segments, height segments
const geometry = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshStandardMaterial({
  color: '#00FF83',
  roughness: 0.2
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//Light
const light = new THREE.PointLight(0xFFFFFF,500,100)
light.position.set(0,10,10) //x, y, z
scene.add(light)

//Camera
const fov = 45 //how much camera see 
const aspect_ratio = sizes.width/sizes.height

const camera = new THREE.PerspectiveCamera(fov, aspect_ratio, 0.1, 100)
camera.position.z = 10
scene.add(camera)


//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera)
renderer.setPixelRatio(2)

//Controls 
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

//Events
//Resize
window.addEventListener('resize', ()=>{
  //update sizes
  camera.updateProjectionMatrix()
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //Update Camera
  camera.aspect = sizes.width/sizes.height
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//Timeline Animation that happens , line by line
const tl = gsap.timeline({
  defaults: {
    duration: 1
  }
})
tl.fromTo(mesh.scale, { z:0, x:0, y:0},{ z:1, x:1, y:1 })
tl.fromTo("nav", {y: "-100%"}, {y: "0%"})
tl.fromTo(".title", {opacity: 0}, {opacity: 1})

//Mouse animation color
let mouseDown = false
let rgb = []

window.addEventListener("mousedown", ()=>{
  mouseDown = true
})
window.addEventListener("mouseup", ()=>{
  mouseDown = false
})
window.addEventListener("mousemove", (e)=>{
  if (mouseDown){
    rgb = [
    Math.round((e.pageX/sizes.width)*255),
    Math.round((e.pageY/sizes.height)*255),
    150,
   ]
    //Animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
      r:newColor.r,
      g:newColor.g ,
      b:newColor.b,
    })
  }
})

