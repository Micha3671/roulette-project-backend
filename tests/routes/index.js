const { Router } = require("express");
const UserRouter = require("./users");
const AppRouter = Router();

AppRouter.use("/user", UserRouter);

module.exports = AppRouter;
