import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Auth = () => {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  const switchAuth = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCD07qIp-EwTuHar_8Wot4gQsxQYj5Kjvk";
      } else {
        const confirm = confirmRef.current.value;
        if (password !== confirm) {
          throw new Error("Password did not match");
        }
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCD07qIp-EwTuHar_8Wot4gQsxQYj5Kjvk";
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        let errorMessage = "Authentication failed!";

        throw new Error(errorMessage);
      }
      authCtx.login(data.idToken);
      console.log(data);
      history.replace("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form className="border p-3 mb-3" onSubmit={submitHandler}>
            <h3 className="text-center">{isLogin ? "LOGIN" : "SIGN UP"}</h3>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                ref={emailRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                ref={passwordRef}
              />
            </div>
            {!isLogin && (
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  required
                  ref={confirmRef}
                />
              </div>
            )}
            <button type="submit" className="btn btn-info col-4 offset-4">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <button
            className="btn btn-secondary col-6 offset-3"
            onClick={switchAuth}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Have a account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
