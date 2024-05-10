import { useContext, useEffect, useState } from "react";
import React from 'react'
import Button from "react-bootstrap/esm/Button";

const CartPage = () => {
  const [cartItem, setCaetItem] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItemCart = async () => {
      try {
        const res = await fetch("/api/courses/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setCourses(data.courses);
      } catch (error) {
        setError(error.message);
      }
    };

    getCart();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div className="my-5">
      <div className="container">
        <div className="text-center">
          <h2>Cart</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Sr no</th>
              <th>Course</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <th>1</th>
            <th>A</th>
            <th>10</th>
            <th>
              <button>remove</button>
            </th>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CartPage