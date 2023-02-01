import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Header = () => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <nav className="navbar bg-light">
      <div className="container-fluid px-5">
        <h3>Welcome to Expense Tracker!</h3>
        <div className="d-flex ms-auto">
          <Link to="/home">
            <button className="btn">Home</button>
          </Link>
          <Link to="/profile">
            <button className="btn">Profile</button>
          </Link>
          {authCtx.isLoggedIn && (
            <Link to="/auth">
              <button className="btn btn-info" onClick={logoutHandler}>
                Logout
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
