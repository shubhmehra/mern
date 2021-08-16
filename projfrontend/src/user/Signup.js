import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, lastname, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, lastname, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            lastname: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("error in signup"));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group mt-3">
              <label className="text-light">First Name</label>
              <input
                className="form-control"
                type="text"
                onChange={handleChange("name")}
                value={name}
              />
            </div>
            <div className="form-group mt-3">
              <label className="text-light">Last Name</label>
              <input
                className="form-control"
                type="text"
                onChange={handleChange("lastname")}
                value={lastname}
              />
            </div>
            <div className="form-group mt-3">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                type="email"
                onChange={handleChange("email")}
                value={email}
              />
            </div>
            <div className="form-group mt-3">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                type="password"
                onChange={handleChange("password")}
                value={password}
              />
            </div>
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block mt-4 offset-4"
              onClick={onSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        New account was created successfully. Please{" "}
        <Link to="/login">Login here</Link>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  return (
    <>
      <Base />

      <h1 className="text-white text-center mt-5 mb-5">Sign Up form</h1>
      <div className="col-md-6 offset-sm-3 text-left">
        {successMessage()}
        {errorMessage()}
      </div>
      {signUpForm()}

      <p className="text-white text-center">{JSON.stringify(values)}</p>
      
    </>
  );
};

export default Signup;
