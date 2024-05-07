//***********************************************LOGIN USER************************** */

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw Error("Please fill all the fields");
  }

  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);

  console.log(data);
};

//***********************************************FORGOT PASSWORD USER************************** */
const checkEmailUser = async (email) => {
  if (!email) {
    throw Error("Please fill all the fields");
  }

  const res = await fetch("/api/users/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }
};

//***********************************************FORGOT PASSWORD USER************************** */
const resetPasswordUser = async (id, token, password) => {
  // if (!password || !confirmPassword) {
  //   throw Error("Please fill all the fields");
  // }

  // if (password !== confirmPassword) {
  //   throw Error("Passwords do not match!");
  // }

  const res = await fetch(`/api/users/reset-password/${id}/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  // Xử lý response ở đây nếu cần
  // const data = await res.json()
  // if(!res.ok) {
  //     throw Error(data.error)
  // }
};

export { loginUser, checkEmailUser, resetPasswordUser };
