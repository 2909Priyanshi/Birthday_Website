import { useState } from 'react';
import birthdayConfig from '../../config/birthdayConfig.js';
import './MemoriesExperience.css';

function MemoriesExperience({ onClose }) {
  const memories = birthdayConfig.memories || [];

  const [selectedIndex, setSelectedIndex] = useState(null);

  const closeViewer = () => {
    setSelectedIndex(null);
  };

  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === 0 ? memories.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setSelectedIndex((current) =>
      current === memories.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div className="memories-experience">
      <button
        type="button"
        className="memories-experience__close"
        onClick={onClose}
        aria-label="Close memories"
      >
        ×
      </button>

      <div className="memories-experience__content">
        <p className="memories-experience__eyebrow">
          Little moments, big memories
        </p>

        <h2 className="memories-experience__title">
          Our Memories 📸
        </h2>

        <p className="memories-experience__subtitle">
          Every picture holds a little piece of a beautiful
          moment. 💗
        </p>

        {memories.length === 0 ? (
          <div className="memories-empty">
            <div className="memories-empty__icon">📷</div>

            <h3>Add your memories</h3>

            <p>
              Add photos to <code>birthdayConfig.js</code> and
              they will appear here.
            </p>
          </div>
        ) : (
          <div className="memories-grid">
            {memories.map((memory, index) => (
              <button
                type="button"
                className="memory-card"
                key={`${memory.image}-${index}`}
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  src={memory.image}
                  alt={memory.caption || `Memory ${index + 1}`}
                />

                <span className="memory-card__overlay">
                  <span>
                    {memory.caption || 'A beautiful memory'}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedIndex !== null && memories[selectedIndex] && (
        <div className="memory-viewer">
          <button
            type="button"
            className="memory-viewer__backdrop"
            onClick={closeViewer}
            aria-label="Close photo"
          />

          <button
            type="button"
            className="memory-viewer__close"
            onClick={closeViewer}
            aria-label="Close photo"
          >
            ×
          </button>

          {memories.length > 1 && (
            <button
              type="button"
              className="memory-viewer__arrow memory-viewer__arrow--left"
              onClick={showPrevious}
              aria-label="Previous memory"
            >
              ‹
            </button>
          )}

          <div className="memory-viewer__content">
            <img
              src={memories[selectedIndex].image}
              alt={
                memories[selectedIndex].caption ||
                `Memory ${selectedIndex + 1}`
              }
            />

            {memories[selectedIndex].caption && (
              <p>
                {memories[selectedIndex].caption}
              </p>
            )}

            <span className="memory-viewer__count">
              {selectedIndex + 1} / {memories.length}
            </span>
          </div>

          {memories.length > 1 && (
            <button
              type="button"
              className="memory-viewer__arrow memory-viewer__arrow--right"
              onClick={showNext}
              aria-label="Next memory"
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MemoriesExperience;