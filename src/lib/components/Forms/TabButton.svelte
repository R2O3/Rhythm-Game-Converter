<script lang="ts">
  export let tabId: string;
  export let title: string;
  export let active: boolean = false;
  export let onClick: (tabId: string) => void;
</script>

<button
  class="tab-button"
  class:active
  data-tab={tabId}
  on:click={() => onClick(tabId)}
>
  {title}
</button>

<style>
  .tab-button {
    font-size: medium;
    padding: 0.5rem 1.5rem 1.2rem 1.5rem;
    cursor: pointer;
    background-color: var(--accent-color);
    filter: brightness(0.8);
    border: none;
    border-radius: 15px;
    color: white;
    font-weight: bold;
    margin-bottom: -0.9rem;
  }
  
  .tab-button.active {
    background-color: var(--accent-color);
    filter: brightness(1);
    position: relative;
  }
</style>