import React, { Component, Profiler } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  IndexRoute,
} from "react-router-dom";
import Login from "../views/Login.View";
import Signup from "../views/SignupPage";
import Confirm from "../views/ConfirmEmail";
import SocialLogin from "../helpers/SocialLogin";
import Lost from "../views/Lost.View";
import DashboardRoot from "../views/Dashboard";
import DashboardHome from "../views/Dashboard/Home";
import Requests from "../views/Dashboard/Requests";
import Profile from "../components/Profile";
import ProfileSettings from "../components/ProfileSettings";
import UserRoles from "../views/Dashboard/UserRoles";
import { SendResetEmailView, PasswordResetProcess } from '../views/SendMailView';
import {ResetPasswordView} from '../views/ResetPasswordView'


export default class index extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/verify-email" exact component={Confirm} />
        <Route path="/social-login" exact component={SocialLogin} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/forgot-password" exact component={SendResetEmailView}/>
        <Route path="/password-reset-process" exact component={PasswordResetProcess}/>
        <Route path="/reset-password" exact component={ResetPasswordView}/>
        <DashboardRoot>
          <Route
            component={({ match }) => (
              <div>
                <Route path="/dashboard" exact component={DashboardHome} />
                <Route path="/requests" exact component={Requests} />
                <Route
                  path="/profile-settings"
                  exact
                  component={ProfileSettings}
                />
                <Route path="/user-roles" exact component={UserRoles} />
              </div>
            )}
          />
        </DashboardRoot>
        <Route component={Lost} />
      </Switch>
    );
  }
}
