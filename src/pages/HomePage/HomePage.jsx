import css from './HomePage.module.css'
import MovieList from '../../components/MovieList/MovieList'

export default function HomePage({ movies }){
    return <MovieList movies={movies}/>
}