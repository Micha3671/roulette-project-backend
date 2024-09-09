const request = require("supertest");
const app = require("../../../src/server");
const HighscoreModel = require("../../../src/database/models/HighscoreModel");
const { ReasonPhrases } = require("http-status-codes");

describe("GET /v1/highscores/all", () => {
  test("Test /all highscores route", async () => {
    const response = await request(app)
      .get("/v1/highscores/all")
      .expect("Content-Type", /json/)
      .expect(200);

    const myHighscores = response.body;
    const myFirstHighscore = myHighscores[0];

    expect(myHighscores.length).toBeGreaterThan(0);
    expect(myFirstHighscore.id).toBeDefined();
    expect(myFirstHighscore.userId).toBeDefined();
    expect(myFirstHighscore.gameId).toBeDefined();
  });

  test("GET by Id", async () => {
    const highscoreId = 1;
    const response = await request(app)
      .get(`/v1/highscores/byid`)
      .query({ highscoreId: highscoreId })
      .expect("Content-Type", /json/)
      .expect(200);

    const myHighscore = response.body.highscore;
    expect(myHighscore.id).toEqual(highscoreId);
    expect(myHighscore.gameId).toBeDefined();
  });

  test("GET by User  Id", async () => {
    const response = await request(app)
      .get(`/v1/highscores/byid`)
      .query({})
      .expect(400);

    expect(response.text).toEqual(ReasonPhrases.BAD_REQUEST);
  });

  test("GET by User Id", async () => {
    const userId = 1;
    const response = await request(app)
      .get(`/v1/highscores/byuserid`)
      .query({ userId })
      .expect("Content-Type", /json/)
      .expect(200);

    const myHighscores = response.body.highscores;
    const myFirstHighscore = myHighscores[0];

    expect(myHighscores.length).toBeGreaterThan(0);
    expect(myFirstHighscore.id).toBeDefined();
    expect(myFirstHighscore.userId).toBeDefined();
    expect(myFirstHighscore.gameId).toBeDefined();
  });

  test("GET by User  Id", async () => {
    const response = await request(app)
      .get(`/v1/highscores/byuserid`)
      .query({})
      .expect(400);

    expect(response.text).toEqual(ReasonPhrases.BAD_REQUEST + " Keine userID");
  });
});

describe("Test Mutations (PUT,POST, DELETE)", () => {
  test("Test Create Object", async () => {
    await request(app)
      .post(`/v1/highscores/create`)
      .send({
        newUserId: 2,
        newGameId: 5,
        newHighscore: 2500,
      })
      .expect("Content-Type", /json/)
      .expect(200);
  });

  test("Test Create Object", async () => {
    const response = await request(app)
      .put(`/v1/highscores/update`)
      .send({
        newHighscore: 15000,
        highscoreId: 1,
        gameId: 5,
      })
      .expect("Content-Type", /json/)
      .expect(200);
    const updatedHighscoreId = response.body.updatedHighscoreId;
    expect(updatedHighscoreId).toBe(1);

    // Abfragen vom Highscore direkt aus der DB
    const updatedHighscore = await HighscoreModel.findOne({ where: { id: 1 } });
    // Vergleich des upgedateten Highscores mit dem neuen Wert putzen
    expect(updatedHighscore.highscore).toEqual(15000);
  });
});
