// File: fileHandler.js

import fs from 'fs';

// Read movie data from the JSON file
const readMovieData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('movies.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        
        resolve(JSON.parse(data?data:{}));
        console.log("This is from Read Movie Data");
        console.log(JSON.parse(data));
      }
    });
  });
};

// Write movie data to the JSON file
const writeMovieData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile('movies.json', JSON.stringify(data), 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
// Append movie data to the JSON file
const appendMovieData = (data) => {
  return new Promise((resolve, reject) => {
    fs.appendFile('movies.json', JSON.stringify(data), 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
export { readMovieData, writeMovieData,appendMovieData };