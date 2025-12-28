import { OsuParticles } from "../../OsuParticles";

let particleSystem: OsuParticles | null = null;

export function initNavbarBg() {
    const canvas = document.getElementById('navbar_bg') as HTMLCanvasElement;
    if (canvas) {
        particleSystem = new OsuParticles('navbar_bg', 255, 255, 255, 700, 20, 50, 0.4, 0.8);
        particleSystem.refreshColorFromCss();
        particleSystem.init(30);
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