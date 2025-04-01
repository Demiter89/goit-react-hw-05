import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      setError(null);

      const API_KEY = "b28ce4003d83b7bcee0c9dd6c31484cb";
      const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWU2M2E0M2MyNThhN2RkNzBhYTBjMTNlMWIxZmU0MSIsIm5iZiI6MTc0MjkwMDIzMS43OTAwMDAyLCJzdWIiOiI2N2UyOGMwNzE2YTNjNWMyMjRmMDVlNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Gj5KKh_5hoQkblhe7TtEiniX_OhNq0TGx1HwRS_dyOs",
        },
      };

      try {
        const resp = await axios.get(url, options);
        setMovies(resp.data.results);
      } catch (error) {
        setError("Something went wrong. Try again!");
        toast.error("Something went wrong. Try again!");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1>Популярні Тренди</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}