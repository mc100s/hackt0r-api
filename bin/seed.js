require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");

const User = require("../models/user");
const Actor = require("../models/actor");
const KnowledgeScore = require("../models/knowledgeScore");

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

Actor.remove(err => {
  if (err) {
    console.log(err);
    return;
  }
  let page = 1;
  let continueAxiosCall = true;
  while (continueAxiosCall) {
    axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.THEMOVIEDB_API_KEY}&page=${page}`)
      .then(response => {
        console.log("Response.data", response.data.results.map(actor => actor.name))
        let results = response.data.results ? response.data.results : [];
        for (let i = 0; i < results.length; i++) {
          let actor = new Actor({
            name: results[i].name,
            pictureUrl: 'https://image.tmdb.org/t/p/w500' + results[i].profile_path,
            tmdbId: results[i].id,
            tmdbPopularity: results[i].popularity
          });
          actor.save((err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('Add of an actor: ', results[i].name);
            }
          })
        }
        // mongoose.disconnect();
      })
      .catch(error => {
        console.log(error)
      })
    page++;
    if (page > 10)
      continueAxiosCall = false;
  }
})

