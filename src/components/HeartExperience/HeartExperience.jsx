import { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';
import './HeartExperience.css';

function HeartExperience({ onClose }) {
  const reducedMotion = usePrefersReducedMotion();
  const [loveCount, setLoveCount] = useState(0);
  const [hearts, setHearts] = useState([]);
  const heartId = useRef(0);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const interval = window.setInterval(() => {
      createFloatingHeart();
    }, 700);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const createFloatingHeart = () => {
    const id = heartId.current++;

    const heart = {
      id,
      left: `${10 + Math.random() * 80}%`,
      size: `${18 + Math.random() * 25}px`,
      duration: `${4 + Math.random() * 4}s`,
      delay: `${Math.random() * 0.5}s`,
      rotation: `${-25 + Math.random() * 50}deg`,
    };

    setHearts((current) => [...current.slice(-25), heart]);

    window.setTimeout(() => {
      setHearts((current) => current.filter((item) => item.id !== id));
    }, 8500);
  };

  const sendLove = () => {
    setLoveCount((count) => count + 1);

    // Create several hearts when the main heart is clicked.
    for (let i = 0; i < 6; i += 1) {
      window.setTimeout(() => {
        createFloatingHeart();
      }, i * 70);
    }
  };

  return (
    <div className="heart-experience">
      <div className="heart-experience__background" aria-hidden="true" />

      <button
        type="button"
        className="heart-experience__close"
        onClick={onClose}
        aria-label="Close love experience"
      >
        ×
      </button>

      <div className="heart-experience__content">
        <p className="heart-experience__eyebrow">
          A little love for you
        </p>

        <h2 className="heart-experience__title">
          Send Some Love
        </h2>

        <p className="heart-experience__subtitle">
          Tap the heart and watch the love fill the night.
        </p>

        <div className="heart-experience__scene">
          <div className="heart-experience__halo" aria-hidden="true" />

          <button
            type="button"
            className="heart-experience__main-heart"
            onClick={sendLove}
            aria-label="Send love"
          >
            <span aria-hidden="true">♥</span>
          </button>
        </div>

        <p className="heart-experience__count">
          Love sent: <strong>{loveCount}</strong>
        </p>

        <button
          type="button"
          className="heart-experience__love-button"
          onClick={sendLove}
        >
          <span>💗</span>
          Send Love
        </button>

        <p className="heart-experience__hint">
          Every tap sends a little more love ✦
        </p>
      </div>

      <div className="heart-experience__floating-hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="floating-heart"
            style={{
              left: heart.left,
              fontSize: heart.size,
              animationDuration: heart.duration,
              animationDelay: heart.delay,
              transform: `rotate(${heart.rotation})`,
            }}
          >
            ♥
          </span>
        ))}
      </div>
    </div>
  );
}

export default HeartExperience;