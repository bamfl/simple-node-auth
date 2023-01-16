import mongoose from "mongoose";

const { Schema, model } = mongoose;

const movieSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  year: { type: String, required: true },
  runtime: { type: String, required: true },
  genres: [{ type: String, required: true }],
  director: { type: String, required: true },
  actors: { type: String, required: true },
  plot: { type: String, required: true },
  posterUrl: { type: String, required: true },
});

export default model("Movie", movieSchema);