<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import cursorImage from '$lib/assets/cursor/menu-cursor.png';
  
  interface Point {
    x: number;
    y: number;
  }

  type DragState = 'NotDragging' | 'DragStarted' | 'Rotating';

  export let cursorScale: number = 1.0;
  export let cursorRotate: boolean = true;
  export let hideCursorOnNonMouseInput: boolean = false;
  
  let targetX: number = -100;
  let targetY: number = -100;
  let currentX: number = -100;
  let currentY: number = -100;

  let isVisible: boolean = true;
  let lastInputWasMouse: boolean = true;
  let isMobile: boolean = false;
  let rafId: number; 
  
  let scale = tweened(1, { duration: 200, easing: cubicOut });
  let rotation = tweened(0, { duration: 120, easing: cubicOut });
  let opacity = tweened(1, { duration: 250, easing: cubicOut });
  let additiveOpacity = tweened(0, { duration: 400, easing: cubicOut });
  
  let dragState: DragState = 'NotDragging'; 
  let positionMouseDown: Point = { x: 0, y: 0 };
  let lastMovePosition: Point = { x: 0, y: 0 };
  let isMouseDown: boolean = false;
  
  $: finalScale = cursorScale * $scale * 0.08;
  
  function updateLoop(): void {
    currentX = targetX;
    currentY = targetY;

    rafId = requestAnimationFrame(updateLoop);
  }

  function calculateRotation(mousePos: Point, origin: Point): number {
    const offset = { x: mousePos.x - origin.x, y: mousePos.y - origin.y };
    const distance = Math.sqrt(offset.x * offset.x + offset.y * offset.y);
    
    if (distance === 0) return $rotation;
    
    let degrees = (Math.atan2(-offset.x, offset.y) * 180 / Math.PI) + 24.3;
    
    let diff = (degrees - $rotation) % 360;
    if (diff < -180) diff += 360;
    if (diff > 180) diff -= 360;
    
    return $rotation + diff;
  }
  
  function updateVisibility(): void {
    if (hideCursorOnNonMouseInput && !lastInputWasMouse) {
      isVisible = false;
      opacity.set(0, { duration: 250 });
      scale.set(0.6, { duration: 250 });
    } else {
      isVisible = true;
      opacity.set(1, { duration: 250 });
      if (!isMouseDown) {
        scale.set(1, { duration: 400 });
      }
    }
  }
  
  function handleMouseMove(e: MouseEvent | DragEvent): void {
    targetX = e.clientX;
    targetY = e.clientY;

    lastInputWasMouse = true;
    updateVisibility();
    
    if (dragState !== 'NotDragging') {
      lastMovePosition = { x: e.clientX, y: e.clientY };
      const distance = Math.sqrt(
        Math.pow(lastMovePosition.x - positionMouseDown.x, 2) +
        Math.pow(lastMovePosition.y - positionMouseDown.y, 2)
      );
      
      if (dragState === 'DragStarted' && distance > 80) {
        dragState = 'Rotating';
      }
      
      if (dragState === 'Rotating' && distance > 0) {
        const newRotation = calculateRotation(lastMovePosition, positionMouseDown);
        rotation.set(newRotation, { duration: 120 });
      }
      
      if (distance > 60) {
        const t = 0.04;
        positionMouseDown = {
          x: positionMouseDown.x * (1 - t) + lastMovePosition.x * t,
          y: positionMouseDown.y * (1 - t) + lastMovePosition.y * t
        };
      }
    }
  }
  
  function handleMouseDown(e: MouseEvent): void {
    if (isMouseDown) return;
    isMouseDown = true;
    lastInputWasMouse = true;
    updateVisibility();
    
    scale.set(0.75, { duration: 400 });
    additiveOpacity.set(1, { duration: 0 });
    
    if (cursorRotate && dragState !== 'Rotating') {
      dragState = 'DragStarted';
      positionMouseDown = { x: e.clientX, y: e.clientY };
    }
  }
  
  function handleMouseUp(e: MouseEvent | DragEvent): void {
    const buttons = (e as MouseEvent).buttons;
    
    if (buttons === 0 || e.type === 'dragend') {
      isMouseDown = false;
      
      scale.set(1, { duration: 300, easing: cubicOut });
      additiveOpacity.set(0, { duration: 300 }); 
      
      if (dragState !== 'NotDragging') {
        const resetDuration = 300 * (0.5 + Math.abs($rotation / 960));
        rotation.set(0, { duration: resetDuration, easing: cubicOut });
        dragState = 'NotDragging';
      }
    }
  }
  
  function handleKeyDown(e: KeyboardEvent): void {
    if (!e.repeat) {
      lastInputWasMouse = false;
      updateVisibility();
    }
  }
  
  onMount(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    isMobile = mediaQuery.matches;

    if (isMobile) return;

    rafId = requestAnimationFrame(updateLoop);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('dragover', handleMouseMove);
    window.addEventListener('dragend', handleMouseUp);
    window.addEventListener('keydown', handleKeyDown);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
        cancelAnimationFrame(rafId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('dragover', handleMouseMove);
        window.removeEventListener('dragend', handleMouseUp);
        window.removeEventListener('keydown', handleKeyDown);
    }
  });
</script>

{#if !isMobile}
  <div 
    class="menu-cursor"
    style="
      transform: translate3d({currentX}px, {currentY}px, 0) scale({finalScale}) rotate({$rotation}deg);
      opacity: {$opacity};
    "
  >
    <div class="cursor-container">
      <div class="cursor-base">
        <img src={cursorImage} alt="cursor" draggable="false" />
      </div>
      <div class="cursor-additive" style="opacity: {$additiveOpacity};">
        <div class="cursor-tint"></div>
      </div>
    </div>
  </div>
{/if}

<style>
  @media (pointer: fine) {
    :global(body), :global(*) {
      cursor: none !important;
    }
  }
  
  .menu-cursor {
    --glow-color: var(--cursor-color, var(--primary, #ff69b4));
    
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 9999;
    transform-origin: top left;
    
    width: 0;
    height: 0;
    overflow: visible;

    will-change: transform, opacity;
    transition: opacity 0.25s ease-out;
  }
  
  .cursor-container { 
    position: relative; 
    width: max-content; 
    display: inline-block; 
  }

  .cursor-base { position: relative; display: block; z-index: 10; }
  .cursor-base img { display: block; width: auto; height: auto; }
  
  .cursor-additive {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    mix-blend-mode: screen; pointer-events: none; z-index: 20;
  }

  .cursor-tint {
    width: 100%; height: 100%;
    background-color: var(--glow-color);
    -webkit-mask-image: url('$lib/assets/cursor/menu-cursor-additive.png');
    mask-image: url('$lib/assets/cursor/menu-cursor-additive.png');
    -webkit-mask-size: contain; mask-size: contain;
    -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
    -webkit-mask-position: center; mask-position: center;
    filter: drop-shadow(0 0 8px var(--glow-color)) drop-shadow(0 0 15px var(--glow-color));
  }
</style>