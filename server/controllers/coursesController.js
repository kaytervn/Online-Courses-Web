import Course from "../models/CourseModel.js";
import { mongoose } from "mongoose";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/UserModel.js";
import Role from "../models/RoleEnum.js";
import Topic from "../models/TopicEnum.js";

const createCourse = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const { title, price, description, topic } = req.body;
  if (!title || !price || !description || !(topic in Topic)) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const user = await User.findById(req.user._id);
  if (!(user.role == Role.INSTRUCTOR)) {
    return res.status(401).json({ error: "Not authorized" });
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
    const course = await Course.create({
      userId: user._id,
      cloudinary: uploadResponse.public_id,
      picture: uploadResponse.secure_url,
      title,
      price,
      topic,
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
    const courses = await Course.find({
      userId: user._id,
      status: true,
    }).sort({
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
  const { keyword, visibility, topic, page, sort } = req.body;
  const limit = 6;
  let query = {
    userId: user._id,
    status: true,
  };

  if (keyword.trim() !== "") {
    query.$or = [
      { title: { $regex: keyword.trim(), $options: "i" } },
      { description: { $regex: keyword.trim(), $options: "i" } },
    ];
  }

  if (visibility != "ALL") {
    query.visibility = visibility;
  }

  if (topic in Topic) {
    query.topic = topic;
  }

  try {
    const totalCount = await Course.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);
    const skip = (page - 1) * limit;

    let courses = await Course.find(query).skip(skip).limit(limit);

    if (sort === "title") {
      courses = await Course.find(query)
        .sort({ title: 1 })
        .skip(skip)
        .limit(limit);
    } else {
      courses = await Course.find(query)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    return res.status(200).json({ courses, totalPages });
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
  if (
    !(
      (course.userId.equals(user._id) && user.role == Role.INSTRUCTOR) ||
      user.role == Role.ADMIN
    )
  ) {
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

const updateCourseIntro = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  const { title, price, description } = req.body;
  if (!title || !price || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const user = await User.findById(req.user._id);
  if (!(course.userId.equals(user._id) && user.role == Role.INSTRUCTOR)) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    if (req.file && course.cloudinary) {
      await cloudinary.uploader.destroy(course.cloudinary);
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
      await course.updateOne({
        picture: uploadResponse.secure_url,
        cloudinary: uploadResponse.public_id,
      });
    }
    await course.updateOne({
      title,
      price,
      description,
    });

    return res.status(200).json({ success: "Course updated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(400).json({ error: "Course Not Found" });
  }

  const user = await User.findById(req.user._id);
  if (!(course.userId.equals(user._id) && user.role == Role.INSTRUCTOR)) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    await course.updateOne({ status: false });
    return res.status(200).json({
      success: "Course safely deleted",
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

const getNewestCourse = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBestSellerCourse = async (req, res) => {};

const findCourse = async (req, res) => {
  const nameCourse = req.params.str;

  try {
    const course = await Course.find({
      title: { $regex: nameCourse, $options: "i" },
    });

    if (!course) {
      return res.status(404).json({ message: "Không tìm thấy khóa học" });
    }

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourse = async (req, res) => {
  const courseId = req.params.id; // Lấy ID của khóa học từ params

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Khóa học không tồn tại." });
    }
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changeCourseStatus = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }

  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(400).json({ error: "Course Not Found" });
  }

  const user = await User.findById(req.user._id);
  if (
    !(
      (course.userId.equals(user._id) && user.role == Role.INSTRUCTOR) ||
      user.role == Role.ADMIN
    )
  ) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    if (course.status == true) {
      await course.updateOne({ status: false });
    } else {
      await course.updateOne({ status: true });
    }
    return res.status(200).json({
      success: "Course Status Was Updated",
      status: course.status,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export {
  createCourse,
  getNewestCourse,
  getBestSellerCourse,
  getAllCourses,
  getUserCourses,
  searchUserCourses,
  changeCourseVisibility,
  changeCourseStatus,
  findCourse,
  updateCourseIntro,
  deleteCourse,
  getCourse,
};
