import { useEffect, useRef, useState } from 'react';
import './MusicPlayer.css';

const songs = [
  {
    id: 'birthday1',
    name: 'Birthday Song 1',
    src: '/assets/music/birthday1.mp3',
  },
  {
    id: 'birthday2',
    name: 'Birthday Song 2',
    src: '/assets/music/birthday2.mp3',
  },
];

function MusicPlayer() {
  const audioRef = useRef(null);

  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);

  const song = songs[currentSong];

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentSong]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const changeSong = () => {
    setCurrentSong((current) =>
      current === songs.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={song.src}
        onEnded={() => {
          setCurrentSong((current) =>
            current === songs.length - 1 ? 0 : current + 1,
          );
        }}
      />

      <div className="music-player__icon">
        {isPlaying ? '🎵' : '🔇'}
      </div>

      <div className="music-player__info">
        <span className="music-player__label">
          Birthday Music
        </span>

        <span className="music-player__song">
          {song.name}
        </span>
      </div>

      <button
        type="button"
        className="music-player__button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>

      <button
        type="button"
        className="music-player__button"
        onClick={changeSong}
        aria-label="Change song"
      >
        ↻
      </button>

      <label
        className="music-player__volume"
        aria-label="Music volume"
      >
        🔊

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(event) =>
            setVolume(Number(event.target.value))
          }
        />
      </label>
    </div>
  );
}

export default MusicPlayer;