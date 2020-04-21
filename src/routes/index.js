import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '../styles/styles.scss';
import Login from '../views/Login.View';
import Dashboard from '../views/Dashboard';
export default class index extends Component {
	render() {
		return (
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/dashboard" exact component={Dashboard} />
			</Switch>
		);
	}
}
