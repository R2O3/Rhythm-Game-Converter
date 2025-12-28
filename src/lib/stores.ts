import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const APP_VERSION = __APP_VERSION__;

export interface UserConfig {
    lightTheme: boolean;
}

let hasNewVersion = false;
if (browser) {
    const storedVersion = localStorage.getItem('app-version');
    if (storedVersion && storedVersion !== APP_VERSION) {
        hasNewVersion = true;
        console.log(`New version available: ${APP_VERSION} (current: ${storedVersion})`);
    }
    // localStorage.setItem('app-version', APP_VERSION);
}

export const newVersionAvailable = writable<boolean>(hasNewVersion);

const storedConfig = browser ? localStorage.getItem('user-config') : null;
const initialConfig: UserConfig = storedConfig 
    ? JSON.parse(storedConfig) 
    : { lightTheme: false };

export const userConfig = writable<UserConfig>(initialConfig);

if (browser) {
    userConfig.subscribe(value => {
        localStorage.setItem('user-config', JSON.stringify(value));
    });
}

export const Debug = writable<boolean>(false);