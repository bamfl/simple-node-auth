import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import movieRouter from "./src/routers/movie-router.js";
import authRouter from "./src/routers/auth-router.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(authRouter);
app.use(movieRouter);

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
