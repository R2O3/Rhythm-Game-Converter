<script lang="ts">
  import { parseColor } from "$lib/helpers";

  export let onClick = () => {};
  export let bgColor = 'rgba(80, 87, 92, 0.8)';
  
  let className = '';
  export { className as class };

  function adjustColor(color: string, lightness: number, opacity: number) {
    try {
      const parsed = parseColor(color);
      return `rgba(${parsed.r + lightness}, ${parsed.g + lightness}, ${parsed.b + lightness}, ${opacity})`;
    } catch (e) {
      console.warn(`Couldn't parse color: ${color}`, e);
      return `rgba(128, 0, 255, ${opacity})`;
    }
  }

  $: hoverBgColor = adjustColor(bgColor, 20, 0.9);
  $: activeBgColor = adjustColor(bgColor, 40, 0.9);
</script>

<button
  on:click={onClick}
  class="settings-button {className}"
  style="
    --settings-bg-color: {bgColor};
    --settings-hover-bg-color: {hoverBgColor};
    --settings-active-bg-color: {activeBgColor};
  "
  aria-label="Settings"
>
  <span class="icon-wrapper">
    <svg style="filter: invert();" width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.785.45c1.039 0 1.932.715 2.127 1.705l.087.44c.342 1.73 2.187 2.762 3.903 2.184l.436-.147c.982-.33 2.067.062 2.587.934l.785 1.318c.52.872.326 1.98-.46 2.639l-.35.293a2.83 2.83 0 0 0 0 4.368l.35.293c.787.66.98 1.767.46 2.64l-.785 1.317c-.52.872-1.605 1.264-2.587.934l-.436-.147c-1.716-.578-3.561.454-3.903 2.184l-.087.44c-.195.99-1.088 1.705-2.127 1.705h-1.57c-1.039 0-1.932-.716-2.127-1.705L9 21.405c-.342-1.73-2.187-2.762-3.903-2.184l-.436.146c-.982.331-2.067-.06-2.587-.933l-.785-1.318a2.055 2.055 0 0 1 .46-2.639l.35-.293a2.83 2.83 0 0 0 0-4.368l-.35-.293a2.055 2.055 0 0 1-.46-2.64l.785-1.317c.52-.872 1.605-1.264 2.587-.934l.436.147C6.813 5.357 8.658 4.324 9 2.595l.087-.44C9.283 1.165 10.176.45 11.215.45zM12 15.3a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6" fill="#000"/></svg>
  </span>
</button>

<style>
  .settings-button {
    position: relative;
    padding: 1rem;
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transform: skewX(-20deg);
    transform-origin: left center;
    transition: color 0.2s ease;
    z-index: 0;
    overflow: hidden;
    flex-shrink: 0;
    user-select: none;
    margin-left: 0.25rem;
    padding: 0 2rem;
  }

  .settings-button::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    transition: all 0.2s ease;
    background: var(--settings-bg-color);
    box-sizing: border-box;
  }

  .settings-button:hover::before {
    background: var(--settings-hover-bg-color);
    transition-duration: 0.15s;
  }

  .settings-button:active::before {
    background: var(--settings-active-bg-color);
    transition-duration: 0.05s;
  }

  .settings-button:active {
    color: #e2e8f0;
    transition-duration: 0.05s;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: skewX(20deg);
    transition: transform 0.2s ease;
  }

  .settings-button:hover .icon-wrapper {
    transform: skewX(20deg) scale(1.1) rotate(-10deg);
  }

  .settings-button:active .icon-wrapper {
    transform: skewX(20deg) scale(0.95) rotate(-15deg);
  }

  svg {
    display: block;
  }
</style>