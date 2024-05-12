import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CourseIntroView from "../../Components/CourseIntroView";
import AnimatedProgressBar from "../../Components/AnimatedProgressBar";
import { MyAlert } from "../../Components/CustomAlert";
import DocumentCard from "../../Components/DocumentCard";
import { getCourse } from "../../services/coursesService";
import {
  deleteDocument,
  getLessonDocuments,
} from "../../services/documentService";
import { getLessonComments } from "../../services/commentService";
import CommentCard from "../../Components/CommentCard";

const UpdateLessonDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const [alert, setAlert] = useState({
    message: "",
    variant: "",
  });
  const [formData, setFormData] = useState({
    _id: "",
    userId: "",
    picture: "",
    title: "",
    price: "",
    description: "",
    topic: "",
    instructorName: "",
    averageStars: "",
    documents: [],
    commnets: [],
  });

  const [formLesson] = useState({
    _id: state._id,
    courseId: state.courseId,
    title: state.title,
    description: state.description,
    createdAt: state.createdAt,
  });

  useEffect(() => {
    setTimeout(async () => {
      try {
        const { course, averageStars } = await getCourse(state.courseId);
        const documents = await getLessonDocuments(state._id);
        const comments = await getLessonComments(state._id);
        setFormData({
          ...formData,
          _id: course._id,
          userId: course.userId,
          picture: course.picture,
          title: course.title,
          price: course.price,
          description: course.description,
          topic: course.topic,
          instructorName: course.instructorName,
          averageStars: averageStars,
          documents,
          comments,
        });
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    }, 0);
  }, []);

  const handleDeleteDocument = async (_id) => {
    if (confirm("Confirm delete document?")) {
      try {
        const data = await deleteDocument(_id);
        setAlert({ ...alert, message: data.success, variant: "success" });
        const newDocuments = formData.documents.filter(
          (document) => document._id != _id
        );
        setFormData({ ...formData, documents: newDocuments });
      } catch (error) {
        setAlert({ ...alert, message: error.message, variant: "danger" });
      }
    }
    setTimeout(() => setAlert({ ...alert, message: "", variant: "" }), 2000);
  };

  return (
    <>
      {loading ? (
        <div className="container pt-5">
          <AnimatedProgressBar />
        </div>
      ) : (
        <>
          <CourseIntroView formData={formData}>
            <Link to="/create-document" state={formLesson}>
              <button className="btn btn-success me-2">
                ​📑​​ Create Document
              </button>
            </Link>
            <Link to="/create-comment" state={formLesson}>
              <button className="btn btn-primary">
                <i className="bi bi-chat-left-dots-fill"></i> Leave Comment
              </button>
            </Link>
          </CourseIntroView>
          <section className="bg-primary text-light p-5">
            <div className="container">
              <div className="d-flex justify-content-between">
                <p className="fs-3">{formLesson.title}</p>
                <p className="fs-5">
                  {new Date(formLesson.createdAt).toLocaleDateString()}
                </p>
              </div>
              {formLesson.description}
            </div>
          </section>
          <section className="p-5">
            <div className="container">
              <div className="row">
                <div className="col-8">
                  {formData.documents.length === 0 ? (
                    <p className="fs-2 text-center text-danger">
                      No document created.
                    </p>
                  ) : (
                    <>
                      {alert.message != "" && (
                        <MyAlert msg={alert.message} variant={alert.variant} />
                      )}
                      {formData.documents.map((document) => (
                        <div key={document._id}>
                          <DocumentCard document={document}>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteDocument(document._id)}
                            >
                              <i className="bi bi-trash-fill"></i>
                            </button>
                          </DocumentCard>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <div className="col-4">
                  {formData.comments.length === 0 ? (
                    <p className="fs-2 text-center text-danger">No comment.</p>
                  ) : (
                    <>
                      {alert.message != "" && (
                        <MyAlert msg={alert.message} variant={alert.variant} />
                      )}
                      {formData.comments.map((comment) => (
                        <div key={comment._id}>
                          <CommentCard comment={comment}>
                            <div className="text-end">
                              <Link to="/create-reply-comment" state={comment}>
                                <button className="btn btn-primary">
                                  Reply <i className="bi bi-reply-fill"></i>
                                </button>
                              </Link>
                            </div>
                          </CommentCard>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default UpdateLessonDetails;
