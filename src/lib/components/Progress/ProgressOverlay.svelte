<script lang="ts">
  import { progressStore } from '$lib/components/Progress/ProgressOverlay';
  export let onCancel: (() => void) | null = null;

  $: ({ visible, status, progress } = $progressStore);
  $: progressWidth = Math.min(100, Math.max(0, progress));

  function handleCancel() {
    if (onCancel) {
      onCancel();
    }
  }
</script>

<style>
  .progress-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(27, 0, 21, 0.651);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .progress-overlay.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .progress-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    width: 100%;
    padding: 0 20px;
  }

  .progress-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(36, 0, 37, 0.3);
    border-radius: 50%;
    border-top-color: #8d3196;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  .progress-status {
    color: white;
    font-size: 1.1rem;
    margin-bottom: 20px;
    text-align: center;
  }

  .progress-bar-container {
    width: 100%;
    max-width: 250px;
    margin-bottom: 20px;
  }

  .progress-bar {
    width: 100%;
    height: 6px;
    background-color: rgb(30, 0, 31);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background-color: #a01ea5;
    transition: width 0.3s ease;
  }

  .cancel-button {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 8px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
  }

  .cancel-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }

  .cancel-button:active {
    transform: scale(0.98);
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>

<div class="progress-overlay" class:visible>
  <div class="progress-content">
    <div class="progress-spinner"></div>
    <div class="progress-status">{status}</div>
    <div class="progress-bar-container">
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: {progressWidth}%"></div>
      </div>
    </div>
    {#if onCancel}
      <button class="cancel-button" on:click={handleCancel}>
        Cancel
      </button>
    {/if}
  </div>
</div>