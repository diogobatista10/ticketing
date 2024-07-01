import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  const { NATS_CLUSTER_ID, NATS_URL, NATS_CLIENT_ID } = process.env;

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

    new OrderCreatedListener(natsWrapper.client).listen();
  } catch (error) {
    console.log(error);
  }
};

start();
