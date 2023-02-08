const { default: mongoose } = require("mongoose");
const Score = require("../db/scoreSchema");

// Get User details
exports.scoreHandler = {
  async getHighestScore(req, res) {
    Score.find({ email: req.query.email })
      .sort({ score: -1 })
      .limit(1)
      .then((docs) => {
        if (docs.length >= 1) {
          console.log(`docs`, docs[0].name);

          res.status(200).json({
            message: `${docs[0].name}'s highest score`,
            name: docs[0].name,
            score: docs[0].score,
          });
        } else {
          res.status(500).json({
            message: "User not found",
            reason: "scoreHandler1",
          });
        }
      })
      .catch((err) =>
        // console.log(`Error getting the all users from DB: ${err}`)
        res.status(500).json({
          error: err,
          reason: "scoreHandler",
        })
      );
  },

  // Update HighScore
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
        })
      )
      .catch((err) =>
        // console.log(`Error getting the all users from DB: ${err}`)
        res.status(500).json({
          error: err,
          reason: "addNewHighScore",
        })
      );
  },

  // User Login
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
              // console.log(`result`, result);
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
        // console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  },
};
