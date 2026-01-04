<script lang="ts">
  import { parseColor } from '$lib/helpers';
  import { onMount, onDestroy } from 'svelte';
  import { getSharedGPU } from '$core/Managers/GpuManager';

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
  let instanceState: any = {};
  let animationId: number;
  let spawnIntervalId: number;
  let updateColorFn: ((r: number, g: number, b: number) => void) | null = null;

  export function updateBaseColor(r: number, g: number, b: number): void {
    if (instanceState.device && updateColorFn) {
      instanceState.baseColor = [r / 255, g / 255, b / 255];
      updateColorFn(r / 255, g / 255, b / 255);
    }
  }

  export function triggerColorFlash(r: number, g: number, b: number): void {
    if (instanceState.device && updateColorFn) {
      instanceState.baseColor = [r / 255, g / 255, b / 255];
      instanceState.flashTime = performance.now();
      updateColorFn(r / 255, g / 255, b / 255);
    }
  }

  export function refreshColorFromCss(): void {
    if (typeof window === 'undefined') return;
    const style = getComputedStyle(document.documentElement);
    const colorString = style.getPropertyValue('--navbar-color').trim();
    if (colorString) {
      const rgb = parseColor(colorString);
      if (rgb) triggerColorFlash(rgb.r, rgb.g, rgb.b);
    }
  }

  onMount(async () => {
    const gpu = await getSharedGPU(triangleThickness);
    if (!gpu) return;
    
    const { device, format, computePipeline, renderPipeline, triangleTexture, sampler } = gpu;

    const ctx = canvas.getContext('webgpu');
    if (!ctx) return;
    ctx.configure({ device, format, alphaMode: 'premultiplied' });

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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

    instanceState = {
      device,
      particleBuffer,
      uniformBuffer,
      particleCount: starterParticles,
      baseColor: [baseColor[0] / 255, baseColor[1] / 255, baseColor[2] / 255],
      flashTime: 0,
      maxLifetime: (canvas.height + 600) / speedOffset
    };

    updateColorFn = (r, g, b) => {
      for (let i = 0; i < instanceState.particleCount; i++) {
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
      if (instanceState.particleCount < maxParticlesCount) {
        const offset = instanceState.particleCount * particleStride;
        const newParticle = new Float32Array([
          Math.random() * canvas.width,
          canvas.height + sizeOffset,
          Math.random() * sizeMultiplier + sizeOffset,
          Math.random() * speedMultiplier + speedOffset,
          instanceState.baseColor[0], instanceState.baseColor[1], instanceState.baseColor[2],
          lightnessVariations[Math.floor(Math.random() * lightnessVariations.length)],
          0,
          instanceState.baseColor[0], instanceState.baseColor[1], instanceState.baseColor[2]
        ]);
        device.queue.writeBuffer(particleBuffer, offset * 4, newParticle);
        instanceState.particleCount++;
      }
    }, spawnInterval);

    const animate = () => {
      const now = performance.now();
      const flashStrength = Math.max(0, 1 - (now - instanceState.flashTime) / 500);

      const uniforms = new Float32Array([
        canvas.width,
        canvas.height,
        1 / 60,
        instanceState.maxLifetime,
        flashStrength
      ]);
      device.queue.writeBuffer(uniformBuffer, 0, uniforms);

      const encoder = device.createCommandEncoder();

      const computePass = encoder.beginComputePass();
      computePass.setPipeline(computePipeline);
      computePass.setBindGroup(0, computeBindGroup);
      computePass.dispatchWorkgroups(Math.ceil(instanceState.particleCount / 64));
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
      renderPass.draw(6, instanceState.particleCount);
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