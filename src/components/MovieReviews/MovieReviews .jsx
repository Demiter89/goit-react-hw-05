import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'; 
import css from './MovieReviews.module.css';
import { toast } from 'react-hot-toast';

export default function MovieReviews() {

    const [review, setReview] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        async function fetchReviews(){
            try{
                const API_KEY = 'b28ce4003d83b7bcee0c9dd6c31484cb';
                const options = {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjhjZTQwMDNkODNiN2JjZWUwYzlkZDZjMzE0ODRjYiIsIm5iZiI6MTc0MzI2OTA0MC4zODUsInN1YiI6IjY3ZTgyY2IwYmQxZjk2ZjllZjYzNzNmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qn6L4dkcZTYQvM4P7dtmd-bkXmoWHxpLe_Pq5ifIBtE'
                    }
                };
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`, options);
                if (response.data && response.data.results && response.data.results.length > 0) {
                    setReview(response.data.results);
                } else {
                    toast('No results', 
                        {position: 'top-right'});
                    setReview([]); 
                }
                
            } catch {
                toast('Something went wrong. Try again!', 
                    {position: 'top-right'});
                
            }
            
        }
        fetchReviews();
    }, [movieId])

    return(
        <>
        <ul className={css.list}>
        {review.map(({ author, content, updated_at, id }) => (
            <li key={id}>
                <p><i>{author}</i></p>
                <p className={css.text}>{content}</p>
                <p>{updated_at}</p>
            </li>
        ))}
    </ul>
    </>
        
    )
}