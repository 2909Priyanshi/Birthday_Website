import { useEffect, useRef, useState } from 'react';
import './SparkleExperience.css';

function SparkleExperience({ onClose }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const [sparkleCount, setSparkleCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticle = (
      x = Math.random() * width,
      y = Math.random() * height,
      burst = false
    ) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = burst
        ? Math.random() * 4 + 1
        : Math.random() * 0.35 + 0.05;

      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2.2 + 0.5,
        life: burst ? 1 : Math.random(),
        decay: burst
          ? Math.random() * 0.025 + 0.015
          : Math.random() * 0.003 + 0.001,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.08 + 0.02,
        hue: Math.random() > 0.5 ? 'pink' : 'purple',
        burst,
      };
    };

    const createInitialParticles = () => {
      particlesRef.current = [];

      const amount = Math.min(
        180,
        Math.max(90, Math.floor((width * height) / 9000))
      );

      for (let i = 0; i < amount; i += 1) {
        particlesRef.current.push(createParticle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current = particlesRef.current.filter(
        (particle) => particle.life > 0
      );

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (!particle.burst) {
          particle.twinkle += particle.twinkleSpeed;
        } else {
          particle.vy += 0.025;
        }

        particle.life -= particle.decay;

        if (!particle.burst) {
          if (particle.x < -10) particle.x = width + 10;
          if (particle.x > width + 10) particle.x = -10;

          if (particle.y < -10) particle.y = height + 10;
          if (particle.y > height + 10) particle.y = -10;
        }

        const alpha = particle.burst
          ? Math.max(particle.life, 0)
          : 0.25 + Math.sin(particle.twinkle) * 0.35;

        const color =
          particle.hue === 'pink'
            ? `rgba(255, 45, 149, ${alpha})`
            : `rgba(180, 74, 255, ${alpha})`;

        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = color;
        ctx.shadowBlur = particle.burst ? 15 : 10;
        ctx.shadowColor = color;
        ctx.fill();
      });

      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createInitialParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const createBurst = (x, y) => {
    const burstParticles = [];

    for (let i = 0; i < 28; i += 1) {
      burstParticles.push(createBurstParticle(x, y));
    }

    particlesRef.current.push(...burstParticles);
    setSparkleCount((count) => count + 1);
  };

  const createBurstParticle = (x, y) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 5 + 1.5;

    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 2.5 + 0.8,
      life: 1,
      decay: Math.random() * 0.025 + 0.018,
      twinkle: 0,
      twinkleSpeed: 0,
      hue: Math.random() > 0.5 ? 'pink' : 'purple',
      burst: true,
    };
  };

  const handleSparkle = (event) => {
    createBurst(event.clientX, event.clientY);
  };

  return (
    <div
      className="sparkle-experience"
      onClick={handleSparkle}
      role="presentation"
    >
      <canvas
        ref={canvasRef}
        className="sparkle-experience__canvas"
        aria-hidden="true"
      />

      <div className="sparkle-experience__nebula" aria-hidden="true" />

      <button
        type="button"
        className="sparkle-experience__close"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="Close sparkle experience"
      >
        ×
      </button>

      <div className="sparkle-experience__content">
        <span className="sparkle-experience__icon" aria-hidden="true">
          ✨
        </span>

        <p className="sparkle-experience__eyebrow">
          Touch the night
        </p>

        <h2>Make It Sparkle</h2>

        <p className="sparkle-experience__message">
          Tap anywhere and leave a little magic behind.
        </p>

        <div className="sparkle-experience__instruction">
          <span>✦</span>
          <span>
            {sparkleCount === 0
              ? 'Create your first sparkle'
              : `${sparkleCount} sparkle${sparkleCount === 1 ? '' : 's'} created`}
          </span>
          <span>✦</span>
        </div>
      </div>
    </div>
  );
}

export default SparkleExperience;