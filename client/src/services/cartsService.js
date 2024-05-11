
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


// const addToCart = async (courseId, setNotification) => {
//   const cartId = localStorage.getItem("cartId")
//   console.log("Attempting to add to cart:", courseId, "Cart ID:", cartId);
//   try {
//     const response = await fetch(`/api/carts/addToCart`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({ courseId, cartId }),
//     });
//     const data = await response.json();
//     if (response.ok) {
//       setNotification({
//         message: "Thêm vào giỏ hàng thành công!",
//         type: "success"
//       });
//     } else {
//       throw new Error(data.message || "Không thể thêm vào giỏ hàng.");
//     }
//   } catch (error) {
//     setNotification({ message: error.toString(), type: "error" });
//     console.error("Error adding to cart:", error);
//   }
// };


const removeFromCart = async (cartId, courseId) => {
  try {
    const response = await fetch(
      `/api/carts/removeFromCart/${cartId}/${courseId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();
    if (response.ok) {
      console.log("Removed successfully:", data.message);
      // Optionally trigger a state update or re-fetch cart items
      return true; // indicate success
    } else {
      throw new Error(data.error || "Failed to remove item from cart.");
    }
  } catch (error) {
    console.error("Error removing from cart:", error.message);
    return false; // indicate failure
  }
};

// // Hàm này được sử dụng để xóa một khóa học khỏi giỏ hàng.
// const removeFromCart = async (cartId, courseId, setCartItems, setNotification) => {
//   try {
//     const response = await fetch(`/api/carts/removeFromCart/${cartId}/${courseId}`, {
//       method: "DELETE", // Phương thức DELETE được sử dụng cho yêu cầu xóa.
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`, // Thêm token xác thực người dùng.
//       },
//     });

//     const data = await response.json(); // Phân tích dữ liệu JSON trả về từ server.

//     if (response.ok) {
//       console.log("Removed successfully:", data.message); // Log thông báo thành công từ server.

//       // Cập nhật trạng thái giỏ hàng để loại bỏ mặt hàng đã xóa.
//       setCartItems(prevItems => prevItems.filter(item => item.course._id !== courseId));

//       // Cập nhật thông báo cho người dùng
//       setNotification({
//         message: "Xóa khóa học khỏi giỏ hàng thành công!",
//         type: "success"
//       });

//       return true; // Trả về true để chỉ ra rằng việc xóa đã thành công.
//     } else {
//       throw new Error(data.error || "Failed to remove item from cart."); // Ném lỗi nếu API trả về lỗi.
//     }
//   } catch (error) {
//     console.error("Error removing from cart:", error.message); // Log lỗi nếu có.
//     setNotification({ message: error.toString(), type: "error" }); // Cập nhật thông báo lỗi cho người dùng.
//     return false; // Trả về false để chỉ ra rằng việc xóa không thành công.
//   }
// };


export { getCart, removeFromCart};
