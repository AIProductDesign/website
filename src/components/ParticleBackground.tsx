import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  phase: number;
  speed: number;
  hue: number;
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const count = Math.floor((canvas.width * canvas.height) / 6500);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.4 + 0.4,
        opacity: Math.random() * 0.45 + 0.08,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.35 + 0.08,
        hue: Math.random() < 0.25 ? 210 : 0, // 25% blauw, rest wit
      }));
    };

    let t = 0;
    const draw = () => {
      t += 0.0025;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx + Math.sin(t * p.speed + p.phase) * 0.25;
        p.y += p.vy + Math.cos(t * p.speed * 0.65 + p.phase + 1.2) * 0.25;

        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.y > canvas.height + 5) p.y = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === 210
          ? `rgba(75, 159, 255, ${p.opacity})`
          : `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
