import React from "react";
import PropTypes from "prop-types";
import { Link, HashRouter as Router, withRouter } from 'react-router-dom';
import { TextField, ThemeProvider, Snackbar, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { LinearProgress, IconButton } from "@material-ui/core";
import styles from "../styles/resetpassword.module.css";
import { LabelTheme } from '../theme';
import { connect } from "react-redux";
import { resetPasswordAction, closeMessage } from '../redux/actions/resetPasswordAction';
import translate from '../languages/translate'
import LanguageButtons from './LanguageButtons';




class ResetPassword extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			newPassword: '',
			confirmPassword: '',
			newPasswordError: '',
			confirmPasswordError: '',
			newPasswordErrorStatus: false,
			confirmPasswordErrorStatus: false,
			open: false,
			errorMessage: ''
		};
	}
	validate = () => {
		let isError = false;
		const errors = {
			newPasswordError: '',
			confirmPasswordError: '',
			newPasswordErrorStatus: false,
			confirmPasswordErrorStatus: false
		};

		if (this.state.newPassword.length < 1 || this.state.confirmPassword.length < 1) {
			isError = true;
			errors.newPasswordErrorStatus = true;
			errors.confirmPasswordErrorStatus = true;
			errors.newPasswordError = translate('valid-password');
			errors.confirmPasswordError = translate('valid-password');
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
				newPassword: this.state.newPassword,
			};
			await this.props.passwordResetter(send, this.props.history);
		}
	};

	change = (e) => {
		console.log("Input Change")
		this.setState({ [e.target.name]: e.target.value });
	};
	render() {

		return (
			<div>
				<div className={styles.forms}>
					<div style={{ display: this.props.resetPasswordState.loading }}>
						<LinearProgress />
					</div>
					<LanguageButtons />

					<div className={styles.wrap}>
						<div className={styles.form_top_text}>
							<p className={styles.fs_title}>{translate('reset-password')}</p>
						</div>
						<form className="form" onSubmit={(e) => this.onSubmit(e)} aria-label="form">
							<ThemeProvider theme={LabelTheme}>
								
									<TextField
										error={this.state.newPasswordErrorStatus}
										className={styles.inputs}
										name="newPassword"
										type="password"
										InputProps={{
											"aria-label": "new-password",
											"data-testid": "new-password-input"
										}}
			
										label={translate('new-password')}
										variant="outlined"
										helperText={this.state.newPasswordError}
										value={this.state.newPassword}
										onChange={(e) => this.change(e)}
									/>
									
									<TextField
										error={this.state.confirmPasswordErrorStatus}
										className={styles.inputs}
										name="confirmPassword"
										type="password"
										InputProps={{
											"aria-label": "confirmPassword",
											"data-testid": "confirm-password-input"
										}}
										label={translate('confirm-password')}
										variant="outlined"
										helperText={this.state.confirmPasswordError}
										value={this.state.confirmPassword}
										onChange={(e) => this.change(e)}
									/>

							</ThemeProvider>

							<Button
								className={styles.send_button}
								type="submit"
								aria-label="submit"
								variant="contained"
								color="primary"
								disableElevation
							>
								{translate('send')}
							</Button>
						</form>
					</div>
				</div>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right'
					}}
					open={this.props.resetPasswordState.open}
					autoHideDuration={6000}
					onClose={this.handleClose}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">{this.props.resetPasswordState.error}=</span>}
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

export const mapStateToProps = (state) => {
	return {
		resetPasswordState: state.resetPassword
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		passwordResetter: (userPassword, history) => dispatch(resetPasswordAction(userPassword, history)),
		closeMessage: () => dispatch(closeMessage())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword))