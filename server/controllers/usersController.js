import User from "../models/UserModel.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import nodemailer from "nodemailer";
import { createCartForUser } from "./cartsController.js";

//***********************************************CREATE TOKEN************************** */
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10d" });
};

const getUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//***********************************************REGISTER USER************************** */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //check params user enter
  if (!email || !password || !name) {
    res.status(400).json({ error: "All fields are required!" });
  }

  // check email exist
  const user = await User.findOne({ email });

  if (user) {
    res.status(400).json({ error: "Email already existed!" });
  } else {
    try {
      //hash password
      const salt = await bcrypt.genSalt(); //default is 10 times
      const hashed = await bcrypt.hash(password, salt); //this is password after hashed

      const user = await User.create({ email, password: hashed, name });
      const cart = await createCartForUser(user._id);
      const token = createToken(user._id);
      res.status(200).json({ success: "Register successful!", user, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

//***********************************************LOGIN USER************************** */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //check email, password fields
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  //check email exist in DB
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "Incorrect email!" });
  }

  const token = createToken(user._id);
  //encrypt hash password
  // check password
  const match = await bcrypt.compare(password, user.password);

  // const passwordCheck = await User.findOne({compare})
  if (!match) {
    return res.status(400).json({ error: "Password is incorrect!" });
  }

  try {
    return res.status(200).json({ email, token, role: user.role });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//***********************************************FORGOT PASSWORD************************** */
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  //check email, password fields
  if (!email) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  //check email exist in DB
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(500).json({ error: "Incorrect email!" });
  } else {
    try {
      const token = jwt.sign({ _id: user._id }, `${process.env.SECRET}`, {
        expiresIn: "1d",
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      var mailOptions = {
        from: `COOKIEDU 🍪​" <${process.env.EMAIL_USER}>`, // email that send
        to: `${email}`,
        subject: "Reset Your Password",
        text: `http://localhost:3000/reset-password/${user._id}/${token}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.status(500).json({ error: error.message });
        } else {
          return res.status(200).json({ success: "Email sent!" });
        }
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

//***********************************************RESET PASSWORD************************** */

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, `${process.env.SECRET}`, async (err, decoded) => {
    if (err || decoded._id !== id) {
      return res.json({ error: "Invalid token!" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((result) =>
              res.send({ Status: "Password reset successfully!" })
            )
            .catch((error) => res.json({ Status: error }));
        })
        .catch((error) => res.json({ Status: error }));
    }
  });
};

//***********************************************GET ALL USER BY ROLE************************** */
const getUserListByRole = async (req, res) => {
  const role = req.params.role;

  const users = await User.find({ role });
  const userAuth = await User.findById(req.user._id);
  if (!(userAuth.role == "ADMIN") || role == "ADMIN") {
    return res.status(401).json({ error: "Not authorized" });
  }
  try {
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//***********************************************Change status USER************************* */
const changeUserStatus = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json({ error: "User Not Found" });
  }

  const userAuth = await User.findById(req.user._id);
  if (!(userAuth.role == "ADMIN") || user.role == "ADMIN") {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    if (user.status == true) {
      await user.updateOne({ status: false });
    } else {
      await user.updateOne({ status: true });
    }
    return res.status(200).json({
      success: "User status Was Updated",
      status: user.status,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//***********************************************Get USER by Another one************************* */
const getUserByOther = async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUser,
  getUserListByRole,
  changeUserStatus,
  getUserByOther,
};

// const getUser = async (req, res) => {
//   const user = await User.findById(req.user._id);
//   try {
//     return res.status(200).json({ user });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
