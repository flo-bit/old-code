import { BufferGeometry, Color, PointsMaterial, Points, BufferAttribute } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.module.js';

function sumOcatave(simplex, num_iterations, x, y, z, persistence, scl, low, high) {
  var maxAmp = 0, amp = 1, freq = scl, noise = 0;
  
  for(var i = 0; i < num_iterations; ++i) {
      noise += simplex.noise3D(x * freq, y * freq, z * freq) * amp;
      maxAmp += amp;
      amp *= persistence;
      freq *= 2;
  }
  
  return (noise / maxAmp) * (high - low) / 2 + (high + low) / 2;
}

export class NoiseField {
  constructor(opt) {
    if(!opt) opt = [];
    
    this.noiseScale =  opt.noiseScale || 1;
    this.octaves = opt.octaves || 1;
    this.persistence =  opt.persistence || 1;
    
    this.power =  opt.power || 1;
    
    this.minHeight = opt.minHeight || 0;
    this.maxHeight = opt.maxHeight || 1;
    
    this.shouldNormalise = opt.shouldNormalise != undefined ? opt.shouldNormalise : false;
    
    this.noiseShift = opt.noiseShift || [0, 0, 0];
    
    this.simplex = new SimplexNoise();
  }
  
  setNoiseShift(x, y, z) {
    this.noiseShift = [x, y, z];
  }
  addNoiseShift(dX, dY, dZ) {
    this.noiseShift[0] += dX;
    this.noiseShift[1] += dY;
    this.noiseShift[2] += dZ;
  }
  
  getNormalizedValue(x, y, z) {
    let l = this.shouldNormalise ? Helper.getArrayVertexHeight(a) : 1;
    x = x / l;
    y = y / l;
    z = z / l;
    
    let h = sumOcatave(this.simplex, this.octaves, x + this.noiseShift[0], y + this.noiseShift[1], z + this.noiseShift[2], this.persistence, this.noiseScale, 0, 1);
    return Math.pow(h, this.power);
  }
  
  getValue(x, y, z) {
    return this.getNormalizedValue(x, y, z) * (this.maxHeight - this.minHeight) + this.minHeight;
  }
}


export class Particles {
  constructor(opt) {
    opt = opt || {};
    this.num = opt.num || 17000;
    this.size = opt.size || 2;
    this.boxSize = opt.boxSize || 8;
    this.maxSpeed = 0.04;
    
    this.noise = new NoiseField({minHeight: -0.04, maxHeight: 0.04, noiseScale: 0.09})
  } 
  
  createParticles() {
    this.geo = new BufferGeometry();
    
    this.positionData = new Float32Array(this.num * 3);
    this.colorData = new Float32Array(this.num * 3);
    this.speedData = new Float32Array(this.num * 3);
    this.accData = new Float32Array(this.num * 3);
    
    for(let i = 0; i < this.num * 3; i++) {
      this.positionData[i] = (Math.random() - 0.5) * this.boxSize;
    }
    this.geo.setAttribute('position', new BufferAttribute(this.positionData, 3));
    this.geo.setAttribute('color', new BufferAttribute(this.colorData, 3));
  }
  
  getMesh() {
    if(!this.mesh) {
      if(!this.geo) this.createParticles();
      var mat = new PointsMaterial({ vertexColors: true, size: this.size, sizeAttenuation: false });
      this.mesh = new Points(this.geo, mat);
    } 
    let rots = 7;
    for(let i = 0; i < rots; i++) {
      var mat = new PointsMaterial({ vertexColors: true, size: this.size, sizeAttenuation: false });
      var mesh2 = new Points(this.geo, mat);
      mesh2.rotation.z = Math.PI * 2 / rots * i;
      this.mesh.add(mesh2);
    }
    return this.mesh;
  }
  
  update() {
    let out = 0;
    for(let i = 0; i < this.num * 3; i += 3) {
      let x = this.positionData[i], y = this.positionData[i + 1], z = this.positionData[i + 2];
      let b = this.boxSize / 2;
      this.positionData[i] += this.speedData[i];
      this.positionData[i + 1] += this.speedData[i + 1];
      this.positionData[i + 2] += this.speedData[i + 2];
      if(Math.abs(x) > b || Math.abs(y) > b || Math.abs(z) > b || Math.random() < 0.001) {
        out += 1;
        for(let j = 0; j < 3; j++) {
          this.positionData[i + j] = (Math.random() - 0.5) * this.boxSize;
          this.speedData[i + j] = 0;
          this.accData[i + j] = 0;
          this.colorData[i + j] = 0;
        }
      }
      
      this.speedData[i] += this.accData[i];
      this.speedData[i + 1] += this.accData[i + 1];
      this.speedData[i + 2] += this.accData[i + 2];
      
      let speed = Math.sqrt(Math.pow(this.speedData[i], 2) + Math.pow(this.speedData[i + 1], 2) + Math.pow(this.speedData[i + 2], 2));
      if(speed > this.maxSpeed) {
        this.speedData[i] /= (speed / this.maxSpeed);
        this.speedData[i + 1] /= (speed / this.maxSpeed);
        this.speedData[i + 2] /= (speed / this.maxSpeed);
      }
      let proSpeed = 1 - speed / (this.maxSpeed);
      this.colorData[i] = proSpeed + x / this.boxSize;
      this.colorData[i + 1] = proSpeed;
      this.colorData[i + 2] = proSpeed;
      
      this.accData[i] = this.noise.getValue(x + 1000, y, z);
      this.accData[i + 1] = this.noise.getValue(x, y + 1000, z);
      this.accData[i + 2] = this.noise.getValue(x, y, z);
    }
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.color.needsUpdate = true;
    this.noise.addNoiseShift(0.05,0,0);
    console.log("out: " + out);
  }

}