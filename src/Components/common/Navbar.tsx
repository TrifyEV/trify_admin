import React from "react";
import { useAuth } from "../common/AuthProvider";

const Navbar = () => {
  const auth = useAuth();

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: "#FFAC1C" }}
        // style="background-color: #e3f2fd;"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Trify
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Map View
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Bike
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  User
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item me-auto">
                <button className="btn " onClick={auth?.signout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
