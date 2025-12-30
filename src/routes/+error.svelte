<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { OsuParticles } from '$lib/OsuParticles';
  import { browser } from '$app/environment';
  
  onMount(() => {
    if (browser) {
      document.documentElement.style.setProperty('--content-box-display', 'none');
    }
    
    const particleSystem = new OsuParticles('NF_bg', 150, 60, 80, 1000, 120, 10, 0.65, 0.1);
    particleSystem.init(40);
  });
  
  onDestroy(() => {
    if (browser) {
      document.documentElement.style.setProperty('--content-box-display', 'flex');
    }
  });
</script>

<svelte:head>
  <link rel="icon" type="image/svg+xml" href="/favicon.webp" />
  <title>{$page.status} - {$page.error?.message || 'Error'}</title>
</svelte:head>

<div class="error-container">
  <canvas id="NF_bg"></canvas>
  <div class="ambient-gradient"></div>
  <h1>{$page.status}</h1>
  <p>There is nothing here...</p>
  <a href="/" class="go-back-link">Go back?</a>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: var(--background-color);
  }

  .error-container {
    font-family: 'Inter', sans-serif;
    color: #e0e0e0;
    background-color: #1a0f15;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 1rem;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
  }

  :global(#NF_bg) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    mix-blend-mode: screen;
    opacity: 0.02;
  }

  .ambient-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(160, 64, 96, 0.12) 0%,
      rgba(120, 50, 80, 0.06) 30%,
      transparent 70%
    );
    z-index: 0;
    pointer-events: none;
    animation: ambientPulse 8s ease-in-out infinite;
  }

  @keyframes ambientPulse {
    0%, 100% {
      opacity: 0.6;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.05);
    }
  }

  h1 {
    font-size: 15rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 2rem;
    text-align: center;
    background: linear-gradient(90deg, #a04060, #c85070, #a04060);
    background-size: 300% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: moveBackground 8s ease-in-out infinite;
    position: relative;
    z-index: 1;
  }

  @keyframes moveBackground {
    0% { background-position: 0% 0; }
    50% { background-position: 50% 0; }
    100% { background-position: 100% 0; }
  }

  p {
    opacity: 0.8;
    font-size: 1.5rem;
    margin-bottom: 3rem;
    line-height: 1.6;
    text-align: center;
    max-width: 600px;
    color: #4a2535;
    transition: opacity 0.3s ease-in-out, color 0.3s ease-in-out;
    position: relative;
    z-index: 1;
    display: inline-block;
  }

  p:hover {
    opacity: 0.4;
    color: #e0e0e0;
  }

  p::after {
    content: " Or is there?";
    position: absolute;
    left: 100%;
    margin-left: 0.5rem;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    pointer-events: none;
  }

  p:hover::after {
    opacity: 1;
  }

  .go-back-link {
    display: inline-block;
    padding: 1rem 3rem;
    border-radius: 0.75rem;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    background-color: #a0406044;
    color: white;
    box-shadow: 0 0 15px rgba(160, 64, 96, 0.25), 0 0 5px rgba(160, 64, 96, 0.5);
    border: 2px solid rgba(160, 64, 96, 0.5);
    position: relative;
    z-index: 1;
  }

  .go-back-link:hover {
    background-color: #c8507099;
    transform: scale(1.02);
    box-shadow: 0 0 25px rgba(200, 80, 112, 0.4), 0 0 10px rgba(200, 80, 112, 0.8), 0 5px 15px rgba(0, 0, 0, 0.4);
    border-color: rgba(200, 80, 112, 1);
  }

  .go-back-link:active {
    transform: scale(0.98);
    background-color: #3a1a25;
    box-shadow: 0 0 10px rgba(160, 64, 96, 0.4), inset 0 2px 5px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 10rem;
      margin-bottom: 1.5rem;
    }
    p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      padding: 0 1rem;
    }
    .go-back-link {
      padding: 0.8rem 2rem;
      font-size: 0.95rem;
    }
  }
</style>