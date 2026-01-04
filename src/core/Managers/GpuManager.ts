import computeShaderSource from '$shaders/op_compute.wgsl?raw';
import renderShaderSource from '$shaders/op_render.wgsl?raw';

interface SharedResources {
  device: GPUDevice;
  format: GPUTextureFormat;
  computePipeline: GPUComputePipeline;
  renderPipeline: GPURenderPipeline;
  triangleTexture: GPUTexture;
  sampler: GPUSampler;
}

let gpuResources: SharedResources | null = null;
let initPromise: Promise<SharedResources> | null = null;

async function createTriangleTexture(device: GPUDevice, thickness: number): Promise<GPUTexture> {
  const size = 128;
  const svgData = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <polygon points="${size/2},${size*0.85} ${size*0.1},${size*0.15} ${size*0.9},${size*0.15}" 
               fill="none" stroke="white" stroke-width="${thickness}" stroke-linejoin="miter"/>
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
}

export async function getSharedGPU(triangleThickness: number): Promise<SharedResources | null> {
  if (!navigator.gpu) return null;
  if (gpuResources) return gpuResources;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) throw new Error("No adapter");
    
    const device = await adapter.requestDevice();
    const format = navigator.gpu.getPreferredCanvasFormat();

    const computeShader = device.createShaderModule({ 
        label: 'Compute Shader',
        code: computeShaderSource 
    });

    const renderShader = device.createShaderModule({ 
        label: 'Render Shader',
        code: renderShaderSource 
    });

    const computePipeline = device.createComputePipeline({
      layout: 'auto',
      compute: { module: computeShader, entryPoint: 'main' }
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

    const triangleTexture = await createTriangleTexture(device, triangleThickness);
    const sampler = device.createSampler({ magFilter: 'linear', minFilter: 'linear' });

    gpuResources = {
      device,
      format,
      computePipeline,
      renderPipeline,
      triangleTexture,
      sampler
    };

    return gpuResources;
  })();

  return initPromise;
}