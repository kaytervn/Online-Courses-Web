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
  console.log(data);
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

export { searchUserCourses, getAllCourse, searchCourses };
