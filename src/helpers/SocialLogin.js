import React, { Component } from 'react';
import queryString from 'query-string';
import { LinearProgress } from '@material-ui/core';
import { loginUserSuccess } from '../redux/actions/loginAction';
import { connect } from 'react-redux';
class SocialLogin extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		try {
			const values = queryString.parse(this.props.location.search);
			const data = values.data;
			const user = JSON.parse(data)[0];
			const token = JSON.parse(data)[2];
			localStorage.setItem('bn-user-data', JSON.stringify({ data: user, token }));
			this.props.loginUserSuccess({ data: user, token });
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

const mapStateToProps = (state) => {
	return {
		loginSate: state.login
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loginUserSuccess: (user) => dispatch(loginUserSuccess(user))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SocialLogin);
