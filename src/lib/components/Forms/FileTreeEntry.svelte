<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide, fade } from 'svelte/transition';
  import { FsEntryType, SaveAs } from '$core/structures/Files';
  import { SUPPORTED_MANIA_CHART_FORMATS, SUPPORTED_MANIA_MAPSET_FORMATS, SUPPORTED_MANIA_SKIN_FORMATS } from '$lib/stores';
  
  export let node: any;
  export let specificExportLabel: string = 'Map';

  const supportedMaps = SUPPORTED_MANIA_CHART_FORMATS
  .reduce((acc: Record<string, boolean>, format: string) => { acc[format] = true; return acc; }, {});

  const supportedArchives = SUPPORTED_MANIA_MAPSET_FORMATS
  .concat(SUPPORTED_MANIA_SKIN_FORMATS)
  .concat(['zip', 'rar'])
  .reduce((acc: Record<string, boolean>, format: string) => { acc[format] = true; return acc; }, {});

  const dispatch = createEventDispatcher();
  let isExpanded = false;
  let showDropdown = false;
  let dropdownButton: HTMLButtonElement;

  function getFileIcon(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    const iconMap: Record<string, string> = {
      mp4: '🎬', webm: '🎬',
      mp3: '💿', ogg: '💿', wav: '💿',
      jpg: '🖼️', jpeg: '🖼️', png: '🖼️'
    };
    return iconMap[extension] || supportedMaps[extension] ? '🗺️' : supportedArchives[extension] ? '📚' : '📄';
  }

  const toggleDirectory = () => node.type === FsEntryType.directory && (isExpanded = !isExpanded);
  
  const handleDropdown = (e: Event, type: SaveAs) => {
    e.stopPropagation();
    showDropdown = false;
    dispatch('saveAs', { node, exportType: type });
  };

  function handleClickOutside(event: MouseEvent) {
    if (showDropdown && dropdownButton && !dropdownButton.contains(event.target as Node)) {
      showDropdown = false;
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDirectory();
    }
  }

  function handleButtonKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      node.type === FsEntryType.directory ? (showDropdown = !showDropdown) : dispatch('saveAs', { node, exportType: SaveAs.file });
    }
    if (event.key === 'Escape' && showDropdown) {
      event.stopPropagation();
      showDropdown = false;
      dropdownButton?.focus();
    }
  }

  function handleMenuItemKeyDown(event: KeyboardEvent, exportType: SaveAs) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleDropdown(event, exportType);
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      showDropdown = false;
      dropdownButton?.focus();
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="entry-container">
  <div 
    class={node.type === FsEntryType.directory ? 'directory-item' : 'file-item'} 
    on:click={toggleDirectory}
    on:keydown={handleKeyDown}
    tabindex="0"
    role="button"
    aria-label={node.type === FsEntryType.directory ? `Toggle ${node.name} directory` : `Open ${node.name} file`}
  >
      {#if node.type === FsEntryType.directory}
          <span class="chevron">{isExpanded ? '▼' : '►'}</span>
      {/if}

      <span class="item-name">
        <span class="item-icon">{node.type === FsEntryType.directory ? '📦' : getFileIcon(node.name)}</span>
        <span class="truncate">{node.name}</span>
      </span>

      <div class="file-actions">
        <div class="dropdown-wrapper">
          <button 
            bind:this={dropdownButton}
            class="save-btn" 
            on:click|stopPropagation={() => node.type === FsEntryType.directory ? (showDropdown = !showDropdown) : dispatch('saveAs', { node, exportType: 'file' })}
            on:keydown|stopPropagation={(e) => handleButtonKeyDown(e)}
            aria-haspopup={node.type === FsEntryType.directory ? 'menu' : undefined}
            aria-expanded={node.type === FsEntryType.directory ? showDropdown : undefined}
          >
          {#if node.type === FsEntryType.directory}
            💾 Save ▾
          {:else}
            💾 Save
          {/if}
          </button>

          {#if showDropdown}
            <ul 
              class="dropdown" 
              transition:fade={{ duration: 100 }}
              role="menu"
            >
              {#if node.type === FsEntryType.directory}
                <li 
                  role="menuitem" 
                  tabindex="0"
                  on:click={(e) => handleDropdown(e, SaveAs.zip)}
                  on:keydown={(e) => handleMenuItemKeyDown(e, SaveAs.zip)}
                >
                  Zip
                </li>
                <li 
                  role="menuitem" 
                  tabindex="0"
                  on:click={(e) => handleDropdown(e, SaveAs.specific)}
                  on:keydown={(e) => handleMenuItemKeyDown(e, SaveAs.specific)}
                >
                  {specificExportLabel}
                </li>
              {/if}
            </ul>
          {/if}
        </div>
      </div>
  </div>

  {#if isExpanded && node.children}
    <div class="directory-contents" transition:slide={{ duration: 150 }}>
      {#each node.children as child}
        <svelte:self node={child} mapExportLabel={specificExportLabel} on:saveAs />
      {/each}
    </div>
  {/if}
</div>

<style>
  .entry-container {
    max-width: 100%;
    overflow: visible;
  }

  .file-item, .directory-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px;
    gap: 8px;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.15s ease, transform 0.15s ease;
    animation: reveal 0.15s ease-out;
  }

  @keyframes reveal {
    from { opacity: 0; transform: translateX(-5px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .file-item:hover, .directory-item:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .item-name {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    flex: 1;
  }

  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .file-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .dropdown-wrapper {
    position: relative;
  }

  .save-btn {
    background: var(--navbar-color);
    color: white;
    border: none;
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 0.75rem;
    font-weight: bold;
    cursor: pointer;
    white-space: nowrap;
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    background: var(--navbar-color);
    border-radius: 4px;
    list-style: none;
    padding: 4px 0;
    margin: 0;
    min-width: 110px;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .dropdown li {
    padding: 6px 12px;
    font-size: 0.75rem;
    color: white;
    white-space: nowrap;
  }

  .dropdown li:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .directory-contents {
    padding-left: 12px;
    margin-left: 8px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }

  .chevron {
    font-size: 0.65rem;
    opacity: 0.4;
    width: 12px;
    text-align: center;
  }
</style>