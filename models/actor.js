const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const { Schema } = mongoose;

const actorSchema = new Schema({
  name: String,
  pictureUrl: String,
  tmdbId: Number,
  tmdbPopularity: Number
});

module.exports = mongoose.model("Actor", actorSchema);