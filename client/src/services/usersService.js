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
  if (!password) {
    throw Error("Please fill all the fields");
  }

  const res = await fetch(`/api/users/reset-password/${id}/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });

  // const data = await res.json()
  // if(!res.ok) {
  //     throw Error(data.error)
  //     console.log(data.error)
  // }
};

//***********************************************LOGIN WITH GOOGLE ACCOUNT************************** */
const loginGoogleUser = async () => {
  // useEffect(() => {
  //   const getUser = () => {
  //     fetch("http://localhost:5000/auth/login/success", {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Credentials": true,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.status === 200) return response.json();
  //         throw new Error("authentication has been failed!");
  //       })
  //       .then((resObject) => {
  //         setUser(resObject.user);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getUser();
  // }, []);
};

export { loginUser, loginGoogleUser, checkEmailUser, resetPasswordUser };
