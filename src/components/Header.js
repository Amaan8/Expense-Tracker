import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { themeActions } from "../store/theme";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const themeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  return (
    <nav className="navbar navbar-expand-md bg-light">
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
            <li
              className="nav-item px-3 text-black"
              role="button"
              onClick={themeHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="23"
                fill="currentColor"
                className="bi bi-toggles"
                viewBox="0 0 16 16"
              >
                <path d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z" />
              </svg>
            </li>
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
