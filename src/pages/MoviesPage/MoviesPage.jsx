import MovieList from "../../components/MovieList/MovieList"
import css from './MoviesPage.module.css'

export default function MoviesPage({ movies, onChange, onSubmit }){
    
    
    return(
        <div className={css.container}>
        <form className={css.form} onSubmit={onSubmit}>
        <input className={css.input}  
            type="text" 
            placeholder="Movie name"
            autoFocus
            onChange={onChange}/>
            <button className={css.button} type="submit">Search</button>
        </form>
            <MovieList movies={movies}/>
            
        </div>
    )
}