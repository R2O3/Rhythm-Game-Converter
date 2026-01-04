struct Particle {
  x: f32, y: f32, size: f32, speed: f32,
  r: f32, g: f32, b: f32, lightness: f32,
  age: f32, targetR: f32, targetG: f32, targetB: f32,
}

struct Uniforms {
  canvasWidth: f32, canvasHeight: f32, deltaTime: f32, maxLifetime: f32,
}

struct VertexOutput {
  @builtin(position) pos: vec4f,
  @location(0) color: vec3f,
  @location(1) uv: vec2f,
}

@group(0) @binding(0) var<storage, read> particles: array<Particle>;
@group(0) @binding(1) var<uniform> uniforms: Uniforms;
@group(0) @binding(2) var texSampler: sampler;
@group(0) @binding(3) var texture: texture_2d<f32>;

@vertex
fn vs(@builtin(vertex_index) vIdx: u32, @builtin(instance_index) iIdx: u32) -> VertexOutput {
  if (iIdx >= arrayLength(&particles)) {
    return VertexOutput(vec4f(0.0), vec3f(0.0), vec2f(0.0));
  }
  
  let p = particles[iIdx];
  
  if (p.age >= uniforms.maxLifetime) {
    return VertexOutput(vec4f(0.0), vec3f(0.0), vec2f(0.0));
  }
  
  var positions = array<vec2f, 6>(
    vec2f(-1.0, -1.0), vec2f(1.0, -1.0), vec2f(-1.0, 1.0),
    vec2f(-1.0, 1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0)
  );
  
  var uvs = array<vec2f, 6>(
    vec2f(0.0, 1.0), vec2f(1.0, 1.0), vec2f(0.0, 0.0),
    vec2f(0.0, 0.0), vec2f(1.0, 1.0), vec2f(1.0, 0.0)
  );
  
  let pos = positions[vIdx];
  let scaled = pos * p.size;
  
  let x = (p.x + scaled.x) / uniforms.canvasWidth * 2.0 - 1.0;
  let y = 1.0 - (p.y + scaled.y) / uniforms.canvasHeight * 2.0;
  
  let lightAdj = p.lightness / 255.0;
  let color = vec3f(
    clamp(p.r + lightAdj, 0.0, 1.0),
    clamp(p.g + lightAdj, 0.0, 1.0),
    clamp(p.b + lightAdj, 0.0, 1.0)
  );
  
  return VertexOutput(vec4f(x, y, 0.0, 1.0), color, uvs[vIdx]);
}

@fragment
fn fs(in: VertexOutput) -> @location(0) vec4f {
  let texColor = textureSample(texture, texSampler, in.uv);
  return vec4f(in.color * texColor.a, texColor.a);
}