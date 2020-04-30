import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { loginUserSuccess } from './redux/actions/loginAction';
import { connect } from 'react-redux';

class App extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		if (localStorage.getItem('bn-user-data')) {
			const user = JSON.parse(localStorage.getItem('bn-user-data'));
			console.log(user);
			if (user.token) {
				return this.props.loginUserSuccess(user);
			}
			return (window.location.href = '/');
		}
	}

	render() {
		return (
			<Router>
				<Routes />
			</Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
