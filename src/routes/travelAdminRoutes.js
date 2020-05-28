import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const travelAdminRoute = ({ isTravelAdmin, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isTravelAdmin ? <Component {...props} /> : <Redirect to="/dashboard" />
    }
  />
);

travelAdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

function mapStateToProps() {
  const user = JSON.parse(localStorage.getItem("bn-user-data"));
  return {
    isTravelAdmin:
      user.role === "travel_administrator" ||
      user.role === "accommodation_supplier",
  };
}

export default connect(mapStateToProps)(travelAdminRoute);
