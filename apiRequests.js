
import fetch from 'node-fetch';

// Fetch additional movie data from an API
const fetchMovieData = async () => {
 const url=`http://www.omdbapi.com/?i=tt3896198&apikey=397bf16b`
 fetch(url)
 .then(response => response.json())
 .then(data => {
   console.log(data);
    
    let x=data.Title;
    let y=data.Director;
    let z=data.Year;
    let w=data.Genre;
   return {x, y, z, w }
 })
 .catch(error => {
   console.error(error);
 });
};

//fetchMovieData();
export { fetchMovieData };
