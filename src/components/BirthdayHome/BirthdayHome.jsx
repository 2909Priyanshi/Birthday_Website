import { useState } from 'react';
import birthdayConfig from '../../config/birthdayConfig.js';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion.js';
import ParticleField from '../OpeningScreen/ParticleField.jsx';
import SparkleExperience from '../SparkleExperience/SparkleExperience.jsx';
import WishExperience from '../WishExperience/WishExperience.jsx';
import HeartExperience from '../HeartExperience/HeartExperience.jsx';
import BalloonExperience from '../BalloonExperience/BalloonExperience.jsx';
import CakeExperience from '../CakeExperience/CakeExperience.jsx';
import GiftExperience from '../GiftExperience/GiftExperience.jsx';
import MemoriesExperience from '../MemoriesExperience/MemoriesExperience.jsx';
import WishNightExperience from '../WishNightExperience/WishNightExperience.jsx';
import NightSkyExperience from '../NightSkyExperience/NightSkyExperience.jsx';
import MusicPlayer from '../MusicPlayer/MusicPlayer.jsx';
import './BirthdayHome.css';


const experiences = [
  {
    id: 'wish',
    icon: '💌',
    title: 'Write a Wish',
    description: 'Leave a little piece of happiness here.',
  },
  {
    id: 'sparkle',
    icon: '✨',
    title: 'Make It Sparkle',
    description: 'Fill the night with magical lights.',
  },
  {
    id: 'hearts',
    icon: '💗',
    title: 'Send Some Love',
    description: 'Let the hearts take over the screen.',
  },
  {
    id: 'balloons',
    icon: '🎈',
    title: 'Release the Balloons',
    description: 'Pop the balloons and celebrate.',
  },
  {
    id: 'cake',
    icon: '🎂',
    title: 'Birthday Cake',
    description: 'Make a wish and blow out the candles.',
  },
  {
    id: 'gift',
    icon: '🎁',
    title: 'Open Your Gift',
    description: 'There might be something waiting inside.',
  },
  {
    id: 'memories',
    icon: '📸',
    title: 'Our Memories',
    description: 'A little collection of beautiful moments.',
  },
  {
    id: 'wish-night',
    icon: '🌌',
    title: 'Make a Wish',
    description: 'Look at the stars and make one final wish.',
  },
];

function BirthdayHome() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeExperience, setActiveExperience] = useState(null);

  const { homeEyebrow, mainTitle, mainMessage } = birthdayConfig;

  const handleExperienceClick = (experience) => {
    setActiveExperience(experience);
  };

  const closeExperience = () => {
    setActiveExperience(null);
  };

  return (
    <section className="birthday-home" aria-label="Birthday home">
      <MusicPlayer />
      <div className="birthday-home__ambient" aria-hidden="true" />

      <ParticleField reducedMotion={reducedMotion} />

      <div className="birthday-home__content">
        <header className="birthday-home__header">
          <p className="birthday-home__eyebrow">{homeEyebrow}</p>

          <h1 className="birthday-home__title">{mainTitle}</h1>

          <p className="birthday-home__message">{mainMessage}</p>

          <p className="birthday-home__hint">
            Choose something beautiful ✦
          </p>
        </header>

        <div className="birthday-home__experiences">
          {experiences.map((experience, index) => (
            <button
              type="button"
              className="experience-card"
              key={experience.id}
              onClick={() => handleExperienceClick(experience)}
              style={{
                '--card-delay': `${index * 70}ms`,
              }}
            >
              <span className="experience-card__icon" aria-hidden="true">
                {experience.icon}
              </span>

              <span className="experience-card__title">
                {experience.title}
              </span>

              <span className="experience-card__description">
                {experience.description}
              </span>

              <span className="experience-card__arrow" aria-hidden="true">
                →
              </span>
            </button>
          ))}
        </div>

        <p className="birthday-home__footer">
          Made with love, just for this night ♡
        </p>
      </div>

      {activeExperience && activeExperience.id === 'wish' && (
  <WishExperience onClose={closeExperience} />
)}

{activeExperience && activeExperience.id === 'sparkle' && (
  <SparkleExperience onClose={closeExperience} />
)}

{activeExperience && activeExperience.id === 'hearts' && (
  <HeartExperience onClose={closeExperience} />
)}

{activeExperience && activeExperience.id === 'balloons' && (
  <BalloonExperience onClose={closeExperience} />
)}

{activeExperience && activeExperience.id === 'cake' && (
  <CakeExperience onClose={closeExperience} />
)}

{activeExperience && activeExperience.id === 'gift' && (
  <GiftExperience onClose={closeExperience} />
)}

{activeExperience && activeExperience.id === 'memories' && (
  <MemoriesExperience onClose={closeExperience} />
)}


{activeExperience && activeExperience.id === 'wish-night' && (
  <NightSkyExperience onClose={closeExperience} />
)}

{activeExperience && activeExperience.id === 'music' && (
  <MusicPlayer onClose={closeExperience} />
)}

{activeExperience &&
  activeExperience.id !== 'wish' &&
  activeExperience.id !== 'sparkle' &&
  activeExperience.id !== 'hearts' &&
  activeExperience.id !== 'balloons' &&
  activeExperience.id !== 'cake' &&
  activeExperience.id !== 'gift' &&
  activeExperience.id !== 'memories' &&
  activeExperience.id !== 'wish-night' && (
  <div
    className="experience-modal"
    role="dialog"
    aria-modal="true"
    aria-label={activeExperience.title}
    onClick={closeExperience}
  >
    <div
      className="experience-modal__content"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="experience-modal__close"
        onClick={closeExperience}
        aria-label="Close"
      >
        ×
      </button>

      <span
        className="experience-modal__icon"
        aria-hidden="true"
      >
        {activeExperience.icon}
      </span>

      <h2>{activeExperience.title}</h2>

      <p>{activeExperience.description}</p>

      <div className="experience-modal__coming-soon">
        <span>✦</span>
        <p>
          This little experience is being prepared...
        </p>
        <span>✦</span>
      </div>

      <button
        type="button"
        className="experience-modal__button"
        onClick={closeExperience}
      >
        Back to the birthday
      </button>
    </div>
  </div>
)}


    </section>
  );
}

export default BirthdayHome;