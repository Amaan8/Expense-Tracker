import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Forgot from "./components/Forgot";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={theme ? "bg-dark text-white min-vh-100" : ""}>
      <Header />
      <Switch>
        <Route exact path="/">
          {!isLoggedIn && <Redirect to="/auth" />}
          {isLoggedIn && <Redirect to="/home" />}
        </Route>
        {!isLoggedIn && (
          <Route path="/auth">
            <Auth />
          </Route>
        )}
        <Route path="/home">
          {!isLoggedIn && <Redirect to="/auth" />}
          <Home />
        </Route>
        {isLoggedIn && (
          <Route path="/profile">
            <Profile />
          </Route>
        )}
        <Route path="/forgot-password">
          <Forgot />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
