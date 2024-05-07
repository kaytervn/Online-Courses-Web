import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  return (
    <>HomePage</>
    // <div className="navbar">
    //   <span className="logo">
    //     <Link className="link" to="/homepage">
    //       Online Course
    //     </Link>
    //   </span>
    //   {user ? (
    //     <ul className="list">
    //       <li className="listItem">
    //         <img src={user.photos[0].value} alt="" className="avatar" />
    //       </li>
    //       <li className="listItem">{user.displayName}</li>
    //       <li className="listItem" onClick={logout}>
    //         Logout
    //       </li>
    //     </ul>
    //   ) : (
    //     <ul className="list">
    //       <li className="listItem">
    //         <p>Avatar</p>
    //         {/* <img
    //                         src={user.photos[0].value}
    //                         alt=""
    //                         className="avatar"
    //                     /> */}
    //       </li>
    //       <li className="listItem">Username</li>
    //       <li className="listItem" onClick={logout}>
    //         Logout
    //       </li>
    //     </ul>
    //   )}
    // </div>
  );
  // <div>
  //     <h1>HomePage</h1>
  //     <p onClick={logout}>Logout</p>
  // </div>
  // );
};

export default HomePage;
