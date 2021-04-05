const API_KEY = "249f222afb1002186f4d88b2b5418b55";

let config = {
  "api-search": `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`,
  "api-url": `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=true&page=`,
};


export default config;