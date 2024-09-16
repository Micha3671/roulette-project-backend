const { Router } = require("express");
const { HighscoresRouter } = require("./highscores");
const { AuthRouter } = require("./auth");
const { UserRouter } = require("./users");
const authMiddleWare = require("../middlewares/authMiddleware");

const AppRouter = Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use("/users", authMiddleWare, UserRouter);
AppRouter.use("/highscores", HighscoresRouter);

module.exports = AppRouter;
