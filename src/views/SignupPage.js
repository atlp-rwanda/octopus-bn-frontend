import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import SignupForm from '../components/SignupForm';
import styles from '../styles/entry.module.css';
import { signup } from '../redux/actions/signupAction';
import { Redirect } from 'react-router-dom';

class SignupPage extends React.Component {
	submit = (data) => this.props.signup(data).then(() => this.props.history.push('/verify-email'));

	render() {
		return (
			<div className={styles.container}>
				<SignupForm submit={this.submit} />
			</div>
		);
	}
}

SignupPage.propTypes = {
	history: Proptypes.shape({
		push: Proptypes.func.isRequired
	}).isRequired,
	signup: Proptypes.func.isRequired
};

export default connect(null, { signup })(SignupPage);
