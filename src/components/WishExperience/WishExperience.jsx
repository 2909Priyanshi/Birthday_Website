import { useState } from 'react';
import './WishExperience.css';

function WishExperience({ onClose }) {
  const [wish, setWish] = useState('');
  const [sent, setSent] = useState(false);

  const maxLength = 300;

  const handleSend = () => {
    if (!wish.trim()) return;
    setSent(true);
  };

  return (
    <div className="wish-experience">
      <div className="wish-experience__glow" aria-hidden="true" />

      <div className="wish-experience__hearts" aria-hidden="true">
        <span>♡</span>
        <span>♥</span>
        <span>♡</span>
        <span>♥</span>
        <span>♡</span>
      </div>

      <button
        type="button"
        className="wish-experience__close"
        onClick={onClose}
        aria-label="Close wish experience"
      >
        ×
      </button>

      {!sent ? (
        <div className="wish-card">
          <div className="wish-card__icon">💌</div>

          <p className="wish-card__eyebrow">
            A little message
          </p>

          <h2>Write a Wish</h2>

          <p className="wish-card__intro">
            Write something you'd like to say on this special day.
          </p>

          <div className="wish-input-wrapper">
            <textarea
              value={wish}
              onChange={(event) => setWish(event.target.value)}
              maxLength={maxLength}
              placeholder="Write your birthday wish here... ✨"
              aria-label="Birthday wish"
            />

            <span className="wish-counter">
              {wish.length}/{maxLength}
            </span>
          </div>

          <button
            type="button"
            className="wish-send-button"
            onClick={handleSend}
            disabled={!wish.trim()}
          >
            <span>Send My Wish</span>
            <span aria-hidden="true">♡</span>
          </button>
        </div>
      ) : (
        <div className="wish-card wish-card--sent">
          <div className="wish-card__sent-icon">💗</div>

          <p className="wish-card__eyebrow">
            Your wish has been sent
          </p>

          <h2>Beautifully said.</h2>

          <div className="wish-message">
            <span className="wish-message__quote">“</span>
            <p>{wish}</p>
            <span className="wish-message__quote">”</span>
          </div>

          <p className="wish-card__thanks">
            May this wish find its way to the stars. ✨
          </p>

          <button
            type="button"
            className="wish-send-button wish-send-button--back"
            onClick={onClose}
          >
            Back to the birthday
          </button>
        </div>
      )}
    </div>
  );
}

export default WishExperience;