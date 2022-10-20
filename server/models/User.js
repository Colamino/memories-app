import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,

    googleId: String,
  },
  { timestamps: true }
);

userSchema.plugin(findOrCreate);

export const User = mongoose.model("User", userSchema);
