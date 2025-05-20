import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const appVersionSchema = new mongoose.Schema(
  {
    version: {
      type: String,
      required: [true, "Please provide a app version"],
      unique: true,
    },
  },
  { timestamps: true }
);

const AppVersion =
  mongoose.models.AppVersion || new mongoose.model("AppVersion", appVersionSchema);

export default AppVersion;
