import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthenticatedRoute from '../routes/AuthentificatedRoute';
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Publication from "../pages/Publication";
import Salaries from "../pages/Salaries"



function RoutesCompon() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        < Route exact path="/login" component={Login} />
        < Route exact path="/signup" component={Signup} />
        <AuthenticatedRoute path="/Publication" component={Publication} />
        <AuthenticatedRoute path="/Salaries" component={Salaries} />
        <AuthenticatedRoute path="/Profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}



export default RoutesCompon;