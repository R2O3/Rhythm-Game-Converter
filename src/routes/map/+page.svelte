<script lang="ts">
  import AppForm from '$lib/components/Forms/AppForm.svelte';
  import AppFormTab from '$lib/components/Forms/AppFormTab.svelte';
  import TabButton from '$lib/components/Forms/TabButton.svelte';
  import FileSelector from '$lib/components/FileSelector.svelte';
  import Dropdown from '$lib/components/Dropdown.svelte';
  import Explorer from '$lib/components/Forms/Explorer.svelte';
  import { onMount } from 'svelte';

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
      --navbar-color: #1a7a8c;
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
            accept=".osu, .sm, qua, fsc, .zip, .rar, .tar, .7z, .osz, .qp, .fms"
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
          <button 
            type="button" 
            id="map-convert-btn" 
            class="convert-button"
            disabled={convertButtonDisabled}
            on:click={handleConvert}
          >
            ⚡ Convert
          </button>
        </svelte:fragment>
      </Explorer>
    </AppFormTab>
  </AppForm>
</div>

<hr />

<section>
  <h2>Supported Formats</h2>
  <ul>
    <li>.osu</li>
    <li>.qua</li>
    <li>.sm</li>
    <li>.fsc</li>
    <li>.osz</li>
    <li>.qp</li>
    <li>.fms</li>
    <li>Most archives also work.</li>
  </ul>
</section>

<style>
  .conversion-wrapper {
    max-width: 65rem;
    margin: 0 auto;
  }

  .convert-button {
    color: white;
    width: 8.5rem;
    height: 3.2rem;
    border: 3px solid rgba(255, 255, 255, 0.651);
    border-radius: 15px;
    transition: all 0.1s ease-out;
    cursor: pointer;
    background: var(--accent-color);
    font-size: 1.4em;
    font-weight: 550;
  }

  .convert-button:not([disabled]):hover {
    background: rgba(255, 255, 255, 0.116);
    color: white;
    font-size: 1.5em;
  }

  .convert-button:not([disabled]):active {
    background: white;
    border-color: var(--background-color);
    border-width: 4px;
    color: var(--accent-color);
    font-size: 1.3em;
  }

  .convert-button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
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