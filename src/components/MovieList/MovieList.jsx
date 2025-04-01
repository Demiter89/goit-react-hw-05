import css from './MovieList.module.css';  
import { lazy, Suspense } from "react";

const MovieItem = lazy(() => import('../MovieItem/MovieItem'));

export default function MovieList({ movies }) {
  // Перевірка наявності масиву movies перед використанням .map()
  if (!movies || movies.length === 0) {
    return <p>No movies found</p>;
  }

  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id}>
          <Suspense fallback={<div>Loading...</div>}>
            <MovieItem movie={movie} />
          </Suspense>
        </li>
      ))}
    </ul>
  );
}
  