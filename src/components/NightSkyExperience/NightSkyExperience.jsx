import { useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';
import './NightSkyExperience.css';

const stars = [
  { id: 1, left: 8, top: 18, size: 5, delay: 0 },
  { id: 2, left: 18, top: 32, size: 4, delay: 0.8 },
  { id: 3, left: 29, top: 14, size: 6, delay: 1.4 },
  { id: 4, left: 40, top: 27, size: 4, delay: 0.3 },
  { id: 5, left: 52, top: 12, size: 5, delay: 1.8 },
  { id: 6, left: 64, top: 30, size: 4, delay: 0.6 },
  { id: 7, left: 76, top: 16, size: 6, delay: 1.1 },
  { id: 8, left: 89, top: 28, size: 4, delay: 0.4 },
  { id: 9, left: 12, top: 52, size: 4, delay: 1.6 },
  { id: 10, left: 25, top: 67, size: 5, delay: 0.5 },
  { id: 11, left: 38, top: 48, size: 4, delay: 1.2 },
  { id: 12, left: 50, top: 62, size: 6, delay: 0.2 },
  { id: 13, left: 63, top: 50, size: 4, delay: 1.7 },
  { id: 14, left: 75, top: 68, size: 5, delay: 0.9 },
  { id: 15, left: 88, top: 54, size: 4, delay: 1.3 },
  { id: 16, left: 20, top: 84, size: 4, delay: 0.7 },
  { id: 17, left: 44, top: 82, size: 5, delay: 1.5 },
  { id: 18, left: 68, top: 86, size: 4, delay: 0.1 },
  { id: 19, left: 82, top: 78, size: 5, delay: 1.9 },
];

function NightSkyExperience({ onClose }) {
  const reducedMotion = usePrefersReducedMotion();
  const [selectedStar, setSelectedStar] = useState(null);

  const handleStarClick = (star) => {
    setSelectedStar(star.id);
  };

  const reset = () => {
    setSelectedStar(null);
  };

  return (
    <div className="night-sky">
      <div className="night-sky__glow" aria-hidden="true" />

      <button
        type="button"
        className="night-sky__close"
        onClick={onClose}
        aria-label="Close starry night"
      >
        ×
      </button>

      <div className="night-sky__content">
        {!selectedStar ? (
          <>
            <p className="night-sky__eyebrow">
              One last little surprise
            </p>

            <h2 className="night-sky__title">
              Make a Wish 🌌
            </h2>

            <p className="night-sky__subtitle">
              Find a star and make your wish...
            </p>
          </>
        ) : (
          <>
            <div className="night-sky__wish-icon">
              ✨
            </div>

            <h2 className="night-sky__title">
              Wish Made 💗
            </h2>

            <p className="night-sky__subtitle">
              Your wish is somewhere among the stars.
              <br />
              May it find its way to you.
            </p>

            <button
              type="button"
              className="night-sky__again"
              onClick={reset}
            >
              ✨ Make Another Wish
            </button>
          </>
        )}
      </div>

      <div className="night-sky__stars">
        {stars.map((star) => (
          <button
            key={star.id}
            type="button"
            className={`night-star ${
              selectedStar === star.id ? 'night-star--selected' : ''
            } ${reducedMotion ? 'night-star--still' : ''}`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              '--star-size': `${star.size}px`,
              '--star-delay': `${star.delay}s`,
            }}
            onClick={() => handleStarClick(star)}
            aria-label="Make a wish on this star"
          >
            <span />
          </button>
        ))}
      </div>

      {!selectedStar && (
        <p className="night-sky__hint">
          Tap any star ✨
        </p>
      )}
    </div>
  );
}

export default NightSkyExperience;