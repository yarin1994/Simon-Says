const { Router } = require("express");
const { scoreHandler } = require("../Api/scoreHandler");
const scoreRouter = new Router();

scoreRouter.get("/", scoreHandler.getHighestScore);
scoreRouter.put("/", scoreHandler.addNewHighScore);
scoreRouter.post("/login", scoreHandler.userLogin);


module.exports = { scoreRouter };