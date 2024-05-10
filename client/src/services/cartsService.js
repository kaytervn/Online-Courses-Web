const getCart = async () => {
  try {
    // Gọi API để lấy thông tin giỏ hàng
    const res = await fetch("/api/carts/getCart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bear ${localStorage.getItem("token")}`,
      },
    });
    const cartData = await res.json();

    // Lấy danh sách cartItems từ dữ liệu nhận được
    const cartItems = cartData.cartItems;

    // Lặp qua từng cartItem để gọi API lấy chi tiết khóa học từ courseId
    const courseDetailsPromises = cartItems.map(async (item) => {
      const courseId = item.courseId;
      const courseRes = await fetch(`/api/courses/get_course/${courseId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bear ${localStorage.getItem("token")}`,
        },
      });
      const courseData = await courseRes.json();
      return courseData;
    });

    // Chờ cho tất cả các cuộc gọi API lấy chi tiết khóa học hoàn thành
    const courseDetails = await Promise.all(courseDetailsPromises);

    // Trả về đối tượng chứa cả cartItems và courseDetails
    return { cartItems, courseDetails };
  } catch (error) {
    console.error("Error fetching cart data: ", error);
    throw error; // Throw lỗi để xử lý ngoại lệ ở nơi gọi hàm này nếu cần
  }
};

// const addToCart = async ()=>{
//     try
// }

export { getCart };
