<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';

  export let id: string = '';
  export let name: string = '';
  export let items: { value: string; label: string }[] = [];
  export let value: string = '';
  export let placeholder: string = 'Select an option';

  let isOpen = false;
  const dispatch = createEventDispatcher();

  $: selectedLabel = items.find((i) => i.value === value)?.label || placeholder;

  function toggle() {
    isOpen = !isOpen;
  }

  function select(item: { value: string; label: string }) {
    value = item.value;
    isOpen = false;
    dispatch('change', value);
  }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        isOpen = false;
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      isOpen = false;
    }
  }
</script>

<div {id} class="custom-dropdown" use:clickOutside on:keydown={handleKeydown} role="none">
  <input type="hidden" {name} {value} />

  <button
    type="button"
    class="trigger"
    on:click={toggle}
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    aria-controls="{id}-listbox"
  >
    {selectedLabel}
    <span class="arrow" class:rotated={isOpen}>▼</span>
  </button>

  {#if isOpen}
    <ul
      id="{id}-listbox"
      class="options-list"
      transition:slide={{ duration: 200 }}
      role="listbox"
      tabindex="-1"
    >
      {#each items as item}
        <li role="none">
          <button
            type="button"
            class="option"
            class:selected={value === item.value}
            role="option"
            aria-selected={value === item.value}
            on:click={() => select(item)}
          >
            {item.label}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .custom-dropdown {
    position: relative;
    width: 200px;
  }

  .trigger {
    width: 100%;
    padding: 0.5rem 1rem;
    background-color: var(--accent-color);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    transition: all 0.2s;
  }

  .trigger:hover {
    border-color: rgba(255, 255, 255, 0.6);
    background-color: rgba(255, 255, 255, 0.05);
  }

  .arrow {
    font-size: 0.7rem;
    transition: transform 0.2s;
    opacity: 0.7;
  }

  .arrow.rotated {
    transform: rotate(180deg);
  }

  .options-list {
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    right: 0;
    background-color: var(--accent-color);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    margin: 0;
    padding: 5px 0;
    list-style: none;
    z-index: 100;
    max-height: 250px;
    overflow-y: auto;
  }

  .option {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 0.6rem 1rem;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    font-size: 0.95rem;
    display: block;
    transition: background 0.1s;
  }

  .option:hover,
  .option:focus {
    background-color: rgba(255, 255, 255, 0.15);
    color: white;
    outline: none;
  }

  .option.selected {
    background-color: rgba(255, 255, 255, 0.25);
    color: white;
    font-weight: 600;
  }

  .options-list::-webkit-scrollbar {
    width: 6px;
  }
  .options-list::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
</style>