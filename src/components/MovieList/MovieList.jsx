import css from './MovieList.module.css';   
import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";  // Вилучили Link з цього імпорту

const MovieItem = lazy(() => import('../MovieItem/MovieItem'));

export default function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return <p>No movies found</p>;
  }

  const location = useLocation(); 

  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id}>
          <Suspense fallback={<div>Loading...</div>}>
            {/* Тепер MovieItem сам обгортає все у Link */}
            <MovieItem movie={movie} location={location} />
          </Suspense>
        </li>
      ))}
    </ul>
  );
}