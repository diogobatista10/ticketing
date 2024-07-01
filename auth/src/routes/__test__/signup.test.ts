import request from "supertest";
import { app } from "../../app";

it("should return a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "email@test.com", password: "password" })
    .expect(201);
});

it("should return a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "email", password: "password" })
    .expect(400);
});

it("should return a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "email@test.com", password: "pas" })
    .expect(400);
});

it("should return a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ password: "pass" })
    .expect(400);

  return request(app)
    .post("/api/users/signup")
    .send({ email: "email@test.com" })
    .expect(400);
});

it("dissalows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "email@test.com", password: "password" })
    .expect(201);

  return request(app)
    .post("/api/users/signup")
    .send({ email: "email@test.com", password: "password" })
    .expect(400);
});

it("sets a cookie after sucessfull signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "email@test.com", password: "password" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
