const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const UserModel = require("../../database/models/UserModel");
const AccessTokens = require("../../services/auth/AccessToken");

const AuthRouter = Router();

// POST REQUESTS

AuthRouter.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const user = await UserModel.scope("allData").findOne({
    where: { userName },
  });

  if (user.password !== password) {
    res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    return;
  }
  user.password = null;

  const myToken = AccessTokens.createAccessToken(user.id);
  console.log(myToken);

  res.status(StatusCodes.OK).json({ user, tokens: { accessToken: myToken } });
});

AuthRouter.post("/signup", async (req, res) => {
  const { email, password, userName, dob } = req.body;
  if (!email || !password || !userName || !dob) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const user = await UserModel.create({
    email: email.toLowerCase().trim(),
    password,
    userName,
    dob,
  });
  user.password = null;
  const myToken = AccessTokens.createAccessToken(user.id);
  res.status(StatusCodes.OK).json({ user, tokens: { accessToken: myToken } });
});

AuthRouter.delete("/logout", async (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("Logout fehlgeschlagen");
      }
      res.clearCookie("sessionID");
      res.status(StatusCodes.OK).send("Logout erfolgreich");
    });
  } else {
    res.status(StatusCodes.OK).send("Keine aktive Sitzung zum Abmelden");
  }
});

module.exports = { AuthRouter };
