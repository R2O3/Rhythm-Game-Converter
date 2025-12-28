<script lang="ts">
  export let title: string;
  export let tabId: string = title.toLowerCase().replace(/\s+/g, '-');
  export let active: boolean = false;
</script>

<div class:active data-tab-content={tabId} data-tab-title={title} class="tab-content">
  <slot />
</div>

<style>
  .tab-content {
    display: none;
  }
  
  .tab-content.active {
    display: block;
  }
</style>