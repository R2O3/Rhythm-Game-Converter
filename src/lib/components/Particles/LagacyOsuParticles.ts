import { parseColor } from "../../helpers";

interface Particle {
    x: number;
    y: number;
    size: number;
    speed: number;
    currentR: number;
    currentG: number;
    currentB: number;
    targetR: number;
    targetG: number;
    targetB: number;
    lightness: number;
    colorTransitionSpeed: number;
    age: number;
    reset: () => void;
    update: () => void;
    draw: (ctx: CanvasRenderingContext2D) => void;
    updateTargetColor: (r: number, g: number, b: number) => void;
}

export class OsuParticles {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: Particle[];
    private animationId: number | null = null;
    private baseR: number = 255;
    private baseG: number = 255;
    private baseB: number = 255;
    private spawnInterval: number;
    private maxParticles: number;
    private spawnIntervalId: number | null = null;
    private sizeOffset: number;
    private sizeMultiplier: number;
    private speedOffset: number;
    private speedMultiplier: number;
    private maxLifetime: number;

    constructor(
        canvasId: string,
        baseR: number = 255,
        baseG: number = 255,
        baseB: number = 255,
        spawnInterval: number = 400,
        sizeOffset: number = 25,
        sizeMultipler: number = 40,
        speedOffset: number = 0.4,
        speedMultiplier: number = 0.8,
        maxParticles: number = -1
    ) {
        const canvasElement = document.getElementById(canvasId);
        if (!canvasElement) throw new Error(`Canvas element with id ${canvasId} not found`);

        this.canvas = canvasElement as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.baseR = baseR;
        this.baseG = baseG;
        this.baseB = baseB;
        this.spawnInterval = spawnInterval;
        this.sizeOffset = sizeOffset;
        this.sizeMultiplier = sizeMultipler;
        this.speedOffset = speedOffset;
        this.speedMultiplier = speedMultiplier;
        this.maxParticles = maxParticles;
        this.particles = [];
        this.maxLifetime = 0;
    }

    public refreshColorFromCss(): void {
        const style = getComputedStyle(document.documentElement);
        const colorString = style.getPropertyValue('--navbar-color').trim();
        
        if (colorString) {
            const { r, g, b } = parseColor(colorString);
            this.triggerColorFlash(r, g, b);
        }
    }

    private triggerColorFlash(r: number, g: number, b: number): void {
        this.baseR = r;
        this.baseG = g;
        this.baseB = b;
        
        this.particles.forEach(p => {
            p.colorTransitionSpeed = 0.4;
            p.updateTargetColor(r, g, b);
            
            setTimeout(() => {
                p.colorTransitionSpeed = 0.1;
            }, 500);
        });
    }

    public updateBaseColor(r: number, g: number, b: number): void {
        this.baseR = r;
        this.baseG = g;
        this.baseB = b;
        this.particles.forEach(p => p.updateTargetColor(r, g, b));
    }

    public init(starterparticles: number): void {
        this.resizeCanvas();
        this.maxLifetime = (this.canvas.height + 600) / this.speedOffset;
        window.addEventListener('resize', () => this.resizeCanvas());
        this.createInitialParticles(starterparticles);
        this.animate();
        this.spawnIntervalId = window.setInterval(() => this.spawnParticle(), this.spawnInterval);
    }

    private spawnParticle(): void {
        if (this.maxParticles >= 0 && this.particles.length >= this.maxParticles) {
            return;
        }
        this.particles.push(this.createParticle());
    }

    private createParticle(x?: number, y?: number): Particle {
        const size = Math.random() * this.sizeMultiplier + this.sizeOffset;
        const lightness = [0, 30, 70, 120][Math.floor(Math.random() * 4)];
        
        const self = this;
        return {
            x: x ?? Math.random() * this.canvas.width,
            y: y ?? this.canvas.height + size,
            size,
            speed: Math.random() * this.speedMultiplier + this.speedOffset,
            currentR: this.baseR, currentG: this.baseG, currentB: this.baseB,
            targetR: this.baseR, targetG: this.baseG, targetB: this.baseB,
            lightness, colorTransitionSpeed: 0.1, age: 0,
            reset: function() {
                this.x = Math.random() * self.canvas.width;
                this.y = self.canvas.height + 100;
                this.age = 0;
            },
            update: function() {
                this.y -= this.speed;
                this.age++;
                if (this.y < -300) this.reset();
                this.currentR += (this.targetR - this.currentR) * this.colorTransitionSpeed;
                this.currentG += (this.targetG - this.currentG) * this.colorTransitionSpeed;
                this.currentB += (this.targetB - this.currentB) * this.colorTransitionSpeed;
            },
            draw: function(ctx) {
                ctx.save();
                ctx.translate(this.x, this.y);
                const r = Math.max(0, Math.min(255, this.currentR + (this.lightness - 50)));
                const g = Math.max(0, Math.min(255, this.currentG + (this.lightness - 50)));
                const b = Math.max(0, Math.min(255, this.currentB + (this.lightness - 50)));
                ctx.fillStyle = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.lineTo(-this.size, this.size);
                ctx.lineTo(this.size, this.size);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            },
            updateTargetColor: function(r, g, b) {
                this.targetR = r; this.targetG = g; this.targetB = b;
            }
        };
    }

    private createInitialParticles(num: number): void {
        for (let i = 0; i < num; i++) {
            this.particles.push(this.createParticle(Math.random() * this.canvas.width, Math.random() * (this.canvas.height * 2)));
        }
    }

    private resizeCanvas(): void {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    private animate(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles = this.particles.filter(p => {
            p.update();
            if (p.age < this.maxLifetime) {
                p.draw(this.ctx);
                return true;
            }
            return false;
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    public destroy(): void {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.spawnIntervalId) clearInterval(this.spawnIntervalId);
    }
}