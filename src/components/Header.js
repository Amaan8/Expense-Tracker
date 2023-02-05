import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid px-5">
        <h3 className="navbar-brand">Welcome to Expense Tracker!</h3>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item px-3">
              <Link to="/home" className="text-decoration-none text-black">
                Home
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link to="/profile" className="text-decoration-none text-black">
                Profile
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item px-3" onClick={logoutHandler}>
                <Link to="/auth" className="text-decoration-none text-black">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
