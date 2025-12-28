<script>
  import { parseColor } from '$lib/helpers';
  import { page } from '$app/stores';
  
  export let href;
  export let bgColor = 'rgba(128, 0, 255, 0.2)';
  
  let className = '';
  export { className as class };

  $: isActive = $page.url.pathname === href;

  /**
     * @param {string} color
     * @param {number} opacity
     * @param {number} lightness
     */
  function adjustColor(color, lightness, opacity) {
    try {
      const parsed = parseColor(color);
      return `rgba(${parsed.r + lightness}, ${parsed.g + lightness}, ${parsed.b + lightness}, ${opacity})`;
    } catch (e) {
      console.warn(`Couldn't parse color: ${color}`, e);
      return `rgba(128, 0, 255, ${opacity})`;
    }
  }

  $: hoverBgColor = adjustColor(bgColor, 0, 0.8);
  $: activeBgColor = adjustColor(bgColor, 100, 0.8);
</script>

<a 
  {href}
  class="nav-button {className}"
  style="
    user-select: none;
    --navbutton-bg-color: { isActive ? bgColor : adjustColor(bgColor, -20, 0.1)};
    --navbutton-hover-bg-color: {hoverBgColor};
    --navbutton-active-bg-color: {activeBgColor};
  "
>
  <span><slot /></span>
</a>

<style>
  .nav-button {
    position: relative;
    padding: 1rem 2.5rem;
    background-color: transparent;
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    transform: skewX(-20deg);
    transform-origin: left center;
    margin-right: 0%;
    margin-left: 0rem;
    transition: color 0.2s ease;
    z-index: 0;
    overflow: hidden;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .nav-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    transition: all 0.2s ease;
    background: var(--navbutton-bg-color);
    border-radius: 0;
  }

  .nav-button:hover::before {
    background: var(--navbutton-hover-bg-color);
    transition-duration: 0.15s;
  }

  .nav-button:active::before {
    background: var(--navbutton-active-bg-color);
    transition-duration: 0.05s;
  }

  .nav-button:active {
    color: #333333;
    transition-duration: 0.05s;
  }

  .nav-button::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 5px;
    background-color: var(--navbutton-separator-color);
    transition: opacity 0.15s ease;
    z-index: 1;
    opacity: 0.7;
  }

  .nav-button:hover::after {
    opacity: 1;
  }

  .nav-button span {
    font-family: "Signika Negative", sans-serif;
    font-weight: 400;
    display: block;
    font-size: x-large;
    transform: skewX(20deg);
    transition: transform 0.2s ease;
  }

  .nav-button:hover span {
    transform: skewX(20deg) scale(1.02);
    transition-duration: 0.15s;
  }

  .nav-button:active span {
    transform: skewX(20deg) scale(0.98);
    transition-duration: 0.05s;
  }
</style>