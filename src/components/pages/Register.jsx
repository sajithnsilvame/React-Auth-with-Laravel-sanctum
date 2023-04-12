import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import swal from "sweetalert";

const Register = () => {
  const navigate = useNavigate();
  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    password: "",
    error_list: [],
  });

  const handleInput = (e) => {
    e.persist();
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/register`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");
          navigate("/");
        } else {
          setRegisterInput({
            ...registerInput,
            error_list: res.data.validation_error,
          });
        }
      });
    });
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-md-center">
        <div className="card">
          <div className="card-header">
            <h2>Register</h2>
            <form onSubmit={registerSubmit}>
              <div className="form-group mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter name"
                  onChange={handleInput}
                  value={registerInput.name}
                />

                <span className="text-danger">
                  {registerInput.error_list.name}
                </span>
              </div>
              <div className="form-group mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleInput}
                  value={registerInput.email}
                />
                <span className="text-danger">
                  {registerInput.error_list.email}
                </span>
              </div>
              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={handleInput}
                  value={registerInput.password}
                />
                <span className="text-danger">
                  {registerInput.error_list.password}
                </span>
              </div>

              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
