import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Login from "./user/Login";
import Signup from "./user/Signup";
import PrivateRoutes from "./auth/helper/PrivateRoutes";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <PrivateRoutes path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
