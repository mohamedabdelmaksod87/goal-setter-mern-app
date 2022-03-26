import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import authService from "../services";
import { useNavigate } from "react-router-dom";
import { toast, Slide, ToastContainer } from "react-toastify";
import Spinner from "../components/spinner";

export default function Register(props) {
  const { setUser } = props;
  const navigate = useNavigate();
  const initialData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [validationErr, setvalidationErr] = useState({});
  const { name, email, password, confirmPassword } = formData;

  const onChange = (eve) => {
    const { name, value } = eve.currentTarget;
    let registerData = { ...formData };
    registerData[name] = value;
    setFormData(registerData);
  };

  const onSubmit = async (eve) => {
    let errors = {};
    try {
      eve.preventDefault();
      if (password !== confirmPassword) {
        toast.error(`Passwords are not matched`);
      } else {
        setLoading(true);
        let registerData = { name, email, password };
        const userData = await authService.register(registerData);
        setLoading(false);
        setvalidationErr(errors);
        setUser(userData);
        setFormData(initialData);
        navigate("/", { replace: true });
      }
    } catch (err) {
      setLoading(false);
      if (Array.isArray(err)) {
        for (const eachErr of err) {
          errors[eachErr.param] = eachErr.msg;
        }
      } else {
        toast.error(err.msg);
      }
      setvalidationErr(errors);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      <ToastContainer
        transition={Slide}
        theme="colored"
        position="top-center"
      />
      <section className="heading">
        <h3>
          <FaUser />
          Register
        </h3>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              placeholder="Enter your Name"
              onChange={onChange}
            />
            {validationErr.name && (
              <h4 className="error">{validationErr.name}</h4>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              placeholder="Enter your Email"
              onChange={onChange}
            />
            {validationErr.email && (
              <h4 className="error">{validationErr.email}</h4>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              placeholder="Enter your Password"
              onChange={onChange}
            />
            {validationErr.password && (
              <h4 className="error">{validationErr.password}</h4>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
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
