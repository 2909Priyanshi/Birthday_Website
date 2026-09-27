import { useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';
import './GiftExperience.css';

function GiftExperience({ onClose }) {
  const reducedMotion = usePrefersReducedMotion();
  const [opened, setOpened] = useState(false);

  const openGift = () => {
    if (opened) return;
    setOpened(true);
  };

  const resetGift = () => {
    setOpened(false);
  };

  return (
    <div className={`gift-experience ${opened ? 'is-open' : ''}`}>
      <div className="gift-experience__background" aria-hidden="true" />

      <button
        type="button"
        className="gift-experience__close"
        onClick={onClose}
        aria-label="Close gift"
      >
        ×
      </button>

      <div className="gift-experience__content">
        {!opened ? (
          <>
            <p className="gift-experience__eyebrow">
              Something special is waiting...
            </p>

            <h2 className="gift-experience__title">
              Open Your Gift 🎁
            </h2>

            <p className="gift-experience__subtitle">
              Go on... click the gift.
            </p>
          </>
        ) : (
          <>
            <div className="gift-experience__surprise">
              ✨
            </div>

            <p className="gift-experience__eyebrow">
              A little surprise for you
            </p>

            <h2 className="gift-experience__title">
              You Are the Gift 💗
            </h2>

            <p className="gift-experience__subtitle">
              The best part of every beautiful memory
              <br />
              is the person who makes it special.
            </p>

            <button
              type="button"
              className="gift-experience__again"
              onClick={resetGift}
            >
              🎁 Open It Again
            </button>
          </>
        )}

        <div
          className={`gift-box ${
            opened ? 'gift-box--opened' : ''
          } ${reducedMotion ? 'gift-box--still' : ''}`}
        >
          {opened && (
            <div
              className="gift-box__burst"
              aria-hidden="true"
            >
              {Array.from({ length: 24 }, (_, index) => (
                <span key={index}>
                  {index % 3 === 0 ? '♥' : '✦'}
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            className="gift-box__click-area"
            onClick={openGift}
            disabled={opened}
            aria-label="Open birthday gift"
          >
            <span className="gift-box__glow" />

            <span className="gift-box__lid">
              <span className="gift-box__ribbon-horizontal" />
            </span>

            <span className="gift-box__body">
              <span className="gift-box__ribbon-vertical" />
              <span className="gift-box__ribbon-horizontal" />
            </span>

            <span className="gift-box__shadow" />
          </button>
        </div>
      </div>

      {!opened && (
        <p className="gift-experience__hint">
          Tap the gift 🎁
        </p>
      )}
    </div>
  );
}

export default GiftExperience;