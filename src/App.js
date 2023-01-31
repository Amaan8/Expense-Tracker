import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/auth" />
      </Route>
      <Route path="/auth">
        <Auth />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </Switch>
  );
}

export default App;
