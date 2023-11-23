const app = require("../src/app.js");
const request = require("supertest");

const goodTestUserId = "655e134b7224c6321af38780";
const badTestUserId = "655e134b7224c6321af38754";
const tooManyStreamsUserId = "655e15397224c6321af38785";

describe("GET /users/stereams/:userId", () => {
  describe("successfull", () => {
    test("should respond with a 200 status code", async () => {
      const res = await request(app).get(`/users/streams/${goodTestUserId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("streams");
    });
  });
});

describe("GET /users/stereams/:userId", () => {
  describe("incorrect userId", () => {
    test("should respond with a 404 status code", async () => {
      const res = await request(app).get(`/users/streams/${badTestUserId}`);
      expect(res.statusCode).toEqual(404);
    });
  });
});

describe("GET /users/stereams/:userId", () => {
  describe("incorrect userId", () => {
    test("should respond with a 404 status code", async () => {
      const res = await request(app).get(
        `/users/streams/${tooManyStreamsUserId}`
      );
      expect(res.statusCode).toEqual(403);
    });
  });
});
