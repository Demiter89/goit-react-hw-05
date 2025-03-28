import { useParams } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import css from './MovieDetailsPage.module.css';
import { Link, Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});
    const location = useLocation();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(location.state?.from || "/movies");
    };

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const API_KEY = '65e63a43c258a7dd70aa0c13e1b1fe41';
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
                setMovie(response.data);
                
            } catch {
                toast('Something went wrong', 
                    {position: 'top-right'});
            }
        }
        fetchMovieDetails();
    }, [movieId]);

    return (
        <div className={css.container}>

            <button className={css.btnBack} onClick={goBack}>Go back</button>
            {movie.backdrop_path ? (
                <img 
                    className={css.backdrop} 
                    src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} 
                    alt={movie.title} 
                />
            ) : (
                <div className={css.noImage}>No Image Available</div> 
            )}

            <div className={css.movieContainer}>
                <h2 className={css.movieTitle}>{movie.title} ({movie.original_title})</h2>
            
                <p className={css.movieTagline}><strong>Tagline:</strong> {movie.tagline || "No tagline available"}</p>
                <p className={css.movieDetail}><strong>Release Date:</strong> {movie.release_date}</p>
                <p className={css.movieDetail}><strong>Popularity:</strong> {movie.popularity}</p>
                <p className={css.movieDetail}>Genres: {movie?.genres?.length ? movie.genres.map(genre => genre.name).join(', ') : 'No genres available'}
</p>


                {movie.overview && (
                    <div className={css.movieOverview}>
                        <h3>Overview:</h3>
                        <p>{movie.overview}</p>
                    </div>
            )}

            </div>
            
            <ul className={css.navDetails}>
            
                <li className={css.castSlide}><Link to="cast">Cast</Link></li>
                <li className={css.castSlide}><Link to="reviews">Reviews</Link></li>
            </ul>
            
            <Suspense fallback={<h2>Loading...</h2>}>
                <Outlet />
            </Suspense>
            
        </div>
    );
}