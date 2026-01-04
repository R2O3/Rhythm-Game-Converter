<script lang="ts">
  import { parseColor } from '$lib/helpers';
  import OsuParticles from '$lib/components/Particles/OsuParticles.svelte';

  export let id: string | undefined;
  export let disabled: boolean | undefined = false;
  export let color: string | undefined = '#FFFFFF';

  let { r, g, b } = parseColor(color ?? '#FFFFFF');
  
  import { createEventDispatcher, onMount } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  let particlesComponent: any = null;
  let isScreen = false;
  let isHovering = false;
  let flashing = false;
  let isPressed = false;

  onMount(() => {
    particlesComponent?.triggerColorFlash([r, g, b]);
  });

  function handleHover() {
    if (!disabled) {
      isScreen = true;
      isHovering = true;
      
      flashing = true;
      setTimeout(() => {
        flashing = false;
      }, 50);
    }
  }

  function handleLeave() {
    if (!disabled) {
      isScreen = false;
      isHovering = false;
      isPressed = false;
    }
  }

  function handleMouseDown() {
    if (!disabled) {
      isPressed = true;
    }
  }

  function handleMouseUp() {
    if (!disabled) {
      isPressed = false;
    }
  }

  function handleClick() {
    if (!disabled) {
      flashing = true;
      setTimeout(() => {
        flashing = false;
      }, 25);
      dispatch('click');
    }
  }
</script>

<button 
  type="button" 
  id={id}
  class="form-button"
  class:flashing
  class:pressed={isPressed}
  class:hovering={isHovering}
  style="--bg-color: rgb({r}, {g}, {b});"
  disabled={disabled}
  on:click={handleClick}
  on:mouseenter={handleHover}
  on:mouseleave={handleLeave}
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
>
  <div class="background-layer"></div>
  
  <div class="particles-container" class:screen={isScreen}>
    <OsuParticles 
      bind:this={particlesComponent}
      baseColor={[r, g, b]}
      spawnInterval={1000}
      sizeOffset={15}
      sizeMultiplier={35}
      speedOffset={0.2}
      speedMultiplier={0.6}
      maxParticles={15}
      starterParticles={5}
      triangleThickness={4}
      lightnessVariations={[0, -10]}
    />
  </div>
  
  <div class="gradient-mask"></div>
  <div class="flash-overlay"></div>
  
  <span class="btn">
    <span class="text"><slot /></span>
  </span>
</button>

<style>
  .form-button {
    position: relative;
    overflow: hidden;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .form-button.pressed {
    transform: scale(0.95);
    transition: transform 0.15s cubic-bezier(0.42, 0, 1, 1);
  }

  .form-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }

  .background-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-color);
    border-radius: 15px;
    z-index: 0;
  }

  .particles-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    border-radius: 15px;
    overflow: hidden;
    mix-blend-mode: multiply;
    filter:
      brightness(0.8)
      opacity(0.8)
      saturate(1.5)
      contrast(1.2);
    transition: 
      mix-blend-mode 0.6s cubic-bezier(0.22, 1, 0.36, 1),
      filter 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .particles-container.screen {
    mix-blend-mode: screen;
    filter:
      brightness(1.75)
      opacity(0.6)
      saturate(2)
      contrast(1);
    transition: 
      mix-blend-mode 0.6s cubic-bezier(0.22, 1, 0.36, 1),
      filter 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .gradient-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    pointer-events: none;
    border-radius: 15px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      color-mix(in srgb, var(--bg-color) 50%, transparent) 40%,
      var(--bg-color) 100%
    );
    transition: background 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .form-button.hovering .gradient-mask {
    background: linear-gradient(
      to top,
      transparent 0%,
      color-mix(in srgb, var(--bg-color) 10%, transparent) 40%,
      var(--bg-color) 100%
    );
  }

  .flash-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    border-radius: 15px;
    z-index: 3;
    pointer-events: none;
    transition: background 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .form-button.hovering .flash-overlay {
    background: color-mix(in srgb, var(--bg-color) 20%, transparent);
  }

  .form-button.flashing .flash-overlay {
    background: color-mix(in srgb, var(--bg-color) 60%, white 40%);
    transition: background 0.05s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .btn {
    position: relative;
    z-index: 4;
    color: white;
    height: 3.2rem;
    padding: 0 2rem;
    border-radius: 15px;
    transition: all 0.1s cubic-bezier(0.22, 1, 0.36, 1);
    font-size: 1.4em;
    font-weight: 550;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: auto;
  }
</style>