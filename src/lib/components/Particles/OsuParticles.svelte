<script lang="ts">
  import { parseColor } from '$lib/helpers';
  import { onMount, onDestroy } from 'svelte';

  export let baseColor: [number, number, number] = [255, 255, 255];
  export let spawnInterval: number = 400;
  export let sizeOffset: number = 25;
  export let sizeMultiplier: number = 40;
  export let speedOffset: number = 0.4;
  export let speedMultiplier: number = 0.8;
  export let maxParticles: number = 500;
  export let starterParticles: number = 50;
  export let triangleThickness: number = 8;
  export let lightnessVariations: number[] = [-40, -15, 5, 20];

  let canvas: HTMLCanvasElement;
  let gpuState: any = {};
  let animationId: number;
  let spawnIntervalId: number;
  let updateColorFn: ((r: number, g: number, b: number) => void) | null = null;

  export function updateBaseColor(r: number, g: number, b: number): void {
    if (gpuState.device && updateColorFn) {
      gpuState.baseColor = [r / 255, g / 255, b / 255];
      updateColorFn(r / 255, g / 255, b / 255);
    }
  }

  export function triggerColorFlash(r: number, g: number, b: number): void {
    if (gpuState.device && updateColorFn) {
      gpuState.baseColor = [r / 255, g / 255, b / 255];
      gpuState.flashTime = performance.now();
      updateColorFn(r / 255, g / 255, b / 255);
    }
  }

  export function refreshColorFromCss(): void {
    if (typeof window === 'undefined') return;
    
    const style = getComputedStyle(document.documentElement);
    const colorString = style.getPropertyValue('--navbar-color').trim();
    
    if (colorString) {
      const rgb = parseColor(colorString);
      if (rgb) {
        triggerColorFlash(rgb.r, rgb.g, rgb.b);
      }
    }
  }

  onMount(async () => {
    if (!navigator.gpu) return;

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) return;
    
    const device = await adapter.requestDevice();
    const ctx = canvas.getContext('webgpu');
    const format = navigator.gpu.getPreferredCanvasFormat();
    
    ctx!.configure({ device, format, alphaMode: 'premultiplied' });

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createTriangleTexture = async () => {
      const size = 128;
      const strokeWidth = triangleThickness;
      const svgData = `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <polygon points="${size/2},${size*0.85} ${size*0.1},${size*0.15} ${size*0.9},${size*0.15}" 
                   fill="none" 
                   stroke="white" 
                   stroke-width="${strokeWidth}"
                   stroke-linejoin="miter"/>
        </svg>
      `;
      
      const img = new Image();
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
      
      const canvas2d = document.createElement('canvas');
      canvas2d.width = size;
      canvas2d.height = size;
      const ctx2d = canvas2d.getContext('2d')!;
      ctx2d.drawImage(img, 0, 0);
      
      const imageData = ctx2d.getImageData(0, 0, size, size);
      URL.revokeObjectURL(url);
      
      const texture = device.createTexture({
        size: [size, size, 1],
        format: 'rgba8unorm',
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT
      });
      
      device.queue.writeTexture(
        { texture },
        imageData.data,
        { bytesPerRow: size * 4 },
        [size, size, 1]
      );
      
      return texture;
    };

    const triangleTexture = await createTriangleTexture();
    const sampler = device.createSampler({
      magFilter: 'linear',
      minFilter: 'linear'
    });

    const particleStride = 12; 
    const maxParticlesCount = maxParticles;
    
    const particleBuffer = device.createBuffer({
      size: maxParticlesCount * particleStride * 4,
      usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC
    });

    const uniformBuffer = device.createBuffer({
      size: 32,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });

    const computeShader = device.createShaderModule({
      code: `
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
      `
    });

    const computePipeline = device.createComputePipeline({
      layout: 'auto',
      compute: { module: computeShader, entryPoint: 'main' }
    });

    const renderShader = device.createShaderModule({
      code: `
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
      `
    });

    const renderPipeline = device.createRenderPipeline({
      layout: 'auto',
      vertex: { module: renderShader, entryPoint: 'vs' },
      fragment: { 
        module: renderShader, 
        entryPoint: 'fs', 
        targets: [{ 
          format,
          blend: {
            color: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha' },
            alpha: { srcFactor: 'one', dstFactor: 'one-minus-src-alpha' }
          }
        }] 
      },
      primitive: { topology: 'triangle-list' }
    });

    const computeBindGroup = device.createBindGroup({
      layout: computePipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: particleBuffer } },
        { binding: 1, resource: { buffer: uniformBuffer } }
      ]
    });

    const renderBindGroup = device.createBindGroup({
      layout: renderPipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: { buffer: particleBuffer } },
        { binding: 1, resource: { buffer: uniformBuffer } },
        { binding: 2, resource: sampler },
        { binding: 3, resource: triangleTexture.createView() }
      ]
    });

    gpuState = {
      device,
      ctx,
      format,
      particleBuffer,
      uniformBuffer,
      computePipeline,
      renderPipeline,
      computeBindGroup,
      renderBindGroup,
      particleCount: starterParticles,
      baseColor: [baseColor[0] / 255, baseColor[1] / 255, baseColor[2] / 255],
      flashTime: 0,
      maxLifetime: (canvas.height + 600) / speedOffset
    };

    updateColorFn = (r, g, b) => {
      for (let i = 0; i < gpuState.particleCount; i++) {
        const offset = i * particleStride;
        const colors = new Float32Array([r, g, b]);
        device.queue.writeBuffer(particleBuffer, (offset + 9) * 4, colors);
        device.queue.writeBuffer(particleBuffer, (offset + 4) * 4, colors);
      }
    };

    const initialParticles = new Float32Array(maxParticlesCount * particleStride);
    for (let i = 0; i < starterParticles; i++) {
      const offset = i * particleStride;
      const r = baseColor[0] / 255;
      const g = baseColor[1] / 255;
      const b = baseColor[2] / 255;

      initialParticles[offset + 0] = Math.random() * canvas.width;
      initialParticles[offset + 1] = Math.random() * canvas.height * 2;
      initialParticles[offset + 2] = Math.random() * sizeMultiplier + sizeOffset;
      initialParticles[offset + 3] = Math.random() * speedMultiplier + speedOffset;

      initialParticles[offset + 4] = r;
      initialParticles[offset + 5] = g;
      initialParticles[offset + 6] = b;
      initialParticles[offset + 7] = lightnessVariations[Math.floor(Math.random() * lightnessVariations.length)];
      initialParticles[offset + 8] = 0;

      initialParticles[offset + 9] = r;
      initialParticles[offset + 10] = g;
      initialParticles[offset + 11] = b;
    }
    device.queue.writeBuffer(particleBuffer, 0, initialParticles);

    refreshColorFromCss();

    spawnIntervalId = setInterval(() => {
      if (gpuState.particleCount < maxParticlesCount) {
        const offset = gpuState.particleCount * particleStride;
        const newParticle = new Float32Array([
          Math.random() * canvas.width,
          canvas.height + sizeOffset,
          Math.random() * sizeMultiplier + sizeOffset,
          Math.random() * speedMultiplier + speedOffset,

          gpuState.baseColor[0], gpuState.baseColor[1], gpuState.baseColor[2],
          lightnessVariations[Math.floor(Math.random() * lightnessVariations.length)],
          0,

          gpuState.baseColor[0], gpuState.baseColor[1], gpuState.baseColor[2]
        ]);
        device.queue.writeBuffer(particleBuffer, offset * 4, newParticle);
        gpuState.particleCount++;
      }
    }, spawnInterval);

    const animate = () => {
      const now = performance.now();
      const flashStrength = Math.max(0, 1 - (now - gpuState.flashTime) / 500);

      const uniforms = new Float32Array([
        canvas.width,
        canvas.height,
        1 / 60,
        gpuState.maxLifetime,
        flashStrength
      ]);
      device.queue.writeBuffer(uniformBuffer, 0, uniforms);

      const encoder = device.createCommandEncoder();

      const computePass = encoder.beginComputePass();
      computePass.setPipeline(computePipeline);
      computePass.setBindGroup(0, computeBindGroup);
      computePass.dispatchWorkgroups(Math.ceil(gpuState.particleCount / 64));
      computePass.end();

      const renderPass = encoder.beginRenderPass({
        colorAttachments: [{
          view: ctx!.getCurrentTexture().createView(),
          loadOp: 'clear',
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          storeOp: 'store'
        }]
      });

      renderPass.setPipeline(renderPipeline);
      renderPass.setBindGroup(0, renderBindGroup);
      renderPass.draw(6, gpuState.particleCount);
      renderPass.end();

      device.queue.submit([encoder.finish()]);
      animationId = requestAnimationFrame(animate);
    };

    animate();
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') window.removeEventListener('resize', () => {});
    if (animationId) cancelAnimationFrame(animationId);
    if (spawnIntervalId) clearInterval(spawnIntervalId);
    if (gpuState.device) gpuState.device.destroy();
  });
</script>

<canvas bind:this={canvas} class="w-full h-full block"> </canvas>

<style>
  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>