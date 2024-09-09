const request = require("supertest");
const app = require("../../../src/server");
const UserModel = require("../../../src/database/models/UserModel");

describe("GET /v1/user/byId", () => {
  test("Test /byId users route", async () => {
    const response = await request(app)
      .get("/v1/user/byId")
      .expect("Content-Type", /json/)
      .expect(200);

    const myUsers = response.body;
    const myFirstUser = myUsers[0];

    expect(myFirstUser.id).toEqual(1);
    expect(myUsers.length).toBeGreaterThan(0);
  });
});

test("Test Delete Object", async () => {
  const response = await request(app)
    .delete(`/v1/users/delete`)
    .send({
      userId: 2,
    })
    .expect("Content-Type", /json/)
    .expect(200);
  const deletedUserId = response.body.deletedUserId;
  expect(deletedUserId).toBe(2);

  // Abfragen von dem User direkt aus der DB
  const deletedUser = await UserModel.findOne({ where: { id: 2 } });
  expect(deletedUser).toEqual(null);
});
