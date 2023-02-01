import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Forgot = () => {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const email = emailRef.current.value;

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCD07qIp-EwTuHar_8Wot4gQsxQYj5Kjvk",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setLoading(false);
        let errorMessage = data.error.message;

        throw new Error(errorMessage);
      }
      alert("Link sent to your email address");
      setLoading(false);
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form className="border p-3 mb-3" onSubmit={submitHandler}>
            <p className="text-center">
              Enter the email with which you have registered.
            </p>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                required
                ref={emailRef}
                placeholder="Email address"
              />
              <label htmlFor="email">Email address</label>
            </div>
            {!loading && (
              <button type="submit" className="btn btn-info col-4 offset-4">
                Send Link
              </button>
            )}
            {loading && <p className="text-center">Sending...</p>}
            <Link to="/auth">
              <button className="btn col-8 offset-2 mt-2">
                Already a user? Login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
