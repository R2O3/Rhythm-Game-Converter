<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  export let files: any[] = [];

  const dispatch = createEventDispatcher();

  let fileTreeElement: HTMLDivElement;
  let exportDisabled = true;

  let extractionTime = '';
  let parseTime = '';
  let convertTime = '';

  interface FileNode {
    name: string;
    type: 'file' | 'folder';
    path?: string;
    children?: FileNode[];
    data?: any;
  }

  function getFileIcon(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    
    const iconMap: Record<string, string> = {
      zip: '📚 ', rar: '📚 ', '7z': '📚 ', tar: '📚 ', gz: '📚 ',
      qp: '📚 ', osz: '📚 ', fms: '📚 ',
      mp4: '🎬 ', avi: '🎬 ', mkv: '🎬 ', mov: '🎬 ', webm: '🎬 ',
      mp3: '💿 ', wav: '💿 ', flac: '💿 ', aac: '💿 ', ogg: '💿 ',
      jpg: '🖼️ ', jpeg: '🖼️ ', png: '🖼️ ', gif: '🖼️ ', svg: '🖼️ ', webp: '🖼️ ',
      osu: '🗺️ ', sm: '🗺️ ', qua: '🗺️ ', fsc: '🗺️ ',
    };

    return iconMap[extension] || '📄 ';
  }

  function handleSaveAs(node: FileNode) {
    dispatch('saveAs', node);
  }

  function handleExport(option: string) {
    dispatch('export', option);
  }

  function renderFileTree() {
    if (!fileTreeElement) return;
    
    fileTreeElement.innerHTML = '';

    if (!Array.isArray(files) || files.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'empty-state';
      emptyMessage.innerHTML = `
        <div class="empty-icon">📂</div>
        <p>No files available</p>
        <p class="empty-help">Converted files will appear here..</p>
      `;
      fileTreeElement.appendChild(emptyMessage);
      return;
    }

    files.forEach(item => {
      renderFileTreeInternal(item, fileTreeElement);
    });
  }

  function renderFileTreeInternal(node: FileNode, parentElement: HTMLElement) {
    const element = document.createElement('div');

    if (node.type === 'folder') {
      const folderId = `folder-${node.path?.replace(/\//g, '-') || node.name}`;
      element.innerHTML = `
        <div class="folder-item" data-folder="${node.name}" data-path="${node.path || ''}">
          <span data-icon="📦 ">${node.name}</span>
          <div class="file-actions">
            <button class="save-as-btn" title="Save Folder As">💾 Save as</button>
            <button class="toggle-btn" title="Toggle Folder">►</button>
          </div>
        </div>
        <div class="folder-contents" id="${folderId}" style="display: none;"></div>
      `;

      const folderContents = element.querySelector('.folder-contents') as HTMLElement;
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          renderFileTreeInternal(child, folderContents);
        });
      } else {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-folder-message';
        emptyMessage.textContent = 'This folder is empty';
        folderContents.appendChild(emptyMessage);
      }

      const toggleBtn = element.querySelector('.toggle-btn') as HTMLButtonElement;
      const saveAsBtn = element.querySelector('.save-as-btn') as HTMLButtonElement;
      const folderItem = element.querySelector('.folder-item') as HTMLElement;

      folderItem.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains('save-as-btn')) {
          const isHidden = folderContents.style.display === 'none';
          folderContents.style.display = isHidden ? 'block' : 'none';
          toggleBtn.textContent = isHidden ? '▼' : '►';
        }
      });

      saveAsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleSaveAs(node);
      });
    } else {
      const fileIcon = getFileIcon(node.name);
      element.innerHTML = `
        <div class="file-item" data-path="${node.path || ''}">
          <span data-icon="${fileIcon}">${node.name}</span>
          <div class="file-actions">
            <button class="save-as-btn" title="Save As">💾 Save</button>
          </div>
        </div>
      `;

      const saveAsBtn = element.querySelector('.save-as-btn') as HTMLButtonElement;
      saveAsBtn.addEventListener('click', () => {
        handleSaveAs(node);
      });
    }

    parentElement.appendChild(element);
  }

  export function setTimingInfo(extraction: string, parse: string, convert: string) {
    extractionTime = extraction;
    parseTime = parse;
    convertTime = convert;
  }

  $: if (fileTreeElement) {
    renderFileTree();
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
      {#if extractionTime}
        <div class="info-item">
          <span class="info-label">Extraction:</span>
          <span class="info-value">{extractionTime}</span>
        </div>
      {/if}
      {#if parseTime}
        <div class="info-item">
          <span class="info-label">Parse:</span>
          <span class="info-value">{parseTime}</span>
        </div>
      {/if}
      {#if convertTime}
        <div class="info-item">
          <span class="info-label">Convert:</span>
          <span class="info-value">{convertTime}</span>
        </div>
      {/if}
    </div>
    
    <div class="file-tree-container">
      <h3 class="tree-title">Files</h3>
      <div id="file-tree" bind:this={fileTreeElement}></div>
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

  #file-tree {
    flex: 1;
    overflow-y: auto;
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

  :global(.file-item), :global(.folder-item) {
    padding: 0.5rem;
    margin: 0.25rem 0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  :global(.folder-item:hover) {
    background-color: color-mix(in srgb, var(--accent-color) 75%, white);
  }

  :global(.file-item:hover) {
    background-color: color-mix(in srgb, var(--accent-color) 85%, white);
  }

  :global(.file-item) {
    background-color: color-mix(in srgb, var(--accent-color) 95%, white);
    cursor: default;
  }

  :global(span[data-icon]::before) {
    content: attr(data-icon);
    user-select: none;
    filter: brightness(1.2) contrast(0.7) saturate(0.9);
    display: inline-block;
  }

  :global(.folder-item) {
    background-color: color-mix(in srgb, var(--accent-color) 90%, white);
    cursor: pointer;
  }

  :global(.folder-contents) {
    padding-left: 1rem;
    margin-left: 0.5rem;
    border-left: 2px solid color-mix(in srgb, var(--accent-color) 70%, white);
  }

  .empty-folder-message {
    padding: 0.5rem;
    color: rgba(255,255,255,0.7);
    font-style: italic;
    font-size: 0.9rem;
  }
  
  .empty-state {
    text-align: center;
    padding: 2rem 1rem;
    color: rgba(255,255,255,0.8);
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

  .file-actions {
    display: flex;
    gap: 0.5rem;
  }

  :global(.save-as-btn) {
    border: 0;
    background: #ff69b4;
    color: white;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-size: 0.85rem;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    transition: background 0.2s;
  }

  :global(.toggle-btn) {
    border: 0;
    color: white;
    background: transparent;
    cursor: pointer;
    user-select: none;
    font-size: 1rem;
  }

  :global(.save-as-btn:hover) {
    background: #e2569c;
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