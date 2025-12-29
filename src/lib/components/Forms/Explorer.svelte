<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import FileTreeEntry from './FileTreeEntry.svelte';

  export let files: any[] = [];
  export let mapExportLabel: string = 'map';

  const dispatch = createEventDispatcher();

  let exportDisabled = true;

  let extractionTime = '';
  let parseTime = '';
  let convertTime = '';

  function handleSaveAs(event: CustomEvent) {
    dispatch('saveAs', event.detail);
  }

  function handleExport(option: string) {
    dispatch('export', option);
  }

  export function setTimingInfo(extraction: string, parse: string, convert: string) {
    extractionTime = extraction;
    parseTime = parse;
    convertTime = convert;
  }

  onMount(() => {
    const handleConvertDone = () => {
      exportDisabled = false;
    };

    document.addEventListener('convert:done', handleConvertDone);

    return () => {
      document.removeEventListener('convert:done', handleConvertDone);
    };
  });
</script>

<div class="explorer-container">
  <div class="left-panel">
    <slot name="form" />
    
    <div class="button-group">
      <slot name="convert-button" />
      <button
        class="export-button"
        disabled={exportDisabled}
        on:click={() => handleExport('zip')}
      >
        💾 Export
      </button>
    </div>
  </div>

  <div class="right-panel">
    <div class="timing-info">
      <h3 class="info-item" class:empty-info-state={!extractionTime}>
        <span class="info-label">Time taken to extract:</span>
        <span class="info-value">{extractionTime || ''}</span>
      </h3>
      <h3 class="info-item" class:empty-info-state={!parseTime}>
        <span class="info-label">Time taken to parse:</span>
        <span class="info-value">{parseTime || ''}</span>
      </h3>
      <h3 class="info-item" class:empty-info-state={!convertTime}>
        <span class="info-label">Time taken to convert:</span>
        <span class="info-value">{convertTime || ''}</span>
      </h3>
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
            <FileTreeEntry node={item} {mapExportLabel} on:saveAs={handleSaveAs} />
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
    overflow: hidden;
    animation: containerFadeIn 0.4s ease-out;
  }

  @keyframes containerFadeIn {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .left-panel {
    flex: 1;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .right-panel {
    width: 40%;
    background-color: color-mix(in srgb, var(--accent-color) 30%, rgba(0, 0, 0, 0.185));
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .timing-info {
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    opacity: 0.9;
    margin: 0;
    line-height: 1.5rem;
  }

  .info-item.empty-info-state {
    opacity: 0.3;
  }

  .info-label {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
  }

  .info-value {
    color: rgba(255, 255, 255, 0.9);
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
  }

  .empty-state {
    text-align: center;
    padding: 2rem 1rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .empty-state p {
    margin: 0.5rem 0;
  }
  
  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .empty-help {
    font-size: 0.9rem;
    opacity: 0.7;
    font-style: italic;
    margin-top: 0.5rem;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: auto;
    padding-top: 1rem;
  }

  .export-button {
    color: white;
    width: 8.5rem;
    height: 3.2rem;
    border: 3px solid rgba(255, 255, 255, 0.651);
    border-radius: 15px;
    transition: all 0.1s ease-out;
    cursor: pointer;
    background: #ff69b4;
    font-size: 1.4em;
    font-weight: 550;
  }

  .export-button:not([disabled]):hover {
    background: #e2569c;
    font-size: 1.5em;
  }

  .export-button:not([disabled]):active {
    background: white;
    border-color: var(--background-color);
    border-width: 4px;
    color: #ff69b4;
    font-size: 1.3em;
  }

  .export-button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .explorer-container {
      flex-direction: column;
    }

    .right-panel {
      width: 100%;
    }

    .button-group {
      flex-direction: column;
    }
  }
</style>