import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const managerRoute = ({ isManager, component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (isManager ? <Component {...props} /> : <Redirect to="/dashboard" />)} />
);

managerRoute.propTypes = {
	component: PropTypes.func.isRequired
};

const mapStateToProps = () => {
	const user = JSON.parse(localStorage.getItem('bn-user-data'));
	return {
		isManager: user ? user.role === 'manager' : null
	};
};

export default connect(mapStateToProps)(managerRoute);
