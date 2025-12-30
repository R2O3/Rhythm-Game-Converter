<script lang="ts">
  import Navbar from '$lib/components/Navbar/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/stores';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut, cubicInOut } from 'svelte/easing';
  import { refreshNavbarColors } from '$lib/components/Navbar/Navbar_bg'; 
  import { startBackgroundAnimation } from '$lib/Mania_bg';
  import ProgressOverlay from '$lib/components/Progress/ProgressOverlay.svelte';
  
  export let data: { subtitle?: string } = {};
  
  let isNavigating = false;
  
  $: subtitle = data?.subtitle || '';
  $: title = subtitle ? `RGC - ${subtitle}` : 'Rhythm Game Converter';
  
  beforeNavigate(({ from, to }) => {
    isNavigating = true;
  });
  
  afterNavigate(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    refreshNavbarColors();

    setTimeout(() => {
      isNavigating = false;
    }, 300);
  });
  
  onMount(() => {
    refreshNavbarColors();
    const stopAnimation = startBackgroundAnimation();
    
    return () => stopAnimation(); 
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content="RGC (Rhythm Game Converter) is a web-based tool that allows for easily converting rhythm game charts and maps." />
  <meta property="og:title" content={title} />
  <meta property="og:description" content="RGC (Rhythm Game Converter) is a web-based tool that allows for easily converting rhythm game charts and maps." />
  <meta property="og:image" content="https://o8zeinaus1.ufs.sh/f/ZAifdK74nX6lEQZbmM4Nmpyw2SHUIBCq6xJgo8XshZdkl1P5" />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />
  <meta property="og:url" content="https://rgconverter.netlify.app" />
  
  <link rel="icon" type="image/svg+xml" href="/favicon.webp" />
  <link href="https://fonts.googleapis.com/css2?family=Averia+Sans+Libre:wght@700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@300..700&display=swap" rel="stylesheet">
</svelte:head>

<Navbar />
<ProgressOverlay />

<main class:navigating={isNavigating}>
  {#key $page.url.pathname}
    <div
      class="page-transition"
      in:fly={{ y: 20, duration: 400, delay: 150, easing: cubicOut }}
      out:fade={{ duration: 200, easing: cubicInOut }}
    >
      <div class="content-box">
        <slot />
      </div>
    </div>
  {/key}
</main>

<Footer />

<style>
  :global(body) {
    position: relative;
    overflow-x: hidden;
    font-family: 'Averia Sans Libre', sans-serif;
    color: var(--text-color);
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  :global(body::before) {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('$lib/assets/rgc-background.webp');
    background-size: 35rem;
    background-position: var(--bg-pos-x, 0px) var(--bg-pos-y, 0px);
    background-repeat: repeat;
    opacity: 0.2;
    mix-blend-mode: multiply; 
    z-index: -1;
    transition: opacity 0.3s ease;
  }

  :global(html, body) {
    overflow-x: hidden;
    max-width: 100%;
  }

  main {
    font-size: large;
    margin-top: 2rem;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.3;
    transition: opacity 0.2s ease;
  }

  main.navigating {
    pointer-events: none;
  }

  .page-transition {
    will-change: transform, opacity;
  }

  .content-box {
    width: 100%;
    max-width: 70%;
    background-color: var(--content-color);
    margin: 2rem auto;
    padding: 0.4rem 2.5rem 2rem;
    border-radius: 10px;
    color: var(--text-color);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  @media (max-width: 1058px) {
    .content-box {
      margin-top: 5.5rem;
      margin-left: auto;
      width: 100% !important;
      max-width: 120% !important;
    }
  }

  @media (max-width: 768px) {
    .content-box {
      max-width: 95%;
      margin-left: 0.1rem;
      padding: 0.4rem 1.5rem 1.5rem;
      border-radius: 8px;
    }
    
    main {
      font-size: medium;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }

  @media (max-width: 480px) {
    .content-box {
      max-width: 100%;
      margin-left: 0.1rem;
      padding: 0.4rem 1rem 1rem;
    }
    
    main {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
    }
  }

  :global(a, button, input, select, textarea) {
    transition: all 0.2s ease;
  }

  :global(hr) {
    border: none;
    height: 1px;
    background-color: var(--accent-highlight);
    filter: brightness(2);
    margin: 2rem auto;
    width: 50%;
    position: relative;
    transition: width 0.3s ease;
  }

  :global(a) {
    color: #ffcc00;
    text-decoration: none;
    font-weight: bold;
  }

  :global(a:hover) {
    text-decoration: underline;
  }

  :global(:root) {      
    --logo-gradient: linear-gradient(to right, transparent, var(--navbar-color));
    --text-color: #f5f5f5;
  }

  :global(*::-webkit-scrollbar) {
    height: 6px;
    width: 6px;
  }

  :global(*::-webkit-scrollbar-track) {
    border-radius: 0px;
    background-color: var(--background-color);
  }

  :global(*::-webkit-scrollbar-thumb) {
    border-radius: 0px;
    background-color: var(--navbar-color);
    transition: background-color 0.2s ease;
  }

  :global(*::-webkit-scrollbar-thumb:hover) {
    background-color: var(--navbutton-separator-color);
  }

  :global(.info) {
    padding: 10px;
    background-color: #5aa4c91f;
    color: #77aac4;
    border-left: 5px solid #31708f;
    border-radius: 10px;
    max-width: 70%;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  :global(.warning) {
    padding: 10px;
    background-color: #dbc76238;
    color: #d8bd8e;
    border-left: 5px solid #b89861;
    border-radius: 10px;
    max-width: 70%;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  :global(.error) {
    padding: 10px;
    background-color: #aa50502d;
    color: #bd6a69;
    border-left: 5px solid #a94442;
    border-radius: 10px;
    max-width: 70%;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  :global(.info::before) {
    content: "💡";
    font-size: 1.2em;
    margin-right: 5px;
    background: #77aac4;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  :global(.warning::before) {
    content: "⚠️";
    font-size: 1.2em;
    margin-right: 5px;
  }

  :global(.error::before) {
    content: "❌";
    font-size: 1.2em;
    margin-right: 5px;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(*) {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>