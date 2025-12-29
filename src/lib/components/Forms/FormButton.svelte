<script lang="ts">
  export let icon: string | undefined = '';
  export let id: string | undefined;
  export let disabled: boolean | undefined = false;
  
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
</script>

<button 
  type="button" 
  id={id}
  class="form-button"
  disabled={disabled}
  on:click={() => !disabled && dispatch('click')}
>
  <span class="button-content">
    {#if icon}
      <span class="icon">{icon}</span>
    {/if}
    <span class="text"><slot /></span>
  </span>
</button>

<style>
  .form-button {
    color: white;
    height: 3.2rem;
    padding: 0 1rem;
    padding-left: 0.3rem;
    border: 3px solid rgba(255, 255, 255, 0.651);
    border-radius: 15px;
    transition: all 0.1s ease-out;
    cursor: pointer;
    background: var(--accent-color);
    font-size: 1.4em;
    font-weight: 550;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: auto;
  }

  .button-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 0.25rem;
  }

  .form-button:not([disabled]):hover {
    background: rgba(255, 255, 255, 0.116);
    color: white;
    font-size: 1.5em;
  }

  .form-button:not([disabled]):active {
    background: white;
    border-color: var(--background-color);
    border-width: 4px;
    color: var(--accent-color);
    font-size: 1.3em;
  }

  .form-button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>