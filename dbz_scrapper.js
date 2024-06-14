const backendUrl =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=fcfc418e685f1776e9fd9cbab3b01b8e&page=";
const axios = require("axios");
const fs = require("fs");
const movies = [];

async function fecthCharacters() {
  try {
    for (let i = 1; i < 473; i++) {
      const response = await axios.get(backendUrl + i);
      // console.log(response);
      const betterMovies = response.data.results.map((movie) => {
        return {
          image: `https://images.tmdb.org/t/p/original${movie.backdrop_path}`,
          id: movie.id,
          language: movie.orignal_language,
          title: movie.original_title,
          summary: movie.overview,
          released: movie.release_date,
          rating: movie.vote_average,
          genre: movie.genre_ids,
        };
      });
      movies.push(...betterMovies);
      console.log(`We now have ${movies.length} movies`);
      await sleep(50);
    }

    fs.writeFileSync("movies.json", JSON.stringify(movies, null, 2));
    return;
  } catch (error) {
    console.log(error);
  }
}

async function sleep(time) {
  return new Promise((accept) => {
    setTimeout(() => {
      accept();
    }, time);
  });
}

fecthCharacters();
