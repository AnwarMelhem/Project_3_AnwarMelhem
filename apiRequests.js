// // File: apiRequests.js

// This module is responsible for making API requests to fetch additional movie data from an external movie database API (e.g., OMDB API).

import fetch from 'node-fetch';

// Fetch additional movie data from an API
const fetchMovieData = async (title) => {
  const apiKey = 'your-api-key';
  const url = `https://api.example.com/?title=${encodeURIComponent(title)}&apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    // Process and extract the required movie data
    const movieData = {
      title: data.title,
      plot: data.plot,
      // Extract more properties as needed
    };
    return movieData;
  } catch (err) {
    console.error('Error fetching movie data:', err);
    return null;
  }
};

export { fetchMovieData };
