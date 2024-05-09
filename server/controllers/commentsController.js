import Comment from "../models/CommentModel.js";

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
export { getLessonComments };
