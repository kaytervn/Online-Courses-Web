import mongoose from "mongoose";
import Role from "./RoleEnum";

const UserSchema = new mongoose.Schema(
  {
    cloudinary: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Role,
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
