const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const HighscoreModel = require("../../database/models/HighscoreModel");

const HighscoresRouter = Router();

// GET REQUESTS
// /v1/highscores/byid
HighscoresRouter.get("/byid", async (req, res) => {
  const highscoreId = req.query.highscoreId;
  if (!highscoreId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const highscore = await HighscoreModel.findOne({
    where: { id: highscoreId },
  });

  res.status(StatusCodes.OK).json({ highscore });
});

// Alle Highscores von einer UserId
HighscoresRouter.get("/byusername", async (req, res) => {
  const userName = req.query.userName;

  if (!userName) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(ReasonPhrases.BAD_REQUEST + " Keine userName");
    return;
  }

  const userHighscores = await HighscoreModel.findAll({ where: { userName } });

  res.status(StatusCodes.OK).json({ highscores: userHighscores });
});

// GET Top 5 Highscores of a user of a game
HighscoresRouter.get("/update", async (req, res) => {
  const userName = req.query.userName;
  const gameId = req.query.gameId;
  if (!userName || !gameId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(ReasonPhrases.BAD_REQUEST + " Kein userName oder keine gameId");
    return;
  }

  const userTop5 = await HighscoreModel.findAll({
    where: { userName, gameId },
    limit: 5,
    order: [["highscore", "DESC"]],
  });
  console.log(userTop5);
  res.status(StatusCodes.OK).json(userTop5);
});

HighscoresRouter.get("/all", async (req, res) => {
  const highscores = await HighscoreModel.findAll();
  res.status(StatusCodes.OK).send(highscores);
});

// POST REQUESTS
HighscoresRouter.post("/create", async (req, res) => {
  const { newHighscore, newGameId, newUserName } = req.body;

  console.log("Here we are", newHighscore, newGameId, newUserName);
  if (!newHighscore || !newGameId || !newUserName) {
    console.log("error log");
    throw ReferenceError("One of my required Parameters is not defined");
  }

  const newScore = {
    highscore: newHighscore,
    gameId: newGameId,
    userName: newUserName,
  };
  console.log("newScore log");

  const highscore = await HighscoreModel.create(newScore);

  res.status(StatusCodes.OK).json({ highscore: highscore });
});

module.exports = { HighscoresRouter };
