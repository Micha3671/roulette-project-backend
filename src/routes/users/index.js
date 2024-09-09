const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const UserModel = require("../../database/models/UserModel");

const UserRouter = Router();

// GET REQUESTS
// /v1/todos/bytodoid
UserRouter.get("/byid", async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const user = await UserModel.findOne({
    where: { id: userId },
  });

  res.status(StatusCodes.OK).json({ user });
});

UserRouter.post("/create", async (req, res) => {
  const { newUserName, newEmail, newPassword, newAge } = req.body;

  console.log("Here we are", newUserName, newEmail, newPassword, newAge);
  if (!newUserName || !newEmail || !newPassword || !newAge) {
    throw ReferenceError("One of my required Parameters is not defined");
  }

  const newUser = {
    userName: newUserName,
    email: newEmail,
    password: newPassword,
    age: newAge,
  };

  const user = await UserModel.create(newUser);

  res.status(StatusCodes.OK).json({ user: user });
});

// DELETE REQUEST
UserRouter.delete("/delete", async (req, res) => {
  const { userId } = req.body; //req.body.todoId

  await UserModel.destroy({ where: { id: userId } });

  res.status(StatusCodes.OK).json({ deletedUserId: userId });
});

module.exports = { UserRouter };
