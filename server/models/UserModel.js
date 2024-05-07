import mongoose from "mongoose";
import Role from "./RoleEnum.js";

const UserSchema = new mongoose.Schema(
  {
    cloudinary: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    status: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
