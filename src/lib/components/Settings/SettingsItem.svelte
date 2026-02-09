<script lang="ts">
  import { onDestroy } from 'svelte';
  
  export let setting: SettingsDefinition;

  let isChecked = false;
  let unsubscribe: (() => void) | null = null;

  $: {
    if (unsubscribe) {
      unsubscribe();
    }

    const { defaultVal: default_val, store, key } = setting;
    unsubscribe = store.subscribe((value: any) => {
      isChecked = key ? (value?.[key] ?? default_val) : (value ?? default_val);
    });
  }

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  function handleToggle() {
    const { store, key } = setting;
    store.update((current: any) => {
      if (key) {
        return { ...current, [key]: !current[key] };
      }
      return !current;
    });
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  }

  function handleToggleClick(event: MouseEvent) {
    event.stopPropagation();
    handleToggle();
  }
</script>

<div 
  class="setting-item" 
  on:click={handleToggle} 
  on:keydown={handleKeydown}
  role="button" 
  tabindex="0"
>
  <div class="setting-info">
    <label for={setting.id}>{setting.label}</label>
    <p class="setting-description">{setting.description}</p>
  </div>

  <div class="toggle" on:click={handleToggleClick} on:keydown={handleKeydown} role="button" tabindex="-1">
    <input
      id={setting.id}
      type="checkbox"
      checked={isChecked}
      on:change={handleToggle}
      tabindex="-1"
    />
    <span class="slider"></span>
  </div>
</div>

<style>
  .setting-item {
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    transition: all 0.2s ease-out;
    cursor: pointer;
  }

  .setting-item:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .setting-info {
    flex: 1;
    padding-right: 1rem;
  }

  .setting-info label {
    display: block;
    font-family: "Signika Negative", sans-serif;
    font-size: 1.1rem;
    font-weight: 500;
    color: white;
    margin-bottom: 0.25rem;
    cursor: pointer;
  }

  .setting-description {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }

  .toggle {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 18px;
    flex-shrink: 0;
    cursor: pointer;
  }

  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: transparent;
    border: 2px solid rgba(255, 255, 255, 0.3);
    transition: all 0.1s ease-out;
    border-radius: 28px;
    transform-origin: center;
  }

  input:checked + .slider {
    background-color: var(--cursor-color);
    border-color: var(--cursor-color);
    filter: blur(0.5px);
    mix-blend-mode: lighten;
    transform: scaleX(1.25);
    animation: bounce 0.2s ease-out;
  }

  @keyframes bounce {
    0% {
      transform: scaleX(1);
    }
    50% {
      transform: scaleX(1.35);
    }
    100% {
      transform: scaleX(1.25);
    }
  }

  .slider:hover {
    opacity: 0.9;
  }
</style>