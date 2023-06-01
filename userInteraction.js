
import readline from 'readline';
import {
  displayMovieCatalog,
  addNewMovie,
  updateMovieDetails,
  deleteMovie,
  searchMovies,
  filterMovies,
} from './movieManagement.js';

import { fetchMovieData } from './apiRequests.js';

// Create an interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Display the main menu
const displayMainMenu = () => {
  console.log('========== Movie Catalog ==========');
  console.log('1. Display Movie Catalog');
  console.log('2. Add New Movie');
  console.log('3. Update Movie Details');
  console.log('4. Delete Movie');
  console.log('5. Search Movies');
  console.log('6. Filter Movies');
  console.log('0. Exit');
  console.log('===================================');
};

// Prompt the user for input
const promptUser = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Handle user input and execute corresponding actions
const handleUserInput = async () => {
  displayMainMenu();
  const choice = await promptUser('Enter your choice: ');

  switch (choice) {
    case '1': {
      console.log('=== Movie Catalog ===');
      await displayMovieCatalog();
      break;
    }
    case '2': {
      console.log('=== Add New Movie ===');
      const title = await promptUser('Title: ');
      const director = await promptUser('Director: ');
      const releaseYear = await promptUser('Release Year: ');
      const genre = await promptUser('Genre: ');
      const movie = { title, director, releaseYear, genre };
      console.log(movie);
      await addNewMovie(movie);
      break;
    }
    case '3': {
      console.log('=== Update Movie Details ===');
      const movieIndex = parseInt(await promptUser('Enter the movie index to update: '), 10) - 1;
      const title = await promptUser('New Title: ');
      const director = await promptUser('New Director: ');
      const releaseYear = await promptUser('New Release Year: ');
      const genre = await promptUser('New Genre: ');
      const updatedMovie = { title, director, releaseYear, genre };
      await updateMovieDetails(movieIndex, updatedMovie);
      break;
    }
    case '4': {
      console.log('=== Delete Movie ===');
      const movieIndex = parseInt(await promptUser('Enter the movie index to delete: '), 10) - 1;
      await deleteMovie(movieIndex);
      break;
    }
    case '5': {
      console.log('=== Search Movies ===');
      const searchTerm = await promptUser('Enter the search term: ');
      console.log('=== Search Results ===');
      await searchMovies(searchTerm);
      break;
    }
    case '6': {
      console.log('=== Filter Movies ===');
      const filterType = await promptUser('Enter the filter type (genre/releaseYear): ');
      const filterValue = await promptUser('Enter the filter value: ');
      console.log('=== Filtered Results ===');
      await filterMovies(filterType, filterValue);
      break;
    }
    case '0': {
      console.log('Exiting...');
      rl.close();
      return;
    }
    default:
      console.log('Invalid choice!');
  }

  console.log('\n');
  await handleUserInput();
};

// Start the application
const start = async () => {
  console.log('Welcome to the Movie Catalog!');
  console.log('==============================\n');
  await handleUserInput();
};

start();
