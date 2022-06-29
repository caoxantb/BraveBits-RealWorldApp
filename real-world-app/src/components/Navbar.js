import React from "react";

import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { user } = props;
  return (
    <div>
      <nav className="navbar navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            conduit
          </Link>

          {user ? (
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                {/* <!-- Add "active" className when you're on that page" --> */}
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/editor">
                  <i className="ion-compose"></i>&nbsp;New Article
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/settings">
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`profile/${user.username}`}>
                  <img className="user-pic" src={user.image} alt="" />
                  {user.username}
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav pull-xs-right">
              <li className="nav-item">
                {/* <!-- Add "active" className when you're on that page" --> */}
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Sign up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
