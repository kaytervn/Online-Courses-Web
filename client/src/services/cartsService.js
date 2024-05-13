
const getCart = async () => {
  try {

    const res = await fetch("/api/carts/getCart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bear ${localStorage.getItem("token")}`,
      },
    });
    const cartData = await res.json();

  
    const cartItems = cartData.cartItems;

  
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


    const courseDetails = await Promise.all(courseDetailsPromises);

    // Trả về đối tượng chứa cả cartItems và courseDetails
    return { cartItems, courseDetails };
  } catch (error) {
    console.error("Error fetching cart data: ", error);
    throw error; 
  }
};




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
    
      return true; 
    } else {
      throw new Error(data.error || "Failed to remove item from cart.");
    }
  } catch (error) {
    console.error("Error removing from cart:", error.message);
    return false; // indicate failure
  }
};

const addToCart = async (courseId) => {
  const cartId = localStorage.getItem("cartId");
  const response = await fetch(`/api/carts/addToCart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ courseId, cartId }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Không thể thêm vào giỏ hàng.");
  }
  console.log(data);
  return data;
};



export { getCart, removeFromCart, addToCart };
