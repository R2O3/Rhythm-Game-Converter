import { OsuParticles } from "../../OsuParticles";

let particleSystem: OsuParticles | null = null;

export function initNavbarBg() {
    const canvas = document.getElementById('navbar_bg') as HTMLCanvasElement;
    if (canvas) {
        particleSystem = new OsuParticles('navbar_bg');
        particleSystem.refreshColorFromCss();
        particleSystem.init(70);
    }
}

export function refreshNavbarColors() {
    setTimeout(() => {
        if (particleSystem) {
            particleSystem.refreshColorFromCss();
        }
    }, 20);
}

export function destroyNavbarBg() {
    particleSystem?.destroy();
    particleSystem = null;
}