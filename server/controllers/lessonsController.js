import Course from "../models/CourseModel.js";
import Lesson from "../models/LessonModel.js";

const getCourseLessons = async (req, res) => {
  const { courseId } = req.body;
  try {
    const lessons = await Lesson.find({ courseId: courseId }).sort({
      title: "desc",
    });

    res.status(200).json({ lessons, courseId });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { getCourseLessons };
