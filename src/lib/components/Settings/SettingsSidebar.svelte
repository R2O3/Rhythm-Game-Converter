<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import SettingItem from './SettingsItem.svelte';
  import { Debug, userConfig } from '$lib/stores';

  export let isOpen = false;
  export let onClose = () => {};
  
  let className = '';
  export { className as class };

  export let settings: SettingsDefinition[] = [
    {
      id: 'custom-cursor',
      label: 'Custom Cursor',
      description: 'Whether or not to use an osu!lazer style cursor.',
      store: userConfig,
      key: 'customCursor' 
    },
    {
      id: 'debug',
      label: 'Debug',
      description: 'Shows debug info inside the dev tools console.',
      store: Debug,
    },
  ];

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_interactive_supports_focus -->
{#if isOpen}
  <div 
    class="backdrop" 
    on:click={handleBackdropClick}
    role="dialog"
    aria-modal="true"
    aria-label="Settings Sidebar"
    transition:fade={{ duration: 300 }}
  >
    <aside 
      class="settings-sidebar {className}"
      transition:fly={{ x: -400, duration: 400, opacity: 1, easing: quintOut }}
    >
      <div class="header">
        <h2>Settings</h2>
      </div>

      <div class="settings-content">
        <div class="setting-group">
          {#each settings as setting (setting.id)}
            <SettingItem {setting} />
          {/each}
        </div>
      </div>
    </aside>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.25);
    z-index: 1000;
    backdrop-filter: blur(8px);
    display: flex; 
  }

  .settings-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 400px;
    max-width: 90vw;
    height: 100vh;
    background: var(--content-color);
    box-shadow: 4px 0 12px rgba(0, 0, 0, 0.3);
    z-index: 1001;
    display: flex;
    flex-direction: column;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  }

  h2 {
    font-family: "Signika Negative", sans-serif;
    font-size: 2.5rem;
    font-weight: 600;
    color: white;
    margin: 0;
  }

  .settings-content {
    padding: 0.75rem;
    overflow-y: auto;
    flex: 1;
  }

  .setting-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>