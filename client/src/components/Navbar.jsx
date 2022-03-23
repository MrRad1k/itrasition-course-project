import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          ITransition Course Project
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
          <img
              src={user.photo}
              alt=""
              className="avatar"
            />
          </li>
          <li className="listItem">{user.name}</li>
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