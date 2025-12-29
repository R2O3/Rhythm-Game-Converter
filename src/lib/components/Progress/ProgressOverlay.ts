import { writable } from 'svelte/store';

export const progressStore = writable({
  visible: false,
  status: '',
  progress: 0
});

export const Progress = {
  show(status = '', progress = 0) {
    progressStore.set({ visible: true, status, progress });
  },
  hide() {
    progressStore.update(state => ({ ...state, visible: false }));
  },
  update(status: string | undefined, progress: number | undefined) {
    progressStore.update(state => ({
      ...state,
      ...(status !== undefined && { status }),
      ...(progress !== undefined && { progress })
    }));
  }
};