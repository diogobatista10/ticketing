import mongoose from "mongoose";
import request from "supertest";

import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";

it("should returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", signin())
    .send({ title: "aiodsoad", price: 20 })
    .expect(404);
});

it("should returns a 401 if the user is not authenticated", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title: "Test Title", price: 10 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .send({ title: "aiodsoad", price: 20 })
    .expect(401);
});

it("should returns a 401 if the user is not the owner of the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title: "Test Title", price: 10 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", signin())
    .send({ title: "aiodsoad", price: 20 })
    .expect(401);
});

it("should returns a 400 if the user provides an invalid title or price", async () => {
  const user = signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", user)
    .send({ title: "Test Title", price: 10 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", user)
    .send({ title: "", price: 20 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", user)
    .send({ title: "Test Title", price: -20 })
    .expect(400);
});

it("should updates the ticket when provided valid props", async () => {
  const user = signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", user)
    .send({ title: "Test Title", price: 10 })
    .expect(201);

  const updatedResponsePrice = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", user)
    .send({ title: "Test Title", price: 20 })
    .expect(200);

  expect(updatedResponsePrice.body.price).toEqual(20);

  const updatedResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", user)
    .send({ title: "Test Title 2", price: 20 })
    .expect(200);

  expect(updatedResponse.body.title).toEqual("Test Title 2");
});

it("should publish an event", async () => {
  const user = signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", user)
    .send({ title: "Test Title", price: 10 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", user)
    .send({ title: "Test Title", price: 20 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
