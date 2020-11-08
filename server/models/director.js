const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const directorSchema = new Schema({
  name: String,
  age: Number,
});

// коллекция названа "directors" поэтому можно не указывать третим параметром название коллекции 
// так как автоматически будет искать во мн числе
module.exports = mongoose.model("director", directorSchema);
