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
  
  import { getMapsetExtension, SUPPORTED_MANIA_CHART_FORMATS, SUPPORTED_MANIA_MAPSET_FORMATS } from '$lib/stores';
  import { prefixList, formatTime } from '$lib/helpers';
  import { SaveAs } from '$core/structures/Files';
  import type { FileTreeNode } from '$core/Managers/FileManager';
  import { mapLibraries } from '$core/Map/libs';
  import { FileManager } from '$core/Managers/FileManager';

  import { processImportedFiles } from '$core/Map/parse';
  import { convertMaps } from '$core/Map/convert';
  import { saveEntry, exportAllMaps } from '$core/Map/export';

  let selectedTab = 'mania';
  let chartType = 'osu';
  let explorerRef: any;
  let convertButtonDisabled = true;
  let selectedFiles: File[] = [];
  let explorerFiles: FileTreeNode[] = [];
  
  let timings = { extract: 0, parse: 0, convert: 0 };

  const readableNames: Record<string, string> = {
    'osu': 'osu! (.osu)',
    'qua': 'Quaver (.qua)',
    'fsc': 'fluXis (.fsc)',
    'sm': 'StepMania (.sm)'
  };

  $: chartOptions = SUPPORTED_MANIA_CHART_FORMATS.map(fmt => ({
      value: fmt,
      label: readableNames[fmt] || `.${fmt}`
  }));

  $: specificExportLabel = `.${getMapsetExtension(chartType)}`;

  onMount(async () => {
    try {
        await mapLibraries.initialize();
        await FileManager.initFs();
        
        const url = new URL(window.location.href);
        url.searchParams.set("mode", "mania");
        url.searchParams.set("type", "osu");
        
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
    timings = { extract: 0, parse: 0, convert: 0 };
    updateTimingStats();

    try {
        const result = await processImportedFiles(selectedFiles);
        timings.extract = result.extractTime;
        timings.parse = result.parseTime;
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
        const result = await convertMaps(chartType);
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
    saveEntry(node, exportType, chartType);
  }

  function handleExport(event: CustomEvent) {
    if (event.detail === SaveAs.zip) {
        exportAllMaps();
    }
  }

  function updateTimingStats() {
      if (explorerRef) {
          explorerRef.setStats([
              { label: 'Extract', value: timings.extract ? formatTime(timings.extract) : '' },
              { label: 'Parse', value: timings.parse ? formatTime(timings.parse) : '' },
              { label: 'Convert', value: timings.convert ? formatTime(timings.convert) : '' }
          ].filter(s => s.value));
      }
  }
</script>

<svelte:head>
  <style>
    :root {
      --navbar-color: #2d4b5e;
      --cursor-color: #329c96;
      --accent-color: #3b1b33;
      --content-color: #1f2e30;
      --accent-highlight: #2e707c1e;
      --navbutton-separator-color: #3dc5e0;
      --footer-accent-color: #222b2b;
      --footer-accent-color-lighter: #313d3d;
      --background-color: #1f2727;
    }
  </style>
</svelte:head>

<section>
  <h1>Map Conversion</h1>
  <p>Convert your maps or charts here.</p>
  <p>You can find supported formats below.</p>
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
            accept={prefixList(SUPPORTED_MANIA_CHART_FORMATS.concat(SUPPORTED_MANIA_MAPSET_FORMATS), '.').join(", ")+", .zip, .rar, .tar, .7z"}
            multiple={true}
            on:filesSelected={handleFilesSelected}
          />
          
          <fieldset>
          <legend>Conversion Options</legend>
          <div style="display: flex; justify-content: flex-end;">
            <div style="display: flex; align-items: center; gap: 10px; white-space: nowrap;">
              <p style="margin: 0; white-space: nowrap;">Convert to</p>
              
              <Dropdown 
                id="ChartType" 
                name="type" 
                items={chartOptions} 
                bind:value={chartType} 
              />
              
            </div>
          </div>
        </fieldset>
        </svelte:fragment>

        <svelte:fragment slot="convert-button">
          <LazerButton 
            id="map-convert-btn" 
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
  {#each prefixList(SUPPORTED_MANIA_CHART_FORMATS.concat(SUPPORTED_MANIA_MAPSET_FORMATS), '.') as f }
    <li>{f}</li>
  {/each}
    <li>Most archives also work.</li>
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