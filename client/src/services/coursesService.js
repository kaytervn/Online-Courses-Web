const searchUserCourses = async ({
  keyword,
  visibility,
  topic,
  page,
  sort,
}) => {
  const res = await fetch("/api/courses/search-user-courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bear ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ keyword, visibility, topic, page, sort }),
  });
  const data = await res.json();
  return data;
};

const searchCourses = async ({ keyword, topic, page, sort }) => {
  const res = await fetch("/api/courses/search-courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keyword, topic, page, sort }),
  });
  const data = await res.json();
  return data;
};

const getAllCourse = async () => {
  const res = await fetch("/api/courses/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

const getAllCourseAdmin = async () => {
  const res = await fetch("/api/courses/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const {courses} = await res.json();
  return courses;
};

const changeCourseVisibility = async (id) => {
  const res = await fetch(`/api/courses/change-course-visibility/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bear ${localStorage.getItem("token")}`,
    },
  });
  const data = await res.json();
  return data;
};

const changeCourseStatus = async (id) => {
  const res = await fetch(`/api/courses/change-course-status/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bear ${localStorage.getItem("token")}`,
    },
  });
  const data = await res.json();
  return data;
};


const createCourse = async (formData) => {
  const res = await fetch(`/api/courses/create-course`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bear ${localStorage.getItem("token")}`,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

export {
  searchUserCourses,
  getAllCourse,
  searchCourses,
  changeCourseVisibility,
  createCourse,
  changeCourseStatus,
  getAllCourseAdmin,
};
