const getCourseLessons = async (courseId) => {
  const res = await fetch("/api/lessons/get-course-lessons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ courseId }),
  });
  const { lessons } = await res.json();
  return lessons;
};

const createLesson = async ({ courseId, title, description }) => {
  const res = await fetch("/api/lessons/create-lesson", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bear ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ courseId, title, description }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

export { getCourseLessons, createLesson };
