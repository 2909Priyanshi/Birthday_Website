import { useState } from 'react';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';
import './BalloonExperience.css';

const initialBalloons = [
  { id: 1, left: 8, delay: 0 },
  { id: 2, left: 20, delay: 1.2 },
  { id: 3, left: 34, delay: 0.4 },
  { id: 4, left: 48, delay: 1.8 },
  { id: 5, left: 62, delay: 0.8 },
  { id: 6, left: 76, delay: 2.2 },
  { id: 7, left: 90, delay: 1.4 },
  { id: 8, left: 14, delay: 2.8 },
  { id: 9, left: 40, delay: 3.2 },
  { id: 10, left: 70, delay: 3.6 },
];

function BalloonExperience({ onClose }) {
  const reducedMotion = usePrefersReducedMotion();

  const [balloons, setBalloons] = useState(initialBalloons);
  const [popped, setPopped] = useState(0);
  const [celebration, setCelebration] = useState(false);

  const popBalloon = (id) => {
    setBalloons((current) =>
      current.filter((balloon) => balloon.id !== id),
    );

    setPopped((current) => {
      const next = current + 1;

      if (next === initialBalloons.length) {
        setTimeout(() => setCelebration(true), 400);
      }

      return next;
    });
  };

  const reset = () => {
    setBalloons(initialBalloons);
    setPopped(0);
    setCelebration(false);
  };

  return (
    <div className="balloon-experience">
      <button
        type="button"
        className="balloon-experience__close"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>

      <div className="balloon-experience__content">
        {!celebration ? (
          <>
            <p className="balloon-experience__eyebrow">
              A little birthday game
            </p>

            <h2 className="balloon-experience__title">
              Pop the Balloons 🎈
            </h2>

            <p className="balloon-experience__subtitle">
              Tap every balloon before they disappear!
            </p>

            <div className="balloon-experience__counter">
              {popped} / {initialBalloons.length}
            </div>
          </>
        ) : (
          <>
            <div className="balloon-experience__celebration">
              🎉
            </div>

            <h2 className="balloon-experience__title">
              You Did It!
            </h2>

            <p className="balloon-experience__subtitle">
              All the balloons are popped. 💗
            </p>

            <button
              type="button"
              className="balloon-experience__reset"
              onClick={reset}
            >
              🎈 Play Again
            </button>
          </>
        )}
      </div>

      <div className="balloon-experience__balloons">
        {balloons.map((balloon) => (
          <button
            type="button"
            key={balloon.id}
            className={`birthday-balloon ${
              reducedMotion ? 'birthday-balloon--still' : ''
            }`}
            style={{
              left: `${balloon.left}%`,
              animationDelay: `${balloon.delay}s`,
            }}
            onClick={() => popBalloon(balloon.id)}
            aria-label="Pop balloon"
          >
            <span className="birthday-balloon__shape">
              <span className="birthday-balloon__shine" />
            </span>

            <span className="birthday-balloon__knot" />

            <span className="birthday-balloon__string" />
          </button>
        ))}
      </div>

      {!celebration && (
        <p className="balloon-experience__hint">
          Tap a balloon 🎈
        </p>
      )}
    </div>
  );
}

export default BalloonExperience;