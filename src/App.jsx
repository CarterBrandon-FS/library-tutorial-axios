import { useState, useRef } from "react";
import axios from "axios";
import AudioPlayer from "./components/AudioPlayer";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(null);
  const [searchTerm, setSearchTerm] = useState([]);
  const audioRef = useRef(null);

  const fetchSongs = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter an artist or song");
      return;
    }
    setLoading(true);
    setError(null);

    const query = searchTerm.trim();

    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${query}&media=music&limit=6`,
      );

      const songList = response.data.results.map((item) => ({
        id: item.trackId,
        title: item.trackName,
        artist: item.artistName,
        duration: "0:30",
        previewUrl: item.previewUrl,
        artworkUrl: item.artworkUrl100,
      }));

      setSongs(songList);
    } catch (error) {
      setError("Could not load song");
    }

    setLoading(false);
  };

  const handleToggle = (song) => {
    const audio = audioRef.current;

    if (isPlaying === song.id) {
      audio.pause();
      setIsPlaying(null);
    } else {
      audio.src = song.previewUrl;
      audio.play();
      setIsPlaying(song.id);
    }
  };

  return (
    <div className="App">
      <h1>My Music Library</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for an artist/song title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchSongs()}
        />

        <button onClick={fetchSongs} disabled={isloading}>
          {isloading ? "Loading..." : "Load Songs"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="song-grid">
        {songs.map((song) => (
          <AudioPlayer
            key={song.id}
            title={song.title}
            artist={song.artist}
            duration={song.duration}
            artworkUrl={song.artworkUrl}
            isPlaying={isPlaying === song.id}
            onToggle={() => handleToggle(song)}
          />
        ))}
      </div>

      <audio ref={audioRef} onEnded={() => setIsPlaying(null)} />
    </div>
  );
}

export default App;
