import { useEffect, useState } from 'react';
import birthdayConfig from '../../config/birthdayConfig.js';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';
import ParticleField from './ParticleField.jsx';
import './OpeningScreen.css';

function OpeningScreen({ onOpen }) {
  const reducedMotion = usePrefersReducedMotion();

  const [visible, setVisible] = useState(reducedMotion);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  const handleOpen = () => {
    if (exiting) {
      return;
    }

    if (reducedMotion) {
      onOpen();
      return;
    }

    setExiting(true);

    window.setTimeout(() => {
      onOpen();
    }, 720);
  };

  return (
    <section
      className={`opening-screen${visible ? ' is-visible' : ''}${
        exiting ? ' is-exiting' : ''
      }`}
      aria-label="Birthday opening"
    >
      <div className="opening-screen__veil" aria-hidden="true" />

      <ParticleField reducedMotion={reducedMotion} />

      <div className="opening-screen__content">

        <p className="opening-screen__eyebrow">
          A little surprise for you
        </p>

        <h1 className="opening-screen__title">
          {birthdayConfig.openingMessage}
        </h1>

        <p className="opening-screen__message">
          {birthdayConfig.subtitle}
        </p>

        <button
          type="button"
          className="opening-screen__cta"
          onClick={handleOpen}
        >
          <span
            className="opening-screen__cta-glow"
            aria-hidden="true"
          />

          <span className="opening-screen__cta-label">
            {birthdayConfig.openingCta}
          </span>
        </button>

      </div>
    </section>
  );
}

export default OpeningScreen;