import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const requesterRoute = ({ isRequester, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isRequester ? <Component {...props} /> : <Redirect to="/new-trip-request" />
    }
  />
);

requesterRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

function mapStateToProps() {
  const user = JSON.parse(localStorage.getItem("bn-user-data"));
  return {
    isRequester:
      user.role === "requester"||
      user.role === "travel_administrator"||
      user.role === "manager" ||
      user.role === "super_administrator",
  };
}

export default connect(mapStateToProps)(requesterRoute);
