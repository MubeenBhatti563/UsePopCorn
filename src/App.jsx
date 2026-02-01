import { useEffect, useRef, useState } from "react";
import "./App.css";
import ListBox from "./components/ListBox";
import Navbar from "./components/Navbar";
import ListWatched from "./components/ListWatched";
import useMovies from "./components/hooks/useMovies";
import useLocalStorage from "./components/hooks/useLocalStorage";
import useKey from "./components/hooks/useKey";

function App() {
  const [query, setQuery] = useState("");
  const { movies, isLoading: isSearchLoading, error } = useMovies(query);
  const [movieDetail, setMovieDetail] = useState(null);
  const [title, setTitle] = useState("");
  const [isWatchedList, setIsWatchedList] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  // Watched movies state with localStorage
  const countRef = useRef(0);
  const [watched, setWatched] = useLocalStorage([], "watched");

  // Update document title
  useEffect(() => {
    document.title = title || "usepopcorn";
  }, [title]);

  useKey("Escape", () => setIsWatchedList(!isWatchedList));

  // Fetch movie detail by IMDb ID
  const handleCheck = async (id) => {
    try {
      setIsDetailLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=YourImDBApiKey=${id}`,
      );
      if (!res.ok) throw new Error("Failed to fetch movie details");
      const data = await res.json();
      setMovieDetail(data);
      setTitle(`MOVIE | ${data.Title}`);
      setIsWatchedList(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsDetailLoading(false);
    }
  };

  // Add movie to watched list
  const handleAddWatched = (movie, userRating) => {
    const isAlreadyWatched = watched.some((m) => m.imdbID === movie.imdbID);

    if (isAlreadyWatched) {
      alert("This movie is already in your watched list!");
      return;
    }

    const newWatchedMovie = {
      imdbID: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      userRating: userRating,
      runtime: Number(movie.Runtime.split(" ")[0]),
      useCountDesision: countRef.current,
    };

    const updatedWatched = [...watched, newWatchedMovie];
    setWatched(updatedWatched);
    localStorage.setItem("watched", JSON.stringify(updatedWatched));
    setIsWatchedList(true);
  };

  // Delete movie from watched list
  const handleDelMovie = (id) => {
    const updatedWatched = watched.filter((movie) => movie.imdbID !== id);
    setWatched(updatedWatched);
    localStorage.setItem("watched", JSON.stringify(updatedWatched));
  };

  return (
    <div className="app">
      <Navbar query={query} setQuery={setQuery} moviesCount={movies.length} />
      <main className="main">
        <ListBox
          movies={movies}
          watched={watched}
          isLoading={isSearchLoading}
          error={error}
          handleCheck={handleCheck}
        />
        <ListWatched
          movies={movies}
          watched={watched}
          isWatchedList={isWatchedList}
          setIsWatchedList={setIsWatchedList}
          movieDetail={movieDetail}
          isLoading={isDetailLoading}
          handleAddWatched={handleAddWatched}
          handleDelMovie={handleDelMovie}
          countRef={countRef}
        />
      </main>
    </div>
  );
}

export default App;
