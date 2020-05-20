import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from '../styles/entry.module.css';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { restPasswordAction, closeMessage } from '../redux/actions/resetPasswordAction';
import { LinearProgress } from '@material-ui/core';
import translate from '../languages/translate';
import { BrowserRouter, Link, Redirect } from 'react-router-dom';
import SocialButtons from './SocialButtons';
import SvgMap from './SvgMap';
import LanguageButtons from './LanguageButtons';
import { withRouter } from 'react-router-dom';

class ResetPasswordForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			passwordErrorStatus: false,
			confirmPassword: '',
			confirmPasswordErrorStatus: false,
			open: false,
			errorMessage: ''
		};
	}
	validate = () => {
		let isError = false;
		const errors = {
			passwordErrorStatus: false,
			confirmPasswordErrorStatus: false
		};
		const regex = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/);
		if (!regex.test(this.state.password)) {
			isError = true;
			errors.passwordErrorStatus = true;
		}
		if (this.state.password !== this.state.confirmPassword) {
			isError = true;
			errors.confirmPasswordErrorStatus = true;
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
			const { token } = this.props.match.params;
			const send = {
				password: this.state.password,
				confirmPassword: this.state.confirmPassword
			};
			await this.props.restPasswordAction(send, token, this.props.history);
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
				<SvgMap />
				<div className={styles.side}>
					<div className={styles.text_wrap}>
						<h1>Barefoot Nomad</h1>
						<p>{translate('bn-value')}</p>
					</div>
				</div>
				<div className={styles.forms}>
					<div style={{ display: this.props.resetPassword.loading }}>
						<LinearProgress />
					</div>
					<LanguageButtons />
					<div className={styles.wrapReset}>
						<div className={styles.form_top_text}>
							<p className={styles.fs_title}>Reset Your Password</p>
							<p className={styles.fs_subtitle}>{translate('fill-form')}</p>
						</div>
						<form className="form" onSubmit={(e) => this.onSubmit(e)} aria-label="form">
							<TextField
								error={this.state.passwordErrorStatus}
								className={styles.inputs}
								name="password"
								autoComplete="newPassword"
								inputProps={{
									'aria-label': 'newPassword'
								}}
								label={translate('password')}
								type="password"
								variant="outlined"
								helperText={
									this.state.passwordError ||
									'At least 8 character/one uppercase/one special character'
								}
								value={this.state.password}
								onChange={(e) => this.change(e)}
							/>

							<TextField
								style={{ marginTop: 20 }}
								error={this.state.confirmPasswordErrorStatus}
								className={styles.inputs}
								name="confirmPassword"
								autoComplete="confirm-password"
								inputProps={{
									'aria-label': 'confirmPassword'
								}}
								label={translate('confirm_password')}
								type="password"
								variant="outlined"
								helperText={this.state.passwordError || 'Must match your password'}
								value={this.state.confirmPassword}
								onChange={(e) => this.change(e)}
							/>

							<Link to="/signup" className={styles.link}>
								{translate('no-account')}
							</Link>
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
								reset Password
							</Button>
						</form>
					</div>
				</div>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right'
					}}
					open={this.props.resetPassword.open}
					autoHideDuration={6000}
					onClose={this.handleClose}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">{this.props.resetPassword.error}</span>}
					action={[
						<IconButton key="close" color="inherit" onClick={this.props.closeMessage}>
							<CloseIcon aria-label="Close" />
						</IconButton>
					]}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		resetPassword: state.resetPassword
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		restPasswordAction: (data, token, history) => dispatch(restPasswordAction(data, token, history)),
		closeMessage: () => dispatch(closeMessage())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm));
