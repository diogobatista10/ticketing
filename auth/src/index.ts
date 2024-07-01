import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined!");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo Db");
  } catch (error) {
    console.log(error);
  }
};

start();

app.listen(3000, () => {
  console.log("Auth Service is Running on Port 3000!!!");
});
