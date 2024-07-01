import request from "supertest";

import { app } from "../../app";

it("should fetch a list of tickets", async () => {
  const ticketsMock = [
    { title: "concert", price: 20 },
    { title: "musical", price: 40 },
    { title: "football match", price: 50 },
  ];

  await ticketsMock.map(({ title, price }) =>
    request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({ title, price })
      .expect(201)
  );

  await request(app).get("/api/tickets").expect(201);
});
