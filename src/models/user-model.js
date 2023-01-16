import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
});

export default model("User", userSchema);
