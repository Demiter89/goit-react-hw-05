import { Link } from 'react-router-dom'; 
import css from './MovieItem.module.css';

export default function MovieItem({ movie }) {
  const placeholderImage = "https://i.pinimg.com/736x/bc/58/a0/bc58a06c0569b75241989ea92d2e4f83.jpg";
  
  return (
    <div>
      <Link to={`/movies/${movie.id}`}>
        <img 
          className={css.imgCover} 
          src={movie.backdrop_path 
            ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` 
            : placeholderImage} 
          alt={movie.title} 
          width={200} 
          height={112} 
        />
        <p>{movie.title}</p>
      </Link>
    </div>
  );
}