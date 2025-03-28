import axios from "axios";

export default async function findMoviesAPI(value) {
    
    const API_KEY = '65e63a43c258a7dd70aa0c13e1b1fe41';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`;
    
    const options = {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWU2M2E0M2MyNThhN2RkNzBhYTBjMTNlMWIxZmU0MSIsIm5iZiI6MTc0MjkwMDIzMS43OTAwMDAyLCJzdWIiOiI2N2UyOGMwNzE2YTNjNWMyMjRmMDVlNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Gj5KKh_5hoQkblhe7TtEiniX_OhNq0TGx1HwRS_dyOs'
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