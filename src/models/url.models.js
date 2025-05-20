import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const urlScehema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Please provide a username"],
      enum: ["test", "live"],
      unique: true,
    },
  },
  { timestamps: true }
);

const Url = mongoose.models.Url || mongoose.model("Url", urlScehema);

export default Url;
