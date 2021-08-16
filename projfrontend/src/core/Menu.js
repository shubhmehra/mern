import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ECC72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/")}
                className="nav-link"
                to="/"
              >
                Home
              </Link>
            </li>
          </>
        )}
        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                style={currentTab(history, "/signup")}
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/login"
                style={currentTab(history, "/login")}
              >
                Login
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  history.push("/login");
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
