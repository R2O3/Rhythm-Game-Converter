<script lang="ts">
  import { onMount } from 'svelte';
  import { replaceState } from '$app/navigation';
  
  import AppForm from '$lib/components/Forms/AppForm.svelte';
  import AppFormTab from '$lib/components/Forms/AppFormTab.svelte';
  import TabButton from '$lib/components/Forms/TabButton.svelte';
  import FileSelector from '$lib/components/FileSelector.svelte';
  import Dropdown from '$lib/components/Dropdown.svelte';
  import Explorer from '$lib/components/Forms/Explorer.svelte';
  import LazerButton from '$lib/components/LazerButton.svelte';
  
  import { SUPPORTED_MANIA_SKIN_FORMATS } from '$lib/stores';
  import { prefixList, formatTime } from '$lib/helpers';
  import { SaveAs } from '$core/structures/Files';
  import type { FileTreeNode } from '$core/Managers/FileManager';
  import { skinLibraries } from '$core/Skin/libs';
  import { FileManager } from '$core/Managers/FileManager';

  import { processImportedFiles } from '$core/Skin/import';
  import { convertSkins } from '$core/Skin/convert';
  import { saveEntry, exportAllSkins } from '$core/Skin/export';

  let selectedTab = 'mania';
  let skinType = 'osk';
  let explorerRef: any;
  let convertButtonDisabled = true;
  let selectedFiles: File[] = [];
  let explorerFiles: FileTreeNode[] = [];
  
  let timings = { extract: 0, load: 0, convert: 0 };

  const readableNames: Record<string, string> = {
    'osk': 'osu! (.osk)',
    'fsk': 'fluXis (.fsk)',
  };

  $: chartOptions = SUPPORTED_MANIA_SKIN_FORMATS.map(fmt => ({
      value: fmt,
      label: readableNames[fmt] || `.${fmt}`
  }));

  $: specificExportLabel = `.${skinType}`;

  onMount(async () => {
    try {
        await skinLibraries.initialize();
        await FileManager.initFs();
        
        const url = new URL(window.location.href);
        url.searchParams.set("mode", "mania");
        url.searchParams.set("type", "osk");
        
        replaceState(url, {}); 
    } catch (e) {
        console.error("Failed to initialize:", e);
    }
  });

  function handleTabChange(tabId: string) {
    selectedTab = tabId;
  }

  async function handleFilesSelected(event: CustomEvent) {
    selectedFiles = event.detail.files;
    if (selectedFiles.length === 0) return;

    convertButtonDisabled = true;
    timings = { extract: 0, load: 0, convert: 0 };
    updateTimingStats();

    try {
        const result = await processImportedFiles(selectedFiles);
        timings.extract = result.extractTime;
        timings.load = result.loadTime;
        updateTimingStats();
        convertButtonDisabled = false;
    } catch (error) {
        console.error("Import failed:", error);
    }
  }

  async function handleConvert() {
    if (selectedFiles.length === 0) return;
    
    document.dispatchEvent(new CustomEvent('convert:start'));
    
    try {
        const result = await convertSkins(skinType);
        explorerFiles = result?.fileTree ?? [];
        timings.convert = result?.convertTime ?? 0;
        updateTimingStats();
        document.dispatchEvent(new CustomEvent('convert:done'));
    } catch (error) {
        console.error("Conversion failed:", error);
    }
  }

  function handleSaveAs(event: CustomEvent) {
    const { node, exportType } = event.detail;
    saveEntry(node, exportType, skinType);
  }

  function handleExport(event: CustomEvent) {
      exportAllSkins(event.detail, skinType);
  }

  function updateTimingStats() {
      if (explorerRef) {
          explorerRef.setStats([
              { label: 'Extract', value: timings.extract ? formatTime(timings.extract) : '' },
              { label: 'Load', value: timings.load ? formatTime(timings.load) : '' },
              { label: 'Convert', value: timings.convert ? formatTime(timings.convert) : '' }
          ].filter(s => s.value));
      }
  }
</script>

<svelte:head>
  <style>
    :root {
      --navbar-color: #2d5e4b;
      --cursor-color: #32966c;
      --accent-color: #3b331b;
      --content-color: #1f3028;
      --accent-highlight: #2e7c511e;
      --navbutton-separator-color: #3de074;
      --footer-accent-color: #222b26;
      --footer-accent-color-lighter: #313d38;
      --background-color: #1f271f;
    }
  </style>
</svelte:head>

<section>
  <h1>Skin Conversion</h1>
  <p>Convert your skins here.</p>
  <p>You can find supported formats below.</p>

  <div class="warning">
    <strong>Disclaimer:</strong> This is made to ease the hassle of porting skins so don't expect perfect conversion, but still open an issue on Github
    if you have suggestions or something isn't working or converted as expected.
  </div>
</section>

<hr />

<div class="conversion-wrapper">
  <AppForm 
    activeTab="mania" 
    tabName="mode" 
    on:tabChanged={(e) => handleTabChange(e.detail.tabId)}
  >
    <svelte:fragment slot="tabs" let:selectedTab let:setActiveTab>
      <TabButton
        tabId="mania"
        title="Mania"
        active={selectedTab === 'mania'}
        onClick={setActiveTab}
      />
    </svelte:fragment>

    <AppFormTab title="Mania" tabId="mania" active={selectedTab === 'mania'}>
      <Explorer 
        bind:this={explorerRef}
        files={explorerFiles}
        {specificExportLabel}
        on:saveAs={handleSaveAs}
        on:export={handleExport}
      >
        <svelte:fragment slot="form">
          <FileSelector
            accept={prefixList(SUPPORTED_MANIA_SKIN_FORMATS, '.').join(", ")}
            multiple={false}
            on:filesSelected={handleFilesSelected}
          />
          
          <fieldset>
          <legend>Conversion Options</legend>
          <div style="display: flex; justify-content: flex-end;">
            <div style="display: flex; align-items: center; gap: 10px; white-space: nowrap;">
              <p style="margin: 0; white-space: nowrap;">Convert to</p>
              
              <Dropdown 
                id="SkinType" 
                name="type" 
                items={chartOptions} 
                bind:value={skinType} 
              />
              
            </div>
          </div>
        </fieldset>
        </svelte:fragment>

        <svelte:fragment slot="convert-button">
          <LazerButton 
            id="skin-convert-btn" 
            color="#5932cd"
            disabled={convertButtonDisabled}
            on:click={handleConvert}
          >
            Convert
          </LazerButton>
        </svelte:fragment>
      </Explorer>
    </AppFormTab>
  </AppForm>
</div>

<hr />

<section>
  <h2>Supported Formats</h2>
  <ul>
  {#each prefixList(SUPPORTED_MANIA_SKIN_FORMATS, '.') as f }
    <li>{f}</li>
  {/each}

  &nbsp;

  <div class="info">
    <strong>Something to know:</strong> Your skin file has to end in one of these extensions, zip or any other archive won't work.
  </div>
  </ul>
</section>

<style>
  .conversion-wrapper {
    max-width: 65rem;
    margin: 0 auto;
  }

  :global(fieldset) {
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 0;
  }

  :global(legend) {
    padding: 0 0.5rem;
    color: white;
    font-weight: 600;
  }
</style>