import { FaPause, FaPlay } from "react-icons/fa";

function AudioPlayer({
  title,
  artist,
  duration,
  artworkUrl,
  isPlaying,
  onToggle,
}) {
  return (
    <div className="song-card">
      <img src={artworkUrl} alt={title} className="album-art" />

      <div className="song-title">
        <h3>{title}</h3>
        <p>{artist}</p>
        <span className="duration">{duration}</span>
      </div>

      <button
        className="play-btn"
        onClick={onToggle}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
}

export default AudioPlayer;
