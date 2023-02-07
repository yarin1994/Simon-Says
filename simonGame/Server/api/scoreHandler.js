const Score = require("../db/scoreSchema");

exports.scoreHandler = {
  // Get all users
  async getHighestScore(req, res) {
    Score.find({})
      .then((docs) => { 
        res.json(docs)})
      .catch((err) =>
        console.log(`Error getting the all users from DB: ${err}`)
      );
  },

  
  // Add new user
  async addNewHighScore(req, res) {
    Score.find({})
    .then((docs) => res.json(docs))
    .catch((err) =>
      console.log(`Error getting the all users from DB: ${err}`)
    );
  },
};