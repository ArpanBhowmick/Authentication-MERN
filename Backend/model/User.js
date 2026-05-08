import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    roles: {
      type: [Number],
      default: [2001], // every user is at least a normal user
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
