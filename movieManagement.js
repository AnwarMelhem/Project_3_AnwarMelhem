// // File: movieManagement.js
import { readMovieData, writeMovieData, appendMovieData } from './fileHandler.js';

//************************************************ 
// Display movie function
//************************************************ 
const displayMovieCatalog = async () => {
  try {
    const movies = await readMovieData();
    movies.movies.forEach((e, idx) => console.log(idx, " : ", e))
  } catch (err) {
    console.error('Error reading movie data:', err);
  }
};
//************************************************ 
// Add movie function
//************************************************
const addNewMovie = async (movie) => {
  try {
    let movies = await readMovieData();
    console.log(movies === "{}", Object.keys(movies))
    if (Object.keys(movies).length === 0) {
      movies = {
        movies: [movie],
      }
    }
    else {
      movies.movies.push(movie)
    }
    console.log(movies)
    await writeMovieData(movies);
    console.log('New movie added successfully!');
  } catch (err) {
    console.error('Error adding movie:', err);
  }
};

//****************************************************** 
// Update movie function
//****************************************************** 
const updateMovieDetails = async (movieIndex, updatedMovie) => {
  try {
    let movies = await readMovieData();
    movies = movies.movies;
    console.log(movies, movieIndex * 1 >= 0 && movieIndex < movies.length, updatedMovie, movieIndex)
    if (movieIndex >= 0 && movieIndex < movies.length) {
      movies[movieIndex] = updatedMovie;
      await writeMovieData({ movies });
    }

  } catch (err) {
    console.error('Error updating movie details:', err);
  }
};
//************************************************ 
// Delete movie function
//************************************************ 
const deleteMovie = async (movieIndex) => {
  try {
    let movies = await readMovieData();
    movies = movies.movies;
    movies = movies.filter((e, idx) => idx !== movieIndex * 1)
    console.log(movies)

    await writeMovieData({ movies });
    console.log('Movie deleted successfully!');

  } catch (err) {
    console.error('Error deleting movie:', err);
  }
};
//************************************************ 
// Search movies by title, director, or genre
//************************************************ 
const searchMovies = async (searchTerm) => {
  try {
    let movies = await readMovieData();
    movies = movies.movies
    const filteredMovies = movies.filter((movie) => {
      const titleMatch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const directorMatch = movie.director.toLowerCase().includes(searchTerm.toLowerCase());
      const genreMatch = movie.genre.toLowerCase().includes(searchTerm.toLowerCase());
      return titleMatch || directorMatch || genreMatch;
    });
    filteredMovies.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title} (${movie.releaseYear}) - ${movie.director} (${movie.genre})`);
    });
  } catch (err) {
    console.error('Error searching movies:', err);
  }
};
//************************************************ 
// Filter movies by genre or release year type 
//************************************************ 
const filterMovies = async (filterType, filterValue) => {
  try {
    let movies = await readMovieData();
    movies = movies.movies
    console.log("aaaaaaa" + movies)
    let filteredMovies = movies.filter((movie) => {
      if (filterType === 'genre') {
        return movie.genre.toLowerCase() === filterValue.toLowerCase();
      } else if (filterType === 'releaseYear') {
        return movie.releaseYear === filterValue;
      }
      return false;
    });
    filteredMovies.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title} (${movie.releaseYear}) - ${movie.director} (${movie.genre})`);
    });
  } catch (err) {
    console.error('Error filtering movies:', err);
  }
};

export { displayMovieCatalog, addNewMovie, updateMovieDetails, deleteMovie, searchMovies, filterMovies };
