import { Link } from "react-router-dom";
/* <img
              src={user.photos[0].value}
              alt=""
              className="avatar"
            /> */
const Navbar = ({ user }) => {
  const logout = () => {
    window.open("https://itrasition-course-project.herokuapp.com/auth/logout", "_self");
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
           App
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
           
          </li>
          <li className="listItem">{user.displayName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;