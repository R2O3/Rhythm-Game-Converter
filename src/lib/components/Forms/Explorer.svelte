<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import FileTreeEntry from './FileTreeEntry.svelte';
  import { SaveAs } from '$core/structures/Files';
  import LazerButton from '../LazerButton.svelte';

  export let files: any[] = [];
  export let specificExportLabel: string = 'Map';
  
  export let stats: { label: string; value: string }[] = [];

  const dispatch = createEventDispatcher();

  let exportDisabled = true;

  let showExportDropdown = false;
  let exportDropdownWrapper: HTMLElement;

  function handleSaveAs(event: CustomEvent) {
    dispatch('saveAs', event.detail);
  }

  function handleExport(option: SaveAs) {
    showExportDropdown = false;
    dispatch('export', option);
  }

  export function setStats(newStats: { label: string; value: string }[]) {
    stats = newStats;
  }

  function handleWindowClick(event: MouseEvent) {
    if (showExportDropdown && exportDropdownWrapper && !exportDropdownWrapper.contains(event.target as Node)) {
      showExportDropdown = false;
    }
  }

  function toggleExportDropdown(event: Event) {
    if (exportDisabled) return;
    event.stopPropagation();
    showExportDropdown = !showExportDropdown;
  }

  onMount(() => {
    const handleConvertDone = () => { exportDisabled = false; };
    document.addEventListener('convert:done', handleConvertDone);
    return () => { document.removeEventListener('convert:done', handleConvertDone); };
  });
</script>

<svelte:window on:click={handleWindowClick} />

<div class="explorer-container">
  <div class="left-panel">
    <slot name="form" />
    
    <div class="button-group">
      <slot name="convert-button" />
      
      <div class="export-dropdown-wrapper" bind:this={exportDropdownWrapper}>
        <LazerButton
          id="export-btn" 
          color="#cc3278"
          disabled={exportDisabled}
          on:click={toggleExportDropdown}
        >
          Export ▾
        </LazerButton>

        {#if showExportDropdown}
          <ul class="dropdown" transition:fade={{ duration: 100 }} role="menu">
            <li role="menuitem" tabindex="0"
              on:click={() => handleExport(SaveAs.zip)}
              on:keypress={(e) => e.key === 'Enter' && handleExport(SaveAs.zip)}>
              Export All as Zip
            </li>
            <li role="menuitem" tabindex="0"
              on:click={() => handleExport(SaveAs.specific)}
              on:keypress={(e) => e.key === 'Enter' && handleExport(SaveAs.specific)}>
              Export All as {specificExportLabel}
            </li>
          </ul>
        {/if}
      </div>
    </div>
  </div>

  <div class="right-panel">
    <div class="stats-container">
      <div class="stats-header">
        <h3 class="stats-title">Stats</h3>
      </div>

      {#if stats.length === 0}
        <div class="no-stats" transition:fade>
          <span>No Stats Available</span>
        </div>
      {:else}
        <div class="stats-content" transition:fade>
          {#each stats as stat}
            <div class="info-item">
              <span class="info-label">{stat.label}:</span>
              <span class="info-value">{stat.value}</span>
            </div>
          {/each}
        </div>
      {/if}
    </div>
    
    <div class="file-tree-container">
      <h3 class="tree-title">Files</h3>
      <div class="file-tree">
        {#if !Array.isArray(files) || files.length === 0}
          <div class="empty-state">
            <div class="empty-icon">📂</div>
            <p>No files available</p>
            <p class="empty-help">Converted files will appear here..</p>
          </div>
        {:else}
          {#each files as item}
            <FileTreeEntry node={item} specificExportLabel={specificExportLabel} on:saveAs={handleSaveAs} />
          {/each}
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .explorer-container {
    display: flex;
    min-height: 60vh;
    width: 100%;
    background-image: linear-gradient(to bottom right, var(--accent-color), var(--accent-highlight));
    background-color: var(--accent-color);
    border-radius: 0 15px 15px 15px;
    box-sizing: border-box;
    animation: containerFadeIn 0.4s ease-out;
  }

  @keyframes containerFadeIn {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }

  .left-panel {
    flex: 1;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 0;
  }

  .right-panel {
    width: 40%;
    background-color: color-mix(in srgb, var(--accent-color) 30%, rgba(0, 0, 0, 0.185));
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 300px;
  }

  .stats-container {
    padding: 0.8rem 1rem;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-height: 80px;
  }

  .stats-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.3rem;
    margin-bottom: 0.2rem;
  }

  .stats-title {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  }

  .no-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: rgba(255, 255, 255, 0.4);
    font-style: italic;
    font-size: 0.9rem;
    padding: 0.5rem 0;
  }

  .stats-content {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    opacity: 0.9;
    line-height: 1.4rem;
  }

  .info-label {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
  }

  .info-value {
    color: rgba(255, 255, 255, 0.9);
    font-family: monospace;
  }

  .file-tree-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .tree-title {
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
  }

  .file-tree {
    flex: 1;
    overflow-y: auto;
    padding-right: 5px;
  }

  .file-tree::-webkit-scrollbar { width: 6px; }
  .file-tree::-webkit-scrollbar-thumb { background-color: rgba(255,255,255,0.2); border-radius: 3px; }

  .empty-state {
    text-align: center;
    padding: 2rem 1rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .empty-state p { margin: 0.5rem 0; }
  .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
  .empty-help { font-size: 0.9rem; opacity: 0.7; font-style: italic; margin-top: 0.5rem; }

  .button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: auto;
    padding-top: 1rem;
    flex-wrap: wrap;
  }

  .export-dropdown-wrapper {
    position: relative;
    display: flex;
  }

  .dropdown {
    position: absolute;
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%);
    background: var(--navbar-color);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    list-style: none;
    padding: 4px 0;
    margin: 0;
    min-width: 160px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  }

  .dropdown li {
    padding: 8px 16px;
    font-size: 0.85rem;
    color: white;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s;
  }

  .dropdown li:hover { background: rgba(255, 255, 255, 0.1); }

  @media (max-width: 768px) {
    .explorer-container {
      flex-direction: column;
    }

    .right-panel {
      width: 100%;
      min-width: 0;
      height: 500px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .button-group {
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .export-dropdown-wrapper {
        width: 100%;
        justify-content: center;
    }
  }
</style>