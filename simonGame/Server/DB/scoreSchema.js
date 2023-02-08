const { Schema, model } = require("mongoose");

const scoreSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});

const Score = model("Score", scoreSchema);

module.exports = Score;
