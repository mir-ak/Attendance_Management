import React from "react";
import { Route, Switch } from "react-router-dom";
import "./styles/App.css";
import NotFound from "./page/NotFound";
import Home from "./page/Home";
import Contact from "./page/Contact";
import Dashboard from "./page/Dashboard";
import Presence from "./page/Presence";
import Login from "./components/Connection/Login";
import Singup from "./components/Connection/SingUp";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/singup" component={Singup} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/contact_cv" component={Contact} />
        <PrivateRoute exact path="/Dashboard" component={Dashboard} />
        <PrivateRoute exact path="/presence" component={Presence} />
        <Route component={NotFound} />
      </Switch>
      <NotificationContainer />
    </>
  );
}
export default App;
