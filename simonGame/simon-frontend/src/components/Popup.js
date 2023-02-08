import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:5001";

const Popup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values.name);

    axios
      .post(`${BASE_URL}/api/scores/login`, {
        name: values.name,
        email: values.email,
      })
      .then((data) => {
        // console.log("data from popup page post", data);
        if (data.status === 200) {
          localStorage.setItem("email", values.email);
          navigate("/Game");
        }
      })
      .catch((error) => {
        //   return ({error: error})
        console.log("error: ", error);
      });
  };

  const handleInputOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div>
      <h1 className="popup-title">Welcome to Simon Says Game!</h1>
      <div className="popup">
        <form>
          <div>
            <h3>Please fill you details here:</h3>
            <input
              placeholder="Your Name"
              type="text"
              name="name"
              onChange={handleInputOnChange}
            />
          </div>
          <div>
            <input
              placeholder="Your Email"
              type="text"
              name="email"
              onChange={handleInputOnChange}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
