import Course from "../models/CourseModel.js";
import { mongoose } from "mongoose";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/UserModel.js";

const createCourse = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { title, price, description } = req.body;
  if (!title || !price || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const uploadResponse = await new Promise((resolve, reject) => {
      const bufferData = req.file.buffer;
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(bufferData);
    });
    const user = await User.findById(req.user._id);
    const course = await Course.create({
      userId: user._id,
      cloudinary: uploadResponse.public_id,
      picture: uploadResponse.secure_url,
      title,
      price,
      description,
    });
    return res.status(200).json({ course });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { createCourse };


//***********************************************GET ALL COURSE************************** */
const getAllCourse = async (req, res) => {
  
  const users = await User.find({ role });

  try {
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};