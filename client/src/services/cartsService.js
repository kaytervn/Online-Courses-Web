

const getCart = async (token) => {
    const res = await fetch("/api/carts/getCart", {
        method:"GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bear ${token}`,
      },
    });
    const data = await res.json();
    return data;
};


// const addToCart = async ()=>{
//     try
// }