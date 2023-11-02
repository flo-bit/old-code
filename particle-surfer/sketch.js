import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.module.js';

//import { LPSphere, LPPlane } from 'https://1florki.github.io/low_poly_generator/lpshapes.js'

import { Noise } from 'https://1florki.github.io/jsutils2/noise.js'
import { Gradient } from 'https://1florki.github.io/threejsutils/gradient.js'


class Particle {
  constructor(opt) {
    opt = opt || {};
    
    this.pos = new THREE.Vector3(0, 0, 0);
    this.speed = new THREE.Vector3(0, 0, 0);
    this.acc = new THREE.Vector3(0, 0, 0);
    this.time = opt.time || Math.random() * 1.8 + 0.3;
    if(opt.size) this.reset(opt.size);
  }
  reset(size) {
    //if(Math.random() < 0.01) console.log(this.speed.length());
    this.setPos((Math.random() - 0.5) * 2 * size.x, (Math.random() - 0.5) * 2 * size.y, 0);
    this.acc.set(0, 0, 0);
    this.speed.set(0, 0, 0);
    this.time = Math.random() * 1.8 + 0.3
    //console.log("reset");
  }
  setPos(x, y, z) {
    this.pos.set(x, y, z);
  }
  update(dt, maxSpeed) {
    this.speed.add(this.acc);
    this.speed.clampLength(0, maxSpeed);
    this.pos.add(this.speed);
    this.time -= dt;
  }
  isDead(size) {
    return (Math.abs(this.pos.x) > size.x || Math.abs(this.pos.y) > size.y || this.time < 0)
  }
}

class Particles {
  constructor(opt) {
    opt = opt || {};
    
    this.num = opt.num || 10000;
    
    this.particleSize = opt.particleSize || 1;
    this.size = opt.size || new THREE.Vector3(1, 1, 1);
    
    
    this.vertexColors = opt.vertexColors || true;
    this.color = opt.color || new THREE.Color(0xffffff);
    this.maxSpeed = opt.maxSpeed || 0.02;
    
    this.minTime = opt.minTime || 0.01;
    this.maxTime = opt.maxTime || 1;
    this.newNoise(opt.seed || 0);
    
    this.createParticles();
  }
  newNoise(seed) {
    this.noise = new Noise({min: -0.01, max: 0.01, scale: 0.2, octaves: 2, persistence: 0.5, seed: seed})
  }
  applyNoiseForce(p) {
    p.acc.x = this.noise.getValue(p.pos.x, p.pos.y + 23, p.pos.z) + 0.002;
    p.acc.y = this.noise.getValue(p.pos.x + 100, p.pos.y, p.pos.z);
  }
  
  createParticles() {
    this.geo = new THREE.BufferGeometry();
    
    this.positionData = new Float32Array(this.num * 3);
    
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.positionData, 3));
    
    if(this.vertexColors) {
      this.colorData = new Float32Array(this.num * 3);
      this.geo.setAttribute('color', new THREE.BufferAttribute(this.colorData, 3));
    }
    
    this.parts = [];
    for(let i = 0; i < this.num; i++) {
      this.parts.push(new Particle({size: this.size}));
    }
    
    var mat = new THREE.PointsMaterial({vertexColors: true, size: this.particleSize, sizeAttenuation: false, color: this.color});
    this.mesh = new THREE.Points(this.geo, mat);
  }
  update(dt, num) {
    for(let i = 0; i < this.num; i++) {
      let p = this.parts[i];
      
      this.applyNoiseForce(p);
      p.update(dt, this.maxSpeed);
      if(p.isDead(this.size)) p.reset(this.size)
      
      this.positionData[i * 3] = p.pos.x;
      this.positionData[i * 3 + 1] = p.pos.y;
      this.positionData[i * 3 + 2] = p.pos.z;
      
      this.colorData[i * 3] = num * ((p.acc.x + 0.01) * 80 + 0.2);
      this.colorData[i * 3 + 1] = (1 - num) * ((p.acc.x + 0.01) * 80 + 0.2);
      this.colorData[i * 3 + 2] = (p.acc.y + 0.01) * 50 + 0.2;
      
    }
    this.geo.attributes.position.needsUpdate = true;
    
    if(this.vertexColors) this.geo.attributes.color.needsUpdate = true;
    
    this.noise.shiftBy(0.0, 0.0, 0.00);
  }

}


var renderer, scene, light, camera, keys = {}, mesh, camNode, clock, particles = [], player, playerPart, active = 0, size, stop = false;

const levels = [[89842, 74789], [41742, 37680], [78288, 60840], [15693, 83395], [54971, 5891], [29338, 42504], [83166, 59559], [14271, 26324], [87125, 3695], [43298, 94833], [12641, 84336], [81706, 92840], [81342, 18215], [68226, 9387], [50415, 61135], [40356, 68917], [21870, 34087], [77604, 4641], [35813, 32668]];

