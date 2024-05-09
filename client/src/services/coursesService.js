const getAllCourse = async () => {
    const res = await fetch("/api/courses/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    console.log(data);
    return data
 
};
