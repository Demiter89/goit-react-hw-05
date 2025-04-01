import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get("query") ?? "";

  const handleSearch = (ev) => {
    ev.preventDefault();
    const value = ev.target.elements.search.value.trim();

    if (!value) {
      toast.error("Input cannot be empty!");
      return;
    }

    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (!query) return;

    async function fetchMovies() {
      setIsLoading(true);
      setError(null);

      const API_KEY = "b28ce4003d83b7bcee0c9dd6c31484cb";
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWU2M2E0M2MyNThhN2RkNzBhYTBjMTNlMWIxZmU0MSIsIm5iZiI6MTc0MjkwMDIzMS43OTAwMDAyLCJzdWIiOiI2N2UyOGMwNzE2YTNjNWMyMjRmMDVlNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Gj5KKh_5hoQkblhe7TtEiniX_OhNq0TGx1HwRS_dyOs",
        },
      };

      try {
        const resp = await axios.get(url, options);
        if (resp.data.results.length === 0) {
          toast("No movies found!");
        }
        setMovies(resp.data.results);
      } catch (error) {
        setError("Something went wrong. Try again!");
        toast.error("Something went wrong. Try again!");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSearch}>
        <input
          className={css.input}
          type="text"
          name="search"
          placeholder="Movie name"
          autoFocus
          defaultValue={query}
        />
        <button className={css.button} type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}