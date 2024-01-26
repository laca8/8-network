import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../auth/login";
import Register from "../auth/register";
import Home from "../home/Home";
import { useSelector } from "react-redux";
import Profile from "../users/profile";
import NotFound from "../NotFound";
const Routes = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
      <Switch>
        <Router>
          <Route
            exact
            path="/"
            component={userInfo && userInfo.token ? Home : Login}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile/:id" component={Profile} />
        </Router>
      </Switch>
    </>
  );
};

export default Routes;
