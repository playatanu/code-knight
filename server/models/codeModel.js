import { Schema, models, model } from "mongoose";

const codeSchemma = new Schema(
  {
    title: { type: String, require: true, default: "" },
    dec: { type: String, require: true, default: "" },
    code: { type: String, require: false, default: "" },
    input: { type: String, require: false, default: "" },
    len: { type: String, require: false, default: "c" },
    stars: { type: Array, default: [] },
    username: { type: String, require: true },
  },
  { timestamps: true }
);

export default models.Code || model("Code", codeSchemma);
