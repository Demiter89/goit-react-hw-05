import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import css from './MovieCast.module.css';
import { toast } from 'react-hot-toast';

export default function MovieCast() {
    
    const [cast, setCast] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        async function  fetchMovieCast() {
            try{
                const API_KEY = '65e63a43c258a7dd70aa0c13e1b1fe41';
                const options = {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWU2M2E0M2MyNThhN2RkNzBhYTBjMTNlMWIxZmU0MSIsIm5iZiI6MTc0MjkwMDIzMS43OTAwMDAyLCJzdWIiOiI2N2UyOGMwNzE2YTNjNWMyMjRmMDVlNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Gj5KKh_5hoQkblhe7TtEiniX_OhNq0TGx1HwRS_dyOs'
                    }
                };
                
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`, options);
                
                if (response.data && response.data.cast && response.data.cast.length > 0) {
                    setCast(response.data.cast);
                } else {
                    toast('No results', { position: 'top-right' });
                    setCast([]); }
                
            } catch {
                toast('Something went wrong. Try again!', 
                    {position: 'top-right'});
            }
        }
        fetchMovieCast();

        
    }, [movieId])

    return(
    <>
        <ul className={css.list}>
            {cast.map(({name, character, id }) => (
                <li key={id}>
                    <p>{name} - {character}</p>
                </li>
            ))}
        </ul>
    </>
        
    )
}