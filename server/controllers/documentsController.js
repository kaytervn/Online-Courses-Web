import Course from "../models/CourseModel.js";
import Document from "../models/DocumentModel.js";
import DocumentType from "../models/DocumentTypeEnum.js";
import Lesson from "../models/LessonModel.js";

const getLessonDocuments = async (req, res) => {
  const { lessonId } = req.body;
  try {
    const documents = await Document.find({
      lessonId: lessonId,
    }).sort({
      title: "desc",
    });
    res.status(200).json({ documents, lessonId });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const { title, type, description, lessonId } = req.body;

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    return res.status(400).json({ error: "Lesson Not Found" });
  }

  if (!title || !(type in DocumentType) || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  let resourceType;
  if (type == DocumentType.VDIEO) {
    resourceType = "video";
  } else {
    resourceType = "raw";
  }

  const course = await Course.findById(lesson.courseId);
  const user = await User.findById(req.user._id);
  if (!(course.userId.equals(user._id) && user.role == Role.INSTRUCTOR)) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const uploadResponse = await new Promise((resolve, reject) => {
      const bufferData = req.file.buffer;
      cloudinary.uploader
        .upload_stream({ resource_type: resourceType }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(bufferData);
    });
    const document = await Document.create({
      lessonId: lesson._id,
      cloudinary: uploadResponse.public_id,
      content: uploadResponse.secure_url,
      title,
      type,
      description,
    });
    return res.status(200).json({ document });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { getLessonDocuments, createDocument };
