import mongoose from "mongoose";

import { app } from "./app";
import { ExpirationCompletedListener } from "./events/listeners/expiration-completed-listener";
import { PaymentCreatedListener } from "./events/listeners/payment-created-listener";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  const { JWT_KEY, MONGO_URI, NATS_CLUSTER_ID, NATS_URL, NATS_CLIENT_ID } =
    process.env;

  if (!JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }

  if (!MONGO_URI) {
    throw new Error("MONGO_URI must be defined!");
  }

  if (!NATS_CLUSTER_ID || !NATS_URL || !NATS_CLIENT_ID) {
    throw new Error("NATS_URL, NATS_CLUSTER_ID and NATS_URL must be defined!");
  }

  try {
    await natsWrapper.connect(NATS_CLUSTER_ID, NATS_CLIENT_ID, NATS_URL);
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await new TicketCreatedListener(natsWrapper.client).listen();
    await new TicketUpdatedListener(natsWrapper.client).listen();
    await new ExpirationCompletedListener(natsWrapper.client).listen();
    await new PaymentCreatedListener(natsWrapper.client).listen();

    await mongoose.connect(MONGO_URI);
    console.log("Connected to Mongo Db");
  } catch (error) {
    console.log(error);
  }
};

start();

app.listen(3000, () => {
  console.log("Listening on port 3000!!");
});
