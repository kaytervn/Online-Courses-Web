import Comment from "../models/CommentModel.js";
import User from "../models/UserModel.js";

const getLessonComments = async (req, res) => {
  const { lessonId } = req.body;
  try {
    const comments = await Comment.find({
      lessonId: lessonId,
    }).sort({
      createdAt: "desc",
    });
    res.status(200).json({ comments, lessonId });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createComment = async (req, res) => {
  const { lessonId, parentId, content } = req.body;

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    return res.status(400).json({ error: "Lesson Not Found" });
  }

  if (parentId) {
    const parentComment = await Comment.findById(parentId);
    if (!parentComment) {
      return res.status(400).json({ error: "Parent Comment Not Found" });
    }
  }

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  const user = await User.findById(req.user._id);
  try {
    const comment = await Comment.create({
      lessonId: lesson._id,
      userId: user._id,
      content,
      parentId,
    });
    return res.status(200).json({ comment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { getLessonComments, createComment };
