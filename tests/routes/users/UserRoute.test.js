const request = require("supertest");
const app = require("../../../src/server");

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
