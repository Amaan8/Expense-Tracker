import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Profile = () => {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const photoRef = useRef();

  useEffect(() => {
    getDetails();
    // eslint-disable-next-line
  }, []);

  const getDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCD07qIp-EwTuHar_8Wot4gQsxQYj5Kjvk",
        {
          method: "POST",
          body: JSON.stringify({
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
      const user = data.users[0];
      if (user.displayName && user.photoUrl) {
        nameRef.current.value = user.displayName;
        photoRef.current.value = user.photoUrl;
        dispatch(authActions.completeProfile());
      }
    } catch (error) {
      alert(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const name = nameRef.current.value;
      const photo = photoRef.current.value;
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCD07qIp-EwTuHar_8Wot4gQsxQYj5Kjvk",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            photoUrl: photo,
            returnSecureToken: true,
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
      dispatch(authActions.completeProfile());
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
            <h3 className="text-center">PROFILE</h3>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                ref={nameRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Profile Photo URL
              </label>
              <input
                type="text"
                className="form-control"
                id="photo"
                required
                ref={photoRef}
              />
            </div>
            <button type="submit" className="btn btn-info col-4 offset-4">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
