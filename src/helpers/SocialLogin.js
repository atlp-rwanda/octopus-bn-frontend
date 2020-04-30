import React, { Component } from 'react';
import queryString from 'query-string';
import { LinearProgress } from '@material-ui/core';

export default class SocialLogin extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		try {
			const values = queryString.parse(this.props.location.search);
			const data = values.data;
			const user = JSON.parse(data)[0];
			const token = JSON.parse(data)[2];
			localStorage.setItem('bn-token', token);
			localStorage.setItem('bn-user-data', JSON.stringify(user));
			window.location.href = `/dashboard`;
		} catch (error) {
			window.location.href = `/lost`;
		}
	}
	render() {
		return (
			<div>
				<LinearProgress />
			</div>
		);
	}
}
