import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
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
    </Switch>
  );
}

export default App;
