import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (eve) => {
    const { name, value } = eve.currentTarget;
    let loginData = { ...formData };
    loginData[name] = value;
    setFormData(loginData);
  };

  const onSubmit = (eve) => {
    eve.preventDefault();
  };

  return (
    <React.Fragment>
      <section className="heading">
        <h3>
          <FaSignInAlt />
          Login
        </h3>
        <p>Login & Start Setting Goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
}
