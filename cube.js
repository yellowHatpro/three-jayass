import * as THREE from 'three';
import './style.css'


//1. Scene
const scene = new THREE.Scene();

//2. Camera
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

//3. Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.render(scene,camera)
renderer.setPixelRatio(2)

//4. Object to render (Mesh : made of geometry and material)
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Animation 
function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.rotation.z += 0.01;

	renderer.render( scene, camera );
}

animate();


//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

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
