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
                const API_KEY = 'b28ce4003d83b7bcee0c9dd6c31484cb';
                const options = {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjhjZTQwMDNkODNiN2JjZWUwYzlkZDZjMzE0ODRjYiIsIm5iZiI6MTc0MzI2OTA0MC4zODUsInN1YiI6IjY3ZTgyY2IwYmQxZjk2ZjllZjYzNzNmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qn6L4dkcZTYQvM4P7dtmd-bkXmoWHxpLe_Pq5ifIBtE'
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