import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BASE_URL = "https://simon-says.onrender.com";

const Popup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/api/scores/login`, {
        name: values.name,
        email: values.email,
      })
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("email", values.email);
          navigate("/Game");
        }
      })
      .catch((error) => {
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
              className="input"
              placeholder="Your Name"
              type="text"
              name="name"
              onChange={handleInputOnChange}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder="Your Email"
              type="text"
              name="email"
              onChange={handleInputOnChange}
            />
          </div>
          <button className="submit" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
