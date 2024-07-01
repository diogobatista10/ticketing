import request from "supertest";
import { app } from "../../app";

it("should return a 200 on successful signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "email@test.com", password: "password" })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "email@test.com", password: "password" })
    .expect(200);

  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  expect(response.get("Set-Cookie")).toEqual([
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly",
  ]);
});