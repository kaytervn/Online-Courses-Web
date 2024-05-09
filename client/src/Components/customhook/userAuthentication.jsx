// import { useState, useEffect } from "react";

// // function userAuthentication() {
// //   const [user, setUser] = useState(null);

// //   useEffect(() => {
// //     const getUser = () => {
// //       fetch("http://localhost:5000/auth/login/success", {
// //         method: "GET",
// //         credentials: "include",
// //         headers: {
// //           Accept: "application/json",
// //           "Content-Type": "application/json",
// //           "Access-Control-Allow-Credentials": true,
// //         },
// //       })
// //         .then((response) => {
// //           if (response.status === 200) return response.json();
// //           throw new Error("authentication has been failed!");
// //         })
// //         .then((resObject) => {
// //           setUser(resObject.user);
// //         })
// //         .catch((err) => {
// //           console.log(err);
// //         });
// //     };
// //     getUser();
// //   }, []);
// //   // console.log(user);

// //   return user;
// // }

// const userAuthentication = async () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const authenticateUser = async () => {
//       try {
//         // Gửi yêu cầu đến backend để kiểm tra xem người dùng đã đăng nhập thành công bằng tài khoản Google chưa
//         const response = await fetch("http://localhost:5000/auth/login/success", {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             "Access-Control-Allow-Credentials": true,
//           },
//         });

//         // Kiểm tra phản hồi từ backend
//         if (response.status === 200) {
//           // Nếu thành công, lấy thông tin người dùng từ phản hồi
//           const data = await response.json();
//           setUserData(data.user);
//         } else {
//           // Nếu không thành công, không có thông tin người dùng nào được trả về
//           setUserData(null);
//         }
//       } catch (error) {
//         // Xử lý lỗi nếu có
//         console.error("Error authenticating user:", error);
//         setUserData(null);
//       }
//     };

//     authenticateUser();
//   }, []);

//   return userData;
// };

// export default userAuthentication;
