// // File: movieManagement.js

import { readMovieData, writeMovieData,appendMovieData } from './fileHandler.js';

// Display movie catalog
const displayMovieCatalog = async () => {
  try {
    const movies = await readMovieData();
    console.log("Printing New:"+ JSON.stringify(movies))
    // movies.forEach((movie, index) => {
    //   console.log(`${index + 1}. ${movie.title} (${movie.releaseYear}) - ${movie.director} (${movie.genre})`);
    // }); 
  } catch (err) {
    console.error('Error reading movie data:', err);
  }
};

// Add new movie to the catalog
const addNewMovie = async (movie) => {
  try {
  
   //let movies  = await readMovieData();
   console.log(movie);
   //let movies  = await readMovieData();
   //console.log("This is printg :"+movies)
    //movies.push(movie);
    await appendMovieData(movie);
    console.log('New movie added successfully!');
  } catch (err) {
    console.error('Error adding movie:', err);
  }
};

// Update movie details
const updateMovieDetails = async (movieIndex, updatedMovie) => {
  try {
    const movies = await readMovieData();
    movies[movieIndex] = updatedMovie;
    await writeMovieData(movies);
    console.log('Movie details updated successfully!');
    console.log("Printing New:"+ JSON.stringify(movies))
  } catch (err) {
    console.error('Error updating movie details:', err);
  }
};

// Delete movie from the catalog
const deleteMovie = async (movieIndex) => {
  try {
    const movies = await readMovieData();
    movies.splice(movieIndex, 1);
    await writeMovieData(movies);
    console.log('Movie deleted successfully!');

  } catch (err) {
    console.error('Error deleting movie:', err);
  }
};

// Search movies by title, director, or genre
const searchMovies = async (searchTerm) => {
  try {
    const movies = await readMovieData();
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

// Filter movies by genre or release year
const filterMovies = async (filterType, filterValue) => {
  try {
    const movies = await readMovieData();
    const filteredMovies = movies.filter((movie) => {
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
