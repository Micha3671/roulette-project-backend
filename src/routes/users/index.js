const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const AppData = require("../../temp/AppData");

const UserRouter = Router();

UserRouter.get("/byId", (req, res) => {
  res.status(StatusCodes.OK).json([AppData.User1]);
});

module.exports = UserRouter;
