import mongoose from "mongoose";

const { Schema, model } = mongoose;

const roleSchema = new Schema({
  value: { type: String, unique: true },
});

// Roles:
// await Role.create({ value: "USER" });
// await Role.create({ value: "ADMIN" });

export default model("Role", roleSchema);
