const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const HighscoreModel = require("../../database/models/HighscoreModel");

const HighscoresRouter = Router();

// GET REQUESTS
// /v1/todos/bytodoid
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

// Alle Todos von einer UserId
HighscoresRouter.get("/byuserid", async (req, res) => {
  // const userId = req.body.userId;
  // const userId = parseInt(req.query.userId);
  const userId = req.query.userId;

  if (!userId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(ReasonPhrases.BAD_REQUEST + " Keine userID");
    return;
  }

  const userHighscores = await HighscoreModel.findAll({ where: { userId } });

  res.status(StatusCodes.OK).json({ highscores: userHighscores });
});

HighscoresRouter.get("/all", async (req, res) => {
  const highscores = await HighscoreModel.findAll();
  res.status(StatusCodes.OK).send(highscores);
});

HighscoresRouter.put("/update", async (req, res) => {
  const { highscoreId, newHighscore, newGameId } = req.body;

  await HighscoreModel.update(
    {
      highscore: newHighscore,
      gameId: newGameId,
    },
    { where: { id: highscoreId } },
  );

  res.status(StatusCodes.OK).json({ updatedHighscoreId: highscoreId });
});

// POST REQUESTS
HighscoresRouter.post("/create", async (req, res) => {
  const { newHighscore, newGameId, newUserId } = req.body;

  console.log("Here we are", newHighscore, newGameId, newUserId);
  if (!newHighscore || !newGameId || !newUserId) {
    throw ReferenceError("One of my required Parameters is not defined");
  }

  const newScore = {
    highscore: newHighscore,
    gameId: newGameId,
    userId: newUserId,
  };

  const highscore = await HighscoreModel.create(newScore);

  res.status(StatusCodes.OK).json({ highscore: highscore });
});

module.exports = { HighscoresRouter };
