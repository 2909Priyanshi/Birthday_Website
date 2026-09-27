import { useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';
import './CakeExperience.css';

const CANDLE_COUNT = 5;

function CakeExperience({ onClose }) {
  const reducedMotion = usePrefersReducedMotion();

  const [litCandles, setLitCandles] = useState(
    Array(CANDLE_COUNT).fill(true),
  );
  const [wishMade, setWishMade] = useState(false);

  const blowOutCandle = (index) => {
    if (wishMade) return;

    setLitCandles((current) =>
      current.map((lit, candleIndex) =>
        candleIndex === index ? false : lit,
      ),
    );
  };

  const allCandlesOut = litCandles.every((lit) => !lit);

  const makeWish = () => {
    if (!allCandlesOut) return;

    setWishMade(true);
  };

  const resetCake = () => {
    setLitCandles(Array(CANDLE_COUNT).fill(true));
    setWishMade(false);
  };

  return (
    <div className="cake-experience">
      <div
        className="cake-experience__ambient"
        aria-hidden="true"
      />

      <button
        type="button"
        className="cake-experience__close"
        onClick={onClose}
        aria-label="Close birthday cake experience"
      >
        ×
      </button>

      <div className="cake-experience__content">
        {!wishMade ? (
          <>
            <p className="cake-experience__eyebrow">
              Make tonight special
            </p>

            <h2 className="cake-experience__title">
              Make a Wish 🎂
            </h2>

            <p className="cake-experience__subtitle">
              Tap each candle to blow it out...
              <br />
              then make your birthday wish.
            </p>
          </>
        ) : (
          <>
            <div className="cake-experience__wish-icon">
              ✨
            </div>

            <h2 className="cake-experience__title">
              Wish Made! 💗
            </h2>

            <p className="cake-experience__subtitle">
              May your wish find its way to you.
              <br />
              Happy Birthday! 🎂
            </p>
          </>
        )}

        <div className="cake-scene">
          <div className="cake-candles">
            {litCandles.map((isLit, index) => (
              <button
                type="button"
                key={index}
                className={`cake-candle ${
                  isLit ? 'cake-candle--lit' : 'cake-candle--out'
                }`}
                onClick={() => blowOutCandle(index)}
                aria-label={
                  isLit
                    ? `Blow out candle ${index + 1}`
                    : `Candle ${index + 1} is out`
                }
              >
                {isLit && (
                  <span
                    className="cake-candle__flame"
                    aria-hidden="true"
                  />
                )}

                <span className="cake-candle__stick" />
              </button>
            ))}
          </div>

          <div className="cake">
            <div className="cake__top">
              <span />
              <span />
              <span />
            </div>

            <div className="cake__cream">
              <span />
              <span />
              <span />
            </div>

            <div className="cake__body">
              <div className="cake__shine" />
              <div className="cake__decoration">
                ✦　♥　✦　♥　✦
              </div>
            </div>

            <div className="cake__plate" />
          </div>
        </div>

        {!wishMade && (
          <div className="cake-actions">
            <p className="cake-actions__status">
              {allCandlesOut
                ? 'All the candles are out ✨'
                : `${litCandles.filter(Boolean).length} candle${
                    litCandles.filter(Boolean).length === 1 ? '' : 's'
                  } still glowing`}
            </p>

            <button
              type="button"
              className={`cake-actions__wish ${
                allCandlesOut
                  ? 'cake-actions__wish--active'
                  : ''
              }`}
              onClick={makeWish}
              disabled={!allCandlesOut}
            >
              ✨ Make My Wish
            </button>
          </div>
        )}

        {wishMade && (
          <button
            type="button"
            className="cake-actions__reset"
            onClick={resetCake}
          >
            🎂 Make Another Wish
          </button>
        )}
      </div>

      {!reducedMotion && wishMade && (
        <div
          className="cake-confetti"
          aria-hidden="true"
        >
          {Array.from({ length: 30 }, (_, index) => (
            <span
              key={index}
              style={{
                '--confetti-left': `${Math.random() * 100}%`,
                '--confetti-delay': `${Math.random() * 0.8}s`,
                '--confetti-rotation': `${
                  Math.random() * 360
                }deg`,
              }}
            >
              {index % 2 === 0 ? '✦' : '♥'}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default CakeExperience;