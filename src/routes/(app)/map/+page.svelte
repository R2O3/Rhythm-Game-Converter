<script lang="ts">
  import AppForm from '$lib/components/Forms/AppForm.svelte';
  import AppFormTab from '$lib/components/Forms/AppFormTab.svelte';
  import TabButton from '$lib/components/Forms/TabButton.svelte';
  import FileSelector from '$lib/components/FileSelector.svelte';
  import Dropdown from '$lib/components/Dropdown.svelte';
  import Explorer from '$lib/components/Forms/Explorer.svelte';
  import { onMount } from 'svelte';
  import FormButton from '$lib/components/Forms/FormButton.svelte';
  import { SUPPORTED_MANIA_CHART_FORMATS, SUPPORTED_MANIA_MAPSET_FORMATS } from '$lib/stores';
  import { prefixList } from '$lib/helpers';

  let selectedTab = 'mania';
  let chartType = 'osu';
  let explorerRef: any;
  let convertButtonDisabled = true;
  let selectedFiles: File[] = [];
  let explorerFiles: any[] = [];

  const chartOptions = [
    { value: 'osu', label: '.osu (Osu)' },
    { value: 'qua', label: '.qua (Quaver)' },
    { value: 'fsc', label: '.fsc (fluXis)' },
    { value: 'sm', label: '.sm (Stepmania)' }
  ];

  function handleTabChange(tabId: string) {
    selectedTab = tabId;
  }

  function handleFilesSelected(event: CustomEvent) {
    selectedFiles = event.detail.files;
    convertButtonDisabled = selectedFiles.length === 0;
    console.log('Files selected:', selectedFiles);
  }

  function handleConvert() {
    if (selectedFiles.length === 0) return;
    
    console.log('Converting files:', selectedFiles);
    console.log('Target format:', chartType);
    
    document.dispatchEvent(new CustomEvent('convert:start', {
      detail: {
        files: selectedFiles,
        targetFormat: chartType
      }
    }));
    
    // Mock conversion
    setTimeout(() => {
      const mockFiles = [
        {
          name: 'Converted Maps',
          type: 'folder',
          path: 'converted',
          children: [
            { name: 'map1.osu', type: 'file', path: 'converted/map1.osu' },
            { name: 'map2.osu', type: 'file', path: 'converted/map2.osu' },
            { name: 'audio.mp3', type: 'file', path: 'converted/audio.mp3' }
          ]
        }
      ];
      
      explorerFiles = mockFiles;
      explorerRef?.setTimingInfo('150 milliseconds', '320 milliseconds', '1.2 seconds');
      document.dispatchEvent(new CustomEvent('convert:done'));
    }, 1000);
  }

  function handleSaveAs(event: CustomEvent) {
    console.log('Save as:', event.detail);
    // TODO: Implement save
  }

  function handleExport(event: CustomEvent) {
    console.log('Export:', event.detail);
    // TODO: Implement export
  }

  onMount(() => {
    const params = new URLSearchParams();
    params.append("mode", "mania");
    params.append("type", "osu");
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  });
</script>

<svelte:head>
  <style>
    :root {
      --navbar-color: #2d4b5e;
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
          <FormButton 
            icon="⚡"
            id="map-convert-btn" 
            disabled={convertButtonDisabled}
            on:click={handleConvert}
          >
            Convert
          </FormButton>
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