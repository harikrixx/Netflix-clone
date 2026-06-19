import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./home.css";
import NetflixIntro from "../components/NetflixIntro";

export default function Home() {
  const [movies, setMovies] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [selectedMovie, setSelectedMovie] = useState(null);
const [showTrailer, setShowTrailer] = useState(false);
const [loading, setLoading] = useState(true);
  useEffect(() => {
    const dummyMovies = [
      {
        title: "Interstellar",
        image:
          "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        rating: "8.7",
        genre: "Sci-Fi",
        description:
          "A team of explorers travel through a wormhole in space to save humanity.",
        trailer: "zSWdZVtXT7E",
      },
      {
        title: "Inception",
        image:
          "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        rating: "8.8",
        genre: "Thriller",
        description:
          "A skilled thief enters people's dreams to steal secrets.",
         trailer: "YoHD9XEInc0",
      },
      {
        title: "Avengers: Endgame",
        image:
          "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        rating: "8.4",
        genre: "Action",
        description:
          "The Avengers assemble for one final battle against Thanos.",
          trailer: "TcMBFSGVi1c",
      },
      {
        title: "Joker",
        image:
          "https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        rating: "8.4",
        genre: "Crime",
        description:
          "A failed comedian descends into madness and becomes Gotham's infamous villain.",
          trailer: "zAGVQLHvwOY",
      },
      {
        title: "The Dark Knight",
        image:
          "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        rating: "9.0",
        genre: "Action",
        description:
          "Batman faces his greatest enemy, the Joker.",
          trailer: "EXeTwQWrcwY",
      },
      {
        title: "Oppenheimer",
        image:
          "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        rating: "8.6",
        genre: "Biography",
        description:
          "The story of J. Robert Oppenheimer and the atomic bomb.",
          trailer: "uYPbbksJxIg",
      },
      {
        title: "John Wick",
        image:
          "https://image.tmdb.org/t/p/original/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
        rating: "7.9",
        genre: "Action",
        description:
          "A retired assassin returns to seek revenge.",
          trailer: "2AUmvWm5ZDQ",
      },
      {
        title: "Avatar",
        image:
          "https://image.tmdb.org/t/p/original/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
        rating: "7.8",
        genre: "Adventure",
        description:
          "A marine discovers a new world called Pandora.",
          trailer: "5PSNL1qE6VY",
      },
    ];
    setMovies(dummyMovies);
    setTimeout(() => {
  setLoading(false);
}, 4000);
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderMovies = () => {
    if (filteredMovies.length === 0) {
      return (
        <h3 style={{ color: "#999", padding: "20px" }}>
          No movies found 🎬
        </h3>
      );
    }
    return filteredMovies.map((movie, index) => (
      <div className="movie-card" key={index}>
        <img
          className="poster"
          src={movie.image}
          alt={movie.title}
        />

        <div className="movie-overlay">
          <h3>{movie.title}</h3>

          <div className="card-buttons">
            <button>▶ Play</button>

            <button
              onClick={() => setSelectedMovie(movie)}
            >
              ℹ Info
            </button>
          </div>
        </div>
      </div>
    ));
  };
  if (loading) {
  return <NetflixIntro />;
}
  return (
    <div className="home">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div
        className="hero"
        style={{
          backgroundImage:
            "url(https://image.tmdb.org/t/p/original/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg)",
        }}
      >
        <div className="hero-content">
          <h1>Stranger Things</h1>

          <p>
            When a young boy vanishes, a small town uncovers a mystery
            involving secret experiments and supernatural forces.
          </p>

          <div className="buttons">
            <button className="play">▶ Play</button>
            <button className="more">ℹ More Info</button>
          </div>
        </div>
      </div>

      <div className="row">
        <h2>Trending Now</h2>
        <div className="row-posters">{renderMovies()}</div>
      </div>

      <div className="row">
        <h2>Popular on Netflix</h2>
        <div className="row-posters">{renderMovies()}</div>
      </div>

      <div className="row">
        <h2>Action Movies</h2>
        <div className="row-posters">{renderMovies()}</div>
      </div>

      {selectedMovie && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="movie-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedMovie.image}
              alt={selectedMovie.title}
            />

            <div className="modal-content">
              <h1>{selectedMovie.title}</h1>

              <p className="rating">
                ⭐ {selectedMovie.rating}
              </p>

              <p className="genre">
                {selectedMovie.genre}
              </p>

              <p className="description">
                {selectedMovie.description}
              </p>

              <div className="modal-buttons">
                <button
                 className="play-btn"
                onClick={() => setShowTrailer(true)}
                >
                ▶ Watch Trailer
              </button>

                <button
                  className="close-btn"
                  onClick={() => {
  setSelectedMovie(null);
  setShowTrailer(false);
}}
                >
                  ✖ Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
 {showTrailer && selectedMovie && (
  <div
    className="trailer-backdrop"
    onClick={() => setShowTrailer(false)}
  >
    <div
      className="trailer-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${selectedMovie.trailer}?autoplay=1`}
        title="Movie Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <button
        className="trailer-close"
        onClick={() => setShowTrailer(false)}
      >
        ✖
      </button>
    </div>
  </div>
)}     

      <footer
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#777",
        }}
      >
        Netflix Clone made by Harikrishnan A© 2026
      </footer>
    </div>
  );
}