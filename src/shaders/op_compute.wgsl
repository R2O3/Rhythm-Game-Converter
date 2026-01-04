struct Particle {
  x: f32, y: f32, size: f32, speed: f32,
  r: f32, g: f32, b: f32, lightness: f32,
  age: f32, targetR: f32, targetG: f32, targetB: f32,
}

struct Uniforms {
  canvasWidth: f32, canvasHeight: f32, deltaTime: f32,
  maxLifetime: f32, flashStrength: f32,
}

@group(0) @binding(0) var<storage, read_write> particles: array<Particle>;
@group(0) @binding(1) var<uniform> uniforms: Uniforms;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let idx = id.x;
  if (idx >= arrayLength(&particles)) { return; }
  
  var p = particles[idx];
  
  p.y -= p.speed;
  p.age += 1.0;
  
  if (p.y < -300.0) {
    p.y = uniforms.canvasHeight + 100.0;
    p.age = 0.0;
    p.r = p.targetR;
    p.g = p.targetG;
    p.b = p.targetB;
  }
  
  let transitionSpeed = select(0.1, 0.4, uniforms.flashStrength > 0.5);
  p.r += (p.targetR - p.r) * transitionSpeed;
  p.g += (p.targetG - p.g) * transitionSpeed;
  p.b += (p.targetB - p.b) * transitionSpeed;
  
  particles[idx] = p;
}