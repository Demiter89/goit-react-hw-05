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
                const API_KEY = '65e63a43c258a7dd70aa0c13e1b1fe41';
                const options = {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWU2M2E0M2MyNThhN2RkNzBhYTBjMTNlMWIxZmU0MSIsIm5iZiI6MTc0MjkwMDIzMS43OTAwMDAyLCJzdWIiOiI2N2UyOGMwNzE2YTNjNWMyMjRmMDVlNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Gj5KKh_5hoQkblhe7TtEiniX_OhNq0TGx1HwRS_dyOs'
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