import { Link } from "react-router-dom";
import Expense from "./Expense";

const Home = () => {
  const verify = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCD07qIp-EwTuHar_8Wot4gQsxQYj5Kjvk",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        let errorMessage = data.error.message;

        throw new Error(errorMessage);
      }
      alert("Verification link sent to your Email-ID");
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <p className="bg-info p-2 m-2 rounded float-end">
        Your profile is incomplete.
        <Link className="text-danger text-decoration-none" to="/profile">
          {" "}
          Complete now
        </Link>
      </p>
      <button
        className="btn btn-success mt-5 col-lg-2 offset-lg-5 col-4 offset-4"
        onClick={verify}
      >
        Verify Email-ID
      </button>
      <Expense />
    </>
  );
};

export default Home;
