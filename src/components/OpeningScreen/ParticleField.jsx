import { useEffect, useRef } from 'react';
import birthdayConfig from '../../config/birthdayConfig.js';

const PARTICLE_COUNT = 48;

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? value.split('').map((c) => c + c).join('') : value;
  const num = Number.parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function ParticleField({ reducedMotion = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) {
      return undefined;
    }

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) {
      return undefined;
    }

    const pink = hexToRgb(birthdayConfig.theme.neonPink);
    const purple = hexToRgb(birthdayConfig.theme.neonPurple);
    let animationId = 0;
    let particles = [];

    const createParticles = (width, height) => {
      particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
        const tone = index % 3 === 0 ? pink : purple;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.4 + 0.4,
          speed: Math.random() * 0.18 + 0.04,
          drift: (Math.random() - 0.5) * 0.12,
          alpha: Math.random() * 0.35 + 0.12,
          tone,
        };
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      createParticles(width, height);
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.y -= particle.speed;
        particle.x += particle.drift;

        if (particle.y < -8) {
          particle.y = height + 8;
          particle.x = Math.random() * width;
        }

        if (particle.x < -8) {
          particle.x = width + 8;
        } else if (particle.x > width + 8) {
          particle.x = -8;
        }

        context.beginPath();
        context.fillStyle = `rgba(${particle.tone.r}, ${particle.tone.g}, ${particle.tone.b}, ${particle.alpha})`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });

      animationId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="particle-field"
      aria-hidden="true"
    />
  );
}

export default ParticleField;
