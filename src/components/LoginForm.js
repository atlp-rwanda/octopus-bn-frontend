import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import styles from '../styles/entry.module.css';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { loginAction, closeMessage } from '../redux/actions/loginAction';
import { LinearProgress } from '@material-ui/core';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			emailError: '',
			emailErrorStatus: false,
			password: '',
			passwordError: '',
			passwordErrorStatus: false,
			open: false,
			errorMessage: ''
		};
	}
	validate = () => {
		let isError = false;
		const errors = {
			emailError: '',
			emailErrorStatus: false,
			passwordError: '',
			passwordErrorStatus: false
		};

		if (this.state.email.indexOf('@') === -1) {
			isError = true;
			errors.emailErrorStatus = true;
			errors.emailError = 'Requires valid email';
		}
		if (this.state.password.length < 1) {
			isError = true;
			errors.passwordErrorStatus = true;
			errors.passwordError = 'Please provide a password';
		}
		this.setState({
			...this.state,
			...errors
		});

		return isError;
	};

	onSubmit = async (e) => {
		e.preventDefault();
		const error = this.validate();
		if (!error) {
			const send = {
				email: this.state.email,
				password: this.state.password
			};
			await this.props.loginAction(send);
		}
	};

	change = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	render() {
		return (
			<div>
				<div className={styles.forms}>
					<div style={{ display: this.props.loginSate.loading }}>
						<LinearProgress />
					</div>
					<div className={styles.wrap}>
						<div className={styles.form_top_text}>
							<p className={styles.fs_title}>Sign In</p>
							<p className={styles.fs_subtitle}>Please fill the form</p>
							<Button
								variant="contained"
								style={{ textTransform: 'capitalize', marginRight: '20px', width: '136px' }}
								color="secondary"
								startIcon={<FaGoogle />}
								disableElevation
							>
								Google
							</Button>
							<Button
								variant="contained"
								color="primary"
								startIcon={<FaFacebookF />}
								style={{ textTransform: 'capitalize', marginLeft: '20px', width: '136px' }}
								disableElevation
							>
								Facebook
							</Button>
							<div className={styles.or_div}>
								<div className={styles.or_text}>Or</div>
							</div>
						</div>
						<form className="form" onSubmit={(e) => this.onSubmit(e)} aria-label="form">
							<TextField
								error={this.state.emailErrorStatus}
								className={styles.inputs}
								name="email"
								inputProps={{
									'aria-label': 'email'
								}}
								label="email"
								variant="outlined"
								helperText={this.state.emailError}
								value={this.state.email}
								onChange={(e) => this.change(e)}
							/>
							<p className={styles.link}>Forgot password?</p>
							<TextField
								error={this.state.passwordErrorStatus}
								className={styles.inputs}
								name="password"
								inputProps={{
									'aria-label': 'password'
								}}
								label="Password"
								type="password"
								autoComplete="current-password"
								variant="outlined"
								helperText={this.state.passwordError}
								value={this.state.password}
								onChange={(e) => this.change(e)}
							/>
							<p className={styles.link}>Have no account?</p>
							<Button
								type="submit"
								aria-label="submit"
								variant="contained"
								color="primary"
								style={{
									float: 'right',
									marginTop: '10px',
									textTransform: 'capitalize',
									width: '136px'
								}}
								disableElevation
							>
								signin
							</Button>
						</form>
					</div>
				</div>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right'
					}}
					open={this.props.loginSate.open}
					autoHideDuration={6000}
					onClose={this.handleClose}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">{this.props.loginSate.error}</span>}
					action={[
						<IconButton key="close" aria-label="Close" color="inherit" onClick={this.props.closeMessage}>
							<CloseIcon />
						</IconButton>
					]}
				/>
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
		loginAction: (userInfo) => dispatch(loginAction(userInfo)),
		closeMessage: () => dispatch(closeMessage())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
