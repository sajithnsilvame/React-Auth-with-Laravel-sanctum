import React from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const logoutSubmit = (event) => {
    event.preventDefault();
    axios.post(`/api/logout`).then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        navigate("/");
      }
    });
  };

  var AuthButton = "";
  if (!localStorage.getItem("auth_token")) {
    AuthButton = (
      <>
        <li className="nav-item">
          <a className="nav-link" href="login">
            Login
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="register">
            Register
          </a>
        </li>
      </>
    );
  } else {
    AuthButton = (
      <li className="nav-item">
        <a className="nav-link" href="">
          <button className="btn btn-danger btn-sm" onClick={logoutSubmit}>
            Logout
          </button>
        </a>
      </li>
    );
  }

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a
              className="navbar-brand"
              href="https://github.com/sajithnsilvame">
              Sajith N Silva
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>

                {AuthButton}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
