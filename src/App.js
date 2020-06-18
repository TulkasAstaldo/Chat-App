import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./HOCs/PrivateRoute";
import PublicRoute from "./HOCs/PublicRoute";
import { auth } from "./services/firebase";
import "./App.css";
import Profile from "./components/Profile";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
    });
  }, []);

  return loading === true ? (
    <h2>Loading...</h2>
  ) : (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute
          path="/chat"
          authenticated={authenticated}
          component={Chat}
        ></PrivateRoute>
        <PrivateRoute
          path="/profile"
          authenticated={authenticated}
          component={Profile}
        ></PrivateRoute>
        <PublicRoute
          path="/signup"
          authenticated={authenticated}
          component={SignUp}
        ></PublicRoute>
        <PublicRoute
          path="/login"
          authenticated={authenticated}
          component={Login}
        ></PublicRoute>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
