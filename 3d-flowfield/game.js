import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';
import { Particles } from './particles.js';

var renderer, scene, camera, particles, mesh;

function setupScene() {
  renderer = new THREE.WebGLRenderer();
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(new THREE.Color("white"));
  document.body.appendChild(renderer.domElement);
  
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.01, 10000);
  
  window.addEventListener( 'resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);}, false );
  

  particles = new Particles();
  camera.position.z = 7;
  mesh = particles.getMesh();
  scene.add(mesh);
  
}


function animate(now) {
  requestAnimationFrame(animate);
  
  mesh.rotation.y += 0.01;
  particles.update();
  renderer.render(scene, camera);
}

setupScene();
animate();