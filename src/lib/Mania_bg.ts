let posX = 0;
let posY = 0;
const speedX = 0.5;
const speedY = -0.5;
let animationFrame: number;

export function startBackgroundAnimation() {
    function animate() {
        posX += speedX;
        posY += speedY;
        
        document.body.style.setProperty('--bg-pos-x', `${posX}px`);
        document.body.style.setProperty('--bg-pos-y', `${posY}px`);
        
        animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => cancelAnimationFrame(animationFrame);
}