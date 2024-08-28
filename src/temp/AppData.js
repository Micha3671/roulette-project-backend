const User1 = {
  id: 1,
  userId: 1,
  userName: "Max Mustermann",
  eMail: "max@mustermann.de",
  passWord: "Max123",
  highScoreSlots: 46000,
  highScoreJack: 5000,
  highScoreRoulette: 20000,
};

const User2 = {
  id: 2,
  userId: 2,
  userName: "Maxine Mustermann",
  eMail: "maxine@mustermann.de",
  passWord: "Maxine456",
  highScoreSlots: 39000,
  highScoreJack: 9000,
  highScoreRoulette: 2000,
};

const AllUsers = [User1, User2];

module.exports = { User1, User2, AllUsers };
