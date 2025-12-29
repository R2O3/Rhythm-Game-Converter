<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';

  export let activeTab: string | null = null;
  export let tabName: string = 'tab';

  const dispatch = createEventDispatcher();

  let selectedTab = activeTab;
  let tabContents: Array<{ id: string; title: string; component: any }> = [];
  let explorerFiles: any[] = [];
  let showExplorer = false;

  function setActiveTab(tabId: string, updateUrl = true) {
    selectedTab = tabId;

    if (browser && updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set(tabName, tabId);
      window.history.replaceState({}, '', url);
    }

    dispatch('tabChanged', { tabId });
    
    if (browser) {
      document.dispatchEvent(new CustomEvent('tab:changed', { detail: { tabId } }));
    }
  }

  onMount(() => {
    if (!selectedTab && browser) {
      const params = new URLSearchParams(window.location.search);
      selectedTab = params.get(tabName) || activeTab;
    }

    const handlePopState = () => {
      if (browser) {
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get(tabName);
        if (tabParam) {
          setActiveTab(tabParam, false);
        }
      }
    };

    if (browser) {
      window.addEventListener('popstate', handlePopState);
      
      // document.addEventListener('convert:done', handleConvertDone);

      // return () => {
      //   window.removeEventListener('popstate', handlePopState);
      //   document.removeEventListener('convert:done', handleConvertDone);
      // };
    }
  });

  export function updateExplorer(files: any[]) {
    explorerFiles = files;
  }
</script>

<div class="app-form" data-tab-name={tabName} data-active-tab={selectedTab}>
  <div class="tabs-header">
    <div class="tabs-buttons">
      <slot name="tabs" {selectedTab} {setActiveTab} />
    </div>
  </div>
  
  <div class="tabs-content-container">
    <slot {selectedTab} />
  </div>
</div>

<style>
  .app-form {
    max-width: 65rem;
    margin: 0 auto;
    transition: transform 0.2s ease;
  }

  .app-form:hover {
    transform: scale(1.005);
  }
  
  .tabs-header {
    padding: 0.5rem 0 0;
  }
  
  .tabs-buttons {
    display: flex;
    gap: 0rem;
  }
  
  .tabs-content-container {
    background-image: linear-gradient(to bottom right, var(--accent-color), var(--accent-highlight));
    background-color: var(--accent-color);
    border-radius: 0px 15px 15px 15px;
    padding: 1.5rem;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    position: relative;
    z-index: 0;
  }
</style>