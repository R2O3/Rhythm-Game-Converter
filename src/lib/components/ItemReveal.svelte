<script lang="ts">
  import { onMount } from 'svelte';
  
  export let title: string;
  export let expanded: boolean = false;
  export let url: string | undefined = undefined;

  let isExpanded = expanded;
  let contentDiv: HTMLDivElement;
  let contentPlaceholder: HTMLDivElement;
  let maxHeight = '0px';

  function cleanContent(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('script, style, iframe, frame, object, embed, link').forEach(el => el.remove());
    doc.querySelectorAll('*').forEach(el => {
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('on')) {
          el.removeAttribute(attr.name);
        }
      });
    });
    return doc.body.innerHTML;
  }

  async function fetchContent() {
    if (!url || !contentPlaceholder) return;
    
    try {
      contentPlaceholder.textContent = 'Loading...';
      maxHeight = '100px';
      
      const response = await fetch(url);
      if (response.ok) {
        const text = await response.text();
        const clean = cleanContent(text);
        contentPlaceholder.innerHTML = clean;
      } else {
        contentPlaceholder.textContent = `Error: ${response.status}`;
      }
    } catch (error) {
      contentPlaceholder.textContent = 'Failed to load content';
    } finally {
      updateContentHeight();
    }
  }

  function updateContentHeight() {
    if (contentDiv) {
      maxHeight = `${contentDiv.scrollHeight}px`;
    }
  }

  function toggle() {
    isExpanded = !isExpanded;
    
    if (isExpanded) {
      if (url && contentPlaceholder && !contentPlaceholder.innerHTML.trim()) {
        fetchContent();
      } else {
        updateContentHeight();
      }
    }
  }

  onMount(() => {
    if (isExpanded && url) {
      fetchContent();
    } else if (isExpanded) {
      updateContentHeight();
    }

    const resizeHandler = () => {
      if (isExpanded) {
        updateContentHeight();
      }
    };
    
    window.addEventListener('resize', resizeHandler);
    
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });
</script>

<div class="reveal-item" class:expanded={isExpanded}>
  <button 
    class="reveal-header" 
    aria-expanded={isExpanded}
    on:click={toggle}
  >
    <span class="arrow">►</span>
    <span class="title">{title}</span>
  </button>
  
  <div 
    class="reveal-content" 
    bind:this={contentDiv}
    style="--max-height: {maxHeight}"
  >
    {#if !url}
      <slot />
    {:else}
      <div class="content-placeholder" bind:this={contentPlaceholder}></div>
    {/if}
  </div>
</div>

<style>
  .reveal-item {
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    overflow: hidden;
    margin: 1rem 0;
    background-color: rgba(0, 0, 0, 0.103);
    width: 100%;
    max-width: 100%;
  }
  
  .reveal-header {
    font-size: large;
    color: white;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem;
    border: none;
    background: none;
    cursor: pointer;
    text-align: left;
    min-height: 44px;
  }
  
  .arrow {
    margin-right: 0.75rem;
    transition: transform 0.1s ease-out;
    font-size: 0.8em;
    flex-shrink: 0;
  }
  
  .reveal-item.expanded .arrow {
    transform: rotate(90deg);
  }
  
  .title {
    font-weight: 600;
    transition: color 0.2s;
    word-break: break-word;
    line-height: 1.4;
  }
  
  .reveal-header:hover .title {
    color: var(--navbar-color);
  }
  
  .reveal-content {
    padding: 0 1rem;
    max-height: 0;
    overflow: hidden;
    transition: 
      max-height 0.1s cubic-bezier(0, 0, 0.8, 1),
      padding 0.1s cubic-bezier(0, 0, 0.8, 1);
  }
  
  .reveal-item.expanded .reveal-content {
    max-height: var(--max-height);
    padding-bottom: 1rem;
  }
  
  .content-placeholder {
    min-height: 20px;
  }

  @media (max-width: 768px) {
    .reveal-item {
      margin: 0.75rem 0;
      border-radius: 16px;
    }
    
    .reveal-header {
      padding: 0.875rem;
      font-size: 1rem;
    }
    
    .arrow {
      margin-right: 0.5rem;
    }
    
    .reveal-content {
      padding: 0 0.875rem;
    }
    
    .reveal-item.expanded .reveal-content {
      padding-bottom: 0.875rem;
    }
  }

  @media (min-width: 769px) and (max-width: 1058px) {
    .reveal-item {
      max-width: 75%;
    }
  }

  @media (min-width: 1059px) {
    .reveal-item {
      max-width: 50%;
    }
  }
</style>