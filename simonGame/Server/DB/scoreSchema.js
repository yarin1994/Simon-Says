const { Schema, model } = require("mongoose");

const scoreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
  },
});

const Score = model("Score", scoreSchema);

module.exports = Score;
