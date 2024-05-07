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


//***********************************************GET ALL COURSE************************** */
const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  try {
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//***********************************************DISABLE COURSE************************* */
const disableCourse = async (req, res) => {
  const { id } = req.params;
  await Course.findByIdAndUpdate({ _id: id }, { status: false });
  try {
    return res.status(200).json({ success: "Course is disabled!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//***********************************************Enable COURSE************************* */
const enableCourse = async (req, res) => {
  const { id } = req.params;
  await Course.findByIdAndUpdate({ _id: id }, { status: true });
  try {
    return res.status(200).json({ success: "Course is enable!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getNewestCourse = async(req, res) =>{
  try {
      const courses = await Course.find().sort({createdAt: -1}).limit(5);
      res.status(200).json({courses})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

const getBestSellerCourse = async(req, res)=>{

}
export { createCourse , getNewestCourse, getBestSellerCourse, getAllCourses, disableCourse, enableCourse};

