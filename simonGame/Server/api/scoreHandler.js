const { default: mongoose } = require("mongoose");
const Score = require("../db/scoreSchema");

// Returns the highest score of the signed in user
// Method: GET
exports.scoreHandler = {
  async getHighestScore(req, res) {
    Score.find({ email: req.query.email })
      .sort({ score: -1 })
      .limit(1)
      .then((docs) => {
        if (docs.length >= 1) {
          res.status(200).json({
            message: `${docs[0].name}'s highest score`,
            name: docs[0].name,
            score: docs[0].score,
            request: {
              Method: "GET",
              url: "http://localhost:5001/api/scores"+req.query.email,
            },
          });
        } else {
          res.status(500).json({
            message: "User not found",
            reason: "scoreHandler1",
          });
        }
      })
      .catch((err) =>
        res.status(500).json({
          error: err,
          reason: "scoreHandler",
        })
      );
  },

  // Updates the score field to the new highscore
  // Method: PUT
  async addNewHighScore(req, res) {
    Score.findOneAndUpdate(
      { email: req.body.email },
      { $set: { score: req.body.score } },
      { new: true }
    )
      .then((docs) =>
        res.status(200).json({
          message: `New HighScore made by ${docs.name}`,
          score: docs.score,
          request: {
            Method: "PUT",
            url: "http://localhost:5001/api/scores",
          },
        })
      )
      .catch((err) =>
        res.status(500).json({
          error: err,
          reason: "addNewHighScore",
        })
      );
  },

  // Returns user data on login, or Signing up in case of new user
  // Method: POST
  async userLogin(req, res) {
    const { name, email } = req.body;

    Score.find({ email: email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(200).json({
            message: "logged in",
            user: user,
          });
        } else {
          const User = new Score({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            email: email,
          });
          User.save()
            .then((result) => {
              res.status(200).json({
                result: result,
                message: "New user added",
                name: result.name,
                email: result.email,
                score: result.score,
                request: {
                  Method: "POST",
                  url: "http://localhost:5001/api/scores/login" + result._id,
                },
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
                reason: "userLogin",
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
};
