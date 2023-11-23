const app = require("../src/app.js");
const request = require("supertest");

const correctTestUserId = "655e134b7224c6321af38780";
const incorrectTestUserId = "655e134b7224c6321af38754";
const tooManyStreamsUserId = "655e15397224c6321af38785";

const testStreamId = "655e11a41050a63bbb6010a7";
const incorrectTestStreamId = "655e11a41050a63bbb602137";

describe("GET /users/stereams/:userId", () => {
  describe("successfull", () => {
    test("should respond with a 200 status code", async () => {
      const res = await request(app).get(`/users/streams/${correctTestUserId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("streams");
    });
  });

  describe("incorrect userId", () => {
    test("should respond with a 404 status code", async () => {
      const res = await request(app).get(
        `/users/streams/${incorrectTestUserId}`
      );
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("forbidden action", () => {
    test("should respond with a 403 status code", async () => {
      const res = await request(app).get(
        `/users/streams/${tooManyStreamsUserId}`
      );
      expect(res.statusCode).toEqual(403);
    });
  });
});

describe("successfully added stream", () => {
  test("should respond with a 200 status code", async () => {
    const res = await request(app)
      .patch(`/users/streams/${correctTestUserId}?type=add`)
      .send({
        streamId: testStreamId,
      });
    expect(res.statusCode).toEqual(200);
  });
});

describe("PATCH /users/streams/:userId", () => {
  describe("successfully deleted stream", () => {
    test("should respond with a 200 status code", async () => {
      const res = await request(app)
        .patch(`/users/streams/${correctTestUserId}?type=delete`)
        .send({
          streamId: testStreamId,
        });
      expect(res.statusCode).toEqual(200);
    });
  });

  describe("wrong query string", () => {
    test("should respond with a 422 status code", async () => {
      const res = await request(app)
        .patch(`/users/streams/${correctTestUserId}?type=wrong`)
        .send({
          streamId: testStreamId,
        });
      expect(res.statusCode).toEqual(422);
    });
  });

  describe("forbidden action", () => {
    test("should respond with a 403 status code", async () => {
      const res = await request(app)
        .patch(`/users/streams/${tooManyStreamsUserId}?type=add`)
        .send({
          streamId: testStreamId,
        });
      expect(res.statusCode).toEqual(403);
    });
  });

  describe("wrong userId", () => {
    test("should respond with a 404 status code", async () => {
      const res = await request(app)
        .patch(`/users/streams/${incorrectTestUserId}?type=add`)
        .send({
          streamId: testStreamId,
        });
      expect(res.statusCode).toEqual(404);
    });
  });

  describe("wrong streamId", () => {
    test("should respond with a 404 status code", async () => {
      const res = await request(app)
        .patch(`/users/streams/${correctTestUserId}?type=add`)
        .send({
          streamId: incorrectTestStreamId,
        });
      expect(res.statusCode).toEqual(422);
    });
  });
});
