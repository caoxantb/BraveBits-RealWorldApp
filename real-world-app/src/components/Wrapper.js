import React, { useEffect, useState } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Profile from "./Profile/Profile";
import Settings from "./Settings/Settings";
import Article from "./Article/Article";
import ArticleForm from "./Article/ArticleForm";

import authService from "../services/authService";
import userService from "../services/userService";

const Wrapper = () => {
  const navigate = useNavigate();

  //States management
  const [user, setUser] = useState(null);
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);
  const [userSetting, setUserSetting] = useState(null);

  //use effect to get current user
  useEffect(() => {
    const currentUserJSON = window.localStorage.getItem("currentUser");
    if (currentUserJSON) {
      const userLogged = JSON.parse(currentUserJSON);
      setUser(userLogged);
      setUserSetting(userLogged);
    }
  }, []);

  //handle register form onChange
  const handleRegisterChange = (event) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  //handle register form onSubmit
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      setRegisterError(false);
      const data = { user: registerData };
      await authService.register(data);
      navigate("/login");
    } catch (e) {
      console.log(e);
      setRegisterError(true);
      setRegisterData({
        username: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        setRegisterError(false);
      }, 5000);
    }
  };

  //handle login form onChange
  const handleLoginChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  //handle login form onSubmit
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoginError(false);
      const data = { user: loginData };
      const response = await authService.login(data);
      window.localStorage.setItem("currentUser", JSON.stringify(response.user));
      setUser(response.user);
      navigate("/");
    } catch (e) {
      setLoginError(true);
      setLoginData({
        username: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        setLoginError(false);
      }, 5000);
    }
  };

  const handleSettingsChange = (event) => {
    console.log(userSetting);
    setUserSetting({
      ...userSetting,
      [event.target.name]: event.target.value,
    });
  };

  const handleSettingsSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = { user: userSetting };
      const response = await userService.updateCurrentUser(data, user.token);
      setUser(response.user);
      navigate(`/${user.username}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Navbar user={user}></Navbar>
      <Routes>
        {user ? (
          <Route path="/" element={<Home user={user} />} />
        ) : (
          <Route path="/" element={<div></div>} />
        )}

        <Route
          path="/login"
          element={
            <Login
              onChangeHandler={handleLoginChange}
              onSubmitHandler={handleLoginSubmit}
              error={loginError}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              onChangeHandler={handleRegisterChange}
              onSubmitHandler={handleRegisterSubmit}
              error={registerError}
            />
          }
        />
        <Route path="/profile/:username" element={<Profile user={user} />} />
        {user ? (
          <Route
            path="/settings"
            element={
              <Settings
                user={user}
                userSetting={userSetting}
                onChangeHandler={handleSettingsChange}
                onSubmitHandler={handleSettingsSubmit}
              />
            }
          />
        ) : (
          <Route path="/settings" element={<div></div>} />
        )}

        <Route path="/article/:slug" element={<Article user={user} />} />
        <Route path="/editor" element={<ArticleForm user={user} />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default Wrapper;
