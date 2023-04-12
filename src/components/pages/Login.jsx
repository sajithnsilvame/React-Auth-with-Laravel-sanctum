import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    error_list: [],
  });

  const handleLogin = (event) => {
    event.persist();
    setLoginInput({ ...loginInput, [event.target.name]: event.target.value });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };
    axios.get("/sanctum/csrf-cookie").then((response) => {
      axios.post(`/api/login`, data).then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("auth_name", res.data.username);
          swal("Success", res.data.message, "success");
          navigate("/");
        } else if (res.data.status === 401) {
          swal("Warning", res.data.message, "warning");
        } else {
          setLoginInput({
            ...loginInput,
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
            <h2>Login</h2>
            <form onSubmit={loginSubmit}>
              <div className="form-group mb-3">
                <label>Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleLogin}
                  value={loginInput.name}
                />
                <span className="text-danger">
                  {loginInput.error_list.email}
                </span>
              </div>
              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={handleLogin}
                  value={loginInput.password}
                />
                <span className="text-danger">
                  {loginInput.error_list.password}
                </span>
              </div>

              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
