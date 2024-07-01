import request from "supertest";
import { app } from "../../app";

it("should fail when an email that does not exist is supplied", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({ email: "email@test.com", password: "password" })
    .expect(400);
});

it("should fail when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "email@test.com", password: "password" })
    .expect(201);

  return request(app)
    .post("/api/users/signin")
    .send({ email: "email@test.com", password: "dasdjaspoda" })
    .expect(400);
});

it("should responds with a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "email@test.com", password: "password" })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "email@test.com", password: "password" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
