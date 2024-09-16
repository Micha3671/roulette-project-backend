const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const UserModel = require("../../database/models/UserModel");
const HighscoreModel = require("../../database/models/HighscoreModel");

const UserRouter = Router();

// GET REQUESTS
// /v1/users/byid
// !x-access-token in header!
UserRouter.get("/currentuser", async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const currentUser = await UserModel.findOne({
    where: { id: userId },
  });

  res.status(StatusCodes.OK).json({ currentUser });
});

UserRouter.get("/allusers", async (req, res) => {
  const allUsers = await UserModel.findAll();
  res.status(StatusCodes.OK).json(allUsers);
});

// DELETE REQUEST
UserRouter.delete("/delete", async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    res.status(StatusCodes.BAD_REQUEST).send("userID fehlt");
    return;
  }

  const deletedProfile = await UserModel.findOne({ where: { id: userId } });

  const deletedHighscores = await HighscoreModel.findAll({
    where: { userId: userId },
  });

  if (!deletedProfile) {
    res.status(StatusCodes.NOT_FOUND).send("Benutzerprofil nicht gefunden");
    return;
  }

  for (const highscore of deletedHighscores) {
    await highscore.destroy();
  }
  await deletedProfile.destroy();
  res
    .status(StatusCodes.OK)
    .json({ deletedUserId: userId, deletedHighscores: userId });
});

module.exports = { UserRouter };
