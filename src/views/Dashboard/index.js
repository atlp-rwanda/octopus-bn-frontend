import React, { Component } from 'react';
import ResponsiveDrawer from '../../components/ResponsiveDrawer';
import { withRouter, Redirect } from 'react-router-dom';
import { decode } from '../../utils/jwtTokenizer';
import { loginUserSuccess } from '../../redux/actions/loginAction';
import { connect } from 'react-redux';
import SvgMap from '../../components/SvgMap';

class Index extends Component {
	componentDidMount() {
		const token = localStorage.getItem('bn-token');
		const user = localStorage.getItem('bn-user-data');

		if (token) {
			const { exp } = decode(token);
			if (Date.now() >= exp * 1000) {
				return this.props.history.push('/');
			}
			this.props.loginUserSuccess({ data: JSON.parse(user), token: token });
		} else {
			return this.props.history.push('/');
		}
	}
	render() {
		return (
			<div>
				<SvgMap />
				<ResponsiveDrawer component={this.props.children} />
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
		loginUserSuccess: (userInfo) => dispatch(loginUserSuccess(userInfo)),
		closeMessage: () => dispatch(closeMessage())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
