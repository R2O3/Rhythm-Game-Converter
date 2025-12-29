<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide, fade } from 'svelte/transition';

  export let node: any;
  export let specificExportLabel: string = 'Map';

  const dispatch = createEventDispatcher();
  let isExpanded = false;
  let showDropdown = false;
  let dropdownButton: HTMLButtonElement;

  function getFileIcon(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    const iconMap: Record<string, string> = {
      zip: '📚', rar: '📚', osz: '📚', mp4: '🎬', mp3: '💿', 
      jpg: '🖼️', png: '🖼️', osu: '🗺️', qua: '🗺️'
    };
    return iconMap[extension] || '📄';
  }

  const toggleFolder = () => node.type === 'folder' && (isExpanded = !isExpanded);
  
  const handleDropdown = (e: Event, type: string) => {
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
      toggleFolder();
    }
  }

  function handleButtonKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      node.type === 'folder' ? (showDropdown = !showDropdown) : dispatch('saveAs', { node, exportType: 'file' });
    }
    if (event.key === 'Escape' && showDropdown) {
      event.stopPropagation();
      showDropdown = false;
      dropdownButton?.focus();
    }
  }

  function handleMenuItemKeyDown(event: KeyboardEvent, exportType: string) {
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
    class={node.type === 'folder' ? 'folder-item' : 'file-item'} 
    on:click={toggleFolder}
    on:keydown={handleKeyDown}
    tabindex="0"
    role="button"
    aria-label={node.type === 'folder' ? `Toggle ${node.name} folder` : `Open ${node.name} file`}
  >
      {#if node.type === 'folder'}
          <span class="chevron">{isExpanded ? '▼' : '►'}</span>
      {/if}

      <span class="item-name">
        <span class="item-icon">{node.type === 'folder' ? '📦' : getFileIcon(node.name)}</span>
        <span class="truncate">{node.name}</span>
      </span>

      <div class="file-actions">
        <div class="dropdown-wrapper">
          <button 
            bind:this={dropdownButton}
            class="save-btn" 
            on:click|stopPropagation={() => node.type === 'folder' ? (showDropdown = !showDropdown) : dispatch('saveAs', { node, exportType: 'file' })}
            on:keydown|stopPropagation={(e) => handleButtonKeyDown(e)}
            aria-haspopup={node.type === 'folder' ? 'menu' : undefined}
            aria-expanded={node.type === 'folder' ? showDropdown : undefined}
          >
          {#if node.type === 'folder'}
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
              {#if node.type === 'folder'}
                <li 
                  role="menuitem" 
                  tabindex="0"
                  on:click={(e) => handleDropdown(e, 'zip')}
                  on:keydown={(e) => handleMenuItemKeyDown(e, 'zip')}
                >
                  Zip
                </li>
                <li 
                  role="menuitem" 
                  tabindex="0"
                  on:click={(e) => handleDropdown(e, 'specifc')}
                  on:keydown={(e) => handleMenuItemKeyDown(e, specificExportLabel)}
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
    <div class="folder-contents" transition:slide={{ duration: 150 }}>
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

  .file-item, .folder-item {
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

  .file-item:hover, .folder-item:hover {
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
    background: #ff69b4;
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
    background: #ff69b4;
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

  .folder-contents {
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