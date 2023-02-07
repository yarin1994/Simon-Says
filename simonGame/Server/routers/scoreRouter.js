const { Router } = require("express");
const { scoreHandler } = require("../Api/scoreHandler");
const scoreRouter = new Router();

scoreRouter.get("/", scoreHandler.getHighestScore);
scoreRouter.post("/", scoreHandler.addNewHighScore);

module.exports = { scoreRouter };