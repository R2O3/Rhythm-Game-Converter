<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { page } from '$app/stores';
  import FileIcon from '$lib/assets/file-icon.webp';
    import LazerButton from './LazerButton.svelte';

  export let accept: string = '';
  export let multiple: boolean = false;

  const dispatch = createEventDispatcher();

  let dropZone: HTMLDivElement;
  let fileInput: HTMLInputElement;
  let isDragOver = false;

  function getPageNameFromUrl(): string {
    return $page.url.pathname.split('/').filter(segment => segment.trim() !== '').pop() || 'default';
  }

  function handleFiles(files: FileList) {
    if (files.length > 0) {
      const pageName = getPageNameFromUrl();
      const filesArray = Array.from(files);
      
      dispatch('filesSelected', { files: filesArray });
      
      const event = new CustomEvent(`${pageName}:filesSelected`, { 
        detail: { files: filesArray },
        bubbles: true,
        composed: true
      });
      dropZone.dispatchEvent(event);
    }
  }

  function preventDefaults(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e: DragEvent) {
    isDragOver = false;
    if (e.dataTransfer?.files) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function handleFileInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      handleFiles(target.files);
    }
    target.value = '';
  }

  function handleDropZoneClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('label.browse-button')) {
      fileInput.click();
    }
  }

  onMount(() => {
    const events = ['dragenter', 'dragover', 'dragleave', 'drop'];
    events.forEach(eventName => {
      dropZone.addEventListener(eventName, preventDefaults);
    });

    return () => {
      events.forEach(eventName => {
        dropZone.removeEventListener(eventName, preventDefaults);
      });
    };
  });
</script>

<div class="file-selector-container">
  <div 
    class="file-selector file-selector-dropzone"
    class:dragover={isDragOver}
    bind:this={dropZone}
    on:click={handleDropZoneClick}
    on:dragenter={() => isDragOver = true}
    on:dragover={() => isDragOver = true}
    on:dragleave={() => isDragOver = false}
    on:drop={handleDrop}
    role="button"
    tabindex="0"
  >
    <div class="file-selector-content">
      <img class="file-icon" src={FileIcon} alt="File icon" loading="lazy" />
      
      <p class="instruction-text">Drag & drop files here</p>
      <p class="or-text">or</p>
      <LazerButton color="#c92222" id="browse-button">
        Browse Files
        <input 
          type="file"
          class="file-input"
          {accept}
          {multiple}
          bind:this={fileInput}
          on:change={handleFileInputChange}
        />
      </LazerButton>
    </div>
  </div>
</div>

<style>
  .file-selector-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  .file-selector-dropzone { 
    width: 100%;
    max-width: 80%;
    height: 200px;
    border: 2px dashed rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    background-color: transparent;
  }

  .file-selector-dropzone:hover {
    border: 2px dashed rgba(255, 255, 255, 0.623);
  }

  .file-selector-dropzone.dragover {
    border-color: rgba(255, 255, 255, 0.7);
    background-color: rgba(255, 255, 255, 0.05);
  }

  .file-selector-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .file-icon {
    width: 48px;
    height: 48px;
    color: rgba(255, 255, 255, 0.5);
    filter: invert(1);
    opacity: 0.35;
    margin-bottom: 1rem;
  }

  .instruction-text {
    margin: 0;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .or-text {
    margin: 0.5rem 0;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
  }

  .file-input {
    display: none;
  }
</style>