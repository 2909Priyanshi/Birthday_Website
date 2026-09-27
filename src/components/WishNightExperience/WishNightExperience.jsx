import { useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';
import birthdayConfig from '../../config/birthdayConfig.js';
import './WishNightExperience.css';

const stars = [
  { id: 1, left: 12, top: 18, delay: 0 },
  { id: 2, left: 27, top: 30, delay: 0.8 },
  { id: 3, left: 43, top: 14, delay: 1.4 },
  { id: 4, left: 61, top: 25, delay: 0.3 },
  { id: 5, left: 78, top: 15, delay: 1.1 },
  { id: 6, left: 89, top: 34, delay: 1.8 },
  { id: 7, left: 18, top: 52, delay: 1.5 },
  { id: 8, left: 35, top: 67, delay: 0.5 },
  { id: 9, left: 55, top: 55, delay: 2 },
  { id: 10, left: 73, top: 67, delay: 0.9 },
  { id: 11, left: 91, top: 58, delay: 1.7 },
  { id: 12, left: 48, top: 82, delay: 0.2 },
];

function WishNightExperience({ onClose }) {
  const reducedMotion = usePrefersReducedMotion();

  const [selectedStar, setSelectedStar] = useState(null);
  const [wish, setWish] = useState('');
  const [madeWish, setMadeWish] = useState(false);

  const chooseStar = (star) => {
    if (madeWish) return;

    setSelectedStar(star.id);
  };

  const makeWish = () => {
    if (!wish.trim() || selectedStar === null) return;

    setMadeWish(true);
  };

  const reset = () => {
    setSelectedStar(null);
    setWish('');
    setMadeWish(false);
  };

  return (
    <div className="wish-night">
      <div className="wish-night__moon" aria-hidden="true">
        <div className="wish-night__moon-shadow" />
      </div>

      <div className="wish-night__stars" aria-hidden="true">
        {stars.map((star) => (
          <span
            key={star.id}
            className={`wish-night__star ${
              selectedStar === star.id
                ? 'wish-night__star--selected'
                : ''
            }`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      <button
        type="button"
        className="wish-night__close"
        onClick={onClose}
        aria-label="Close night sky"
      >
        ×
      </button>

      <div className="wish-night__content">
        {!madeWish ? (
          <>
            <p className="wish-night__eyebrow">
              One last little moment
            </p>

            <h2 className="wish-night__title">
              Make a Wish 🌌
            </h2>

            <p className="wish-night__subtitle">
              Choose a star, close your eyes,
              <br />
              and make your birthday wish. ✨
            </p>

            <div className="wish-night__wish-area">
              <label htmlFor="birthday-wish">
                Your wish
              </label>

              <textarea
                id="birthday-wish"
                value={wish}
                onChange={(event) =>
                  setWish(event.target.value)
                }
                placeholder="Write your wish here..."
                maxLength={150}
              />

              <span className="wish-night__counter">
                {wish.length}/150
              </span>
            </div>

            <button
              type="button"
              className={`wish-night__button ${
                selectedStar !== null && wish.trim()
                  ? 'wish-night__button--active'
                  : ''
              }`}
              disabled={
                selectedStar === null || !wish.trim()
              }
              onClick={makeWish}
            >
              ✨ Send My Wish
            </button>
          </>
        ) : (
          <>
            <div className="wish-night__success-icon">
              🌠
            </div>

            <p className="wish-night__eyebrow">
              Your wish is on its way
            </p>

            <h2 className="wish-night__title">
              Wish Upon a Star ✨
            </h2>

            <p className="wish-night__message">
              May this year bring you closer to
              everything your heart wishes for.
            </p>

            <p className="wish-night__final-message">
              {birthdayConfig.finalMessage}
            </p>

            <button
              type="button"
              className="wish-night__button wish-night__button--active"
              onClick={reset}
            >
              🌌 Make Another Wish
            </button>
          </>
        )}
      </div>

      {!reducedMotion && (
        <div
          className="wish-night__shooting-star"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default WishNightExperience;