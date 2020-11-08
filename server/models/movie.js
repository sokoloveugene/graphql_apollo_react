const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  genre: String,
  directorId: String,
});

// если ты первым параметром указал например "movie",  
// то автоматически будет обращаться к коллекции "movies" (во мн числе). 
// В случае если у тебя создана коллекция с названием в единственном числе ("movie"), 
// то результат не будет приходить. 
// Чтоб избежать этого, можно передать третий параметр с точным названием коллекции:

module.exports = mongoose.model("movie", movieSchema, "movies");  // третий параметр это точное название твоей коллекции
