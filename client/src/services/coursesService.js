const searchUserCourses = async (keyword) => {
  const res = await fetch("/api/courses/search-user-courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bear ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ keyword }),
  });
  const { courses } = await res.json();
  return courses;
};

export { searchUserCourses };
