import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import isEmail from 'validator/lib/isEmail';
import { LinearProgress } from '@material-ui/core';
import styles from '../styles/signup.module.css';
import translate from '../languages/translate';
import SocialButtons from './SocialButtons';

class SignupForm extends React.Component {
	state = {
		data: {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		},
		loading: 'none',
		errors: {},
		open: false
	};

	onChange = (e) =>
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});

	onSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: 'block' });
			this.props.submit(this.state.data).catch((err) =>
				this.setState({
					errors: { globalError: err.response.data.message },
					loading: 'none',
					open: true
				})
			);
		}
	};

	validate = (data) => {
		const errors = {};

		if (!data.firstName) {
			errors.firstName = 'Your first name is required';
			errors.firstErrorStatus = true;
		}
		if (!data.lastName) {
			errors.lastName = 'Your last name is required';
			errors.lastErrorStatus = true;
		}
		if (!isEmail(data.email)) {
			errors.email = 'please enter a valid email';
			errors.emailErrorStatus = true;
		}
		if (data.password.length < 8) {
			errors.password = 'minimum lenght for password is 8 characters';
			errors.passwordErrorStatus = true;
		}
		return errors;
	};

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
	};

	render() {
		const { data, errors, loading, open } = this.state;
		return (
			<div>
				<div className={styles.forms}>
					<div style={{ display: loading }}>
						<LinearProgress />
					</div>
					<div className={styles.wrap}>
						<div className={styles.form_top_text}>
							<p className={styles.fs_title}>Sign Up</p>
							<p className={styles.fs_subtitle}>{translate('fill-form')}</p>
							<SocialButtons />
							<div className={styles.or_div}>
								<div className={styles.or_text}>Or</div>
							</div>
						</div>
						<form onSubmit={this.onSubmit} className={styles.form} aria-label="form">
							<TextField
								className={styles.inputs}
								label="First Name"
								inputProps={{
									'aria-label': 'First Name'
								}}
								name="firstName"
								variant="outlined"
								error={errors.firstErrorStatus}
								helperText={errors.firstName}
								value={data.firstName}
								onChange={this.onChange}
							/>
							<TextField
								className={styles.inputs}
								style={{ marginTop: '10px' }}
								label="Last Name"
								inputProps={{
									'aria-label': 'Last Name'
								}}
								name="lastName"
								variant="outlined"
								error={errors.lastErrorStatus}
								helperText={errors.lastName}
								value={data.lastName}
								onChange={this.onChange}
							/>
							<TextField
								className={styles.inputs}
								style={{ marginTop: '10px' }}
								label="Email"
								inputProps={{
									'aria-label': 'email'
								}}
								name="email"
								variant="outlined"
								error={errors.emailErrorStatus}
								helperText={errors.email}
								value={data.email}
								onChange={this.onChange}
							/>
							<TextField
								className={styles.inputs}
								style={{ marginTop: '10px' }}
								label="Password"
								inputProps={{
									'aria-label': 'password'
								}}
								name="password"
								type="password"
								variant="outlined"
								error={errors.passwordErrorStatus}
								helperText={errors.password}
								value={data.password}
								onChange={this.onChange}
							/>
							<div
								style={{
									float: 'left',
									marginTop: '20px'
								}}
								className={styles.link}
							>
								<Link to="/" className={styles.link}>
									Already have an account?
								</Link>
							</div>
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
								Sign up
							</Button>
						</form>
					</div>
				</div>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right'
					}}
					open={open}
					autoHideDuration={6000}
					onClose={this.handleClose}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">{errors.globalError}</span>}
					action={[
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							onClick={() => this.setState({ open: false })}
						>
							<CloseIcon />
						</IconButton>
					]}
				/>
			</div>
		);
	}
}

SignupForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default SignupForm;
