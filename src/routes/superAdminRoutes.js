import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const superAdminRoute = ({ isSuperAdmin, component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (isSuperAdmin ? <Component {...props} /> : <Redirect to="/dashboard" />)} />
);

superAdminRoute.propTypes = {
	component: PropTypes.func.isRequired
};

function mapStateToProps() {
	const user = JSON.parse(localStorage.getItem('bn-user-data'));
	return {
		isSuperAdmin: user ? user.role === 'super_administrator' : null
	};
}

export default connect(mapStateToProps)(superAdminRoute);
