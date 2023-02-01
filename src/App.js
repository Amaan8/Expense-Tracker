import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Home from "./components/Home";
import AuthContext from "./store/auth-context";
import Profile from "./components/Profile";
import Forgot from "./components/Forgot";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          {authCtx.isLoggedIn && <Redirect to="/home" />}
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <Auth />
          </Route>
        )}
        <Route path="/home">
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          <Home />
        </Route>
        {authCtx.isLoggedIn && (
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
    </>
  );
}

export default App;
