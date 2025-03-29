import axios from "axios";

export default async function findMoviesAPI(value) {
    
    const API_KEY = 'b28ce4003d83b7bcee0c9dd6c31484cb';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`;
    
    const options = {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjhjZTQwMDNkODNiN2JjZWUwYzlkZDZjMzE0ODRjYiIsIm5iZiI6MTc0MzI2OTA0MC4zODUsInN1YiI6IjY3ZTgyY2IwYmQxZjk2ZjllZjYzNzNmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qn6L4dkcZTYQvM4P7dtmd-bkXmoWHxpLe_Pq5ifIBtE'
        }
    };
    try {
        const data = await axios.get(url, options);
        console.log(data.data.results);
        return data.data.results;
    } catch  {
        return alert('Thomething went wrong. Try again!')
    }
    

    
}