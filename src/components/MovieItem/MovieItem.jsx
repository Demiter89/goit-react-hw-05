import { Link } from 'react-router-dom';
import css from './MovieItem.module.css'

export default function MovieItem({movies}){
    const placeholderImage = "https://i.pinimg.com/736x/bc/58/a0/bc58a06c0569b75241989ea92d2e4f83.jpg";
    return( 
        <>
            {movies.map(({ id, title, backdrop_path }) => (
                <li key={id}>
                    <Link to={`/movies/${id}`}>
                    <img className={css.imgCover} src={backdrop_path 
                                ? `https://image.tmdb.org/t/p/w780${backdrop_path}` 
                                : placeholderImage} alt={title} 
                                width={200} height={112}/>
                    <p>{title}</p></Link>
                    
                    </li> 
            ))}
        </>
    )
}