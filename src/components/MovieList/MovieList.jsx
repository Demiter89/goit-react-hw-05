import css from './MovieList.module.css';
import { lazy, Suspense } from "react";

const MovieItem = lazy(() => import('../MovieItem/MovieItem'));


export default function MovieList({ movies }) {
    return (
      <ul className={css.list}>
        <Suspense fallback={<div>Loading...</div>}></Suspense>
        <MovieItem movies={movies}/>
      </ul>
    );
  }
  