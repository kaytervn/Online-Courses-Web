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

// Instructor's courses
const getUserCourses = async (req, res) => {
  const user = await User.findById(req.user._id);

  try {
    const courses = await Course.find({ userId: user._id }).sort({
      createdAt: "desc",
    });

    res.status(200).json({ courses, email: user.email });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Instructor's courses
const searchUserCourses = async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    const { keyword } = req.body;
    let courses;
    if (!keyword || keyword.trim() == "") {
      courses = await Course.find({ userId: user._id }).sort({
        createdAt: "desc",
      });
    } else {
      courses = await Course.find({
        userId: user._id,
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      }).sort({ createdAt: "desc" });
    }
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const changeCourseVisibility = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(400).json({ error: "Course Not Found" });
  }

  const user = await User.findById(req.user._id);
  if (!course.userId.equals(user._id)) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    if (course.visibility == true) {
      await course.updateOne({ visibility: false });
    } else {
      await course.updateOne({ visibility: true });
    }
    return res.status(200).json({
      success: "Course Visibility Was Updated",
      visibility: course.visibility,
    });
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

const getNewestCourse = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBestSellerCourse = async (req, res) => {};

export {
  createCourse,
  getNewestCourse,
  getBestSellerCourse,
  getAllCourses,
  disableCourse,
  enableCourse,
  getUserCourses,
  searchUserCourses,
  changeCourseVisibility,
};