let level = 0;

function setupScene() {
  renderer = new THREE.WebGLRenderer({antialising: true});
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  document.body.appendChild(renderer.domElement);
  
  window.addEventListener('resize', onResize, false);
  
  scene = new THREE.Scene({background: new THREE.Color(0xff0000)});
  
  let ambi = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
  scene.add(ambi);

  let light = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(light);
  let light2 = new THREE.DirectionalLight(0xffffff, 0.5);
  light2.position.set(0, - 1, 0.5)
  scene.add(light2);
  
  document.addEventListener("keydown", (event) => {
    keys[event.key] = true
    if(event.key == " ") {
      switchActive();
    }
    if(event.key == "t") {
      stop = !stop;
    }
    if(event.key == "l") {
      nextLevel();
    }
    if(event.key == "r") {
      let s1 = Math.floor(Math.random() * 100000);
      let s2 = Math.floor(Math.random() * 100000);
      particles[0].newNoise(s1);
      particles[1].newNoise(s2);
      console.log("random level [" + s1 + ", " + s2 + "]");
      resetPlayer();
    }
  }, false);
  
  document.addEventListener("mouseup", (event) => {
      switchActive();
  });
  
  let fogColor = new THREE.Color(0x000000);
  scene.background = fogColor;
  scene.fog = new THREE.Fog(fogColor, 4.5, 4.7);
  
  size = new THREE.Vector3(10, 2, .01);
  
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 40);
  camera.position.z = 4.5
  
  clock = new THREE.Clock();
  
  let part1 = new Particles({size: size, seed: levels[level][0]});
  let part2 = new Particles({size: size, seed: levels[level][1]});
  
  particles.push(part1);
  particles.push(part2);
  scene.add(part1.mesh);
  scene.add(part2.mesh);
  switchActive();
  
  player = new THREE.Mesh(new THREE.SphereGeometry( 0.07, 8, 8 ), new THREE.MeshBasicMaterial( {color: 0xffffff} ))
  playerPart = new Particle();
  playerPart.pos.set(-size.x * 5 / 6, 0, 0);
  playerPart.time = 1000000;
  scene.add(player);
  
  let borderColor = 0x444444//0xcf1020
  let goalColor = 0xffffff//0xcf1020
  let border = new THREE.Mesh(new THREE.BoxGeometry( size.x * 2, 0.1, 0.15 ), new THREE.MeshStandardMaterial( {color: borderColor} ));
  border.position.y = size.y;
  scene.add(border);
  let border2 = border.clone();
  border2.position.y = -size.y;
  scene.add(border2)
  
  let border3 = new THREE.Mesh(new THREE.BoxGeometry( 0.1, size.y * 2 + 0.1, 0.15 ), new THREE.MeshStandardMaterial( {color: borderColor} ));
  border3.position.x = -size.x;
  scene.add(border3)
  
  let goal = new THREE.Mesh(new THREE.BoxGeometry( 0.1, size.y * 2 + 0.1, 0.15 ), new THREE.MeshStandardMaterial( {color: goalColor} ));
  goal.position.x = size.x;
  scene.add(goal)
}
function nextLevel() {
  level++;
  if(level >= levels.length) level = 0;
      
  particles[0].newNoise(levels[level][0]);
  particles[1].newNoise(levels[level][1]);
  console.log("level: " + level + " [" + levels[level][0] + ", " + levels[level][1] + "]");
}
function switchActive() {
  active++;
  if(active >= particles.length) active = 0;
  for(let i = 0; i < particles.length; i++) {
    particles[i].mesh.material.size = 1.7;
    particles[i].mesh.position.z = -0.1;
  }
  particles[active].mesh.material.size = 1.7;
  particles[active].mesh.position.z = 0;
}
function resetPlayer() {
  playerPart.reset(size);
  playerPart.pos.set(-size.x * 5 / 6, 0, 0);
  playerPart.time = 1000000;
}
function animate(now) {
  requestAnimationFrame(animate);
  
  // animation loop here
  
  let dt = clock.getDelta();
  //console.log(dt);
  for(let i = 0; i < particles.length; i++) {
    particles[i].update(dt, i);
  }
  if(!stop) {
  
    particles[active].applyNoiseForce(playerPart);
    playerPart.update(dt, particles[active].maxSpeed);
    player.position.copy(playerPart.pos);
    if(playerPart.isDead(size)) {
      if(playerPart.pos.x >= size.x) {
        nextLevel();
      }
      resetPlayer();
    }
    camera.position.x = (playerPart.pos.x + camera.position.x * 49) / 50;
  }
  //console.log(playerPart.pos);
  renderer.render(scene, camera);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

setupScene();
animate();
