import React from "react";
import {Link, HashRouter as Router, withRouter} from 'react-router-dom';
import {TextField, Button, Snackbar, ThemeProvider} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import isEmail from "validator/lib/isEmail";
import { LinearProgress, IconButton } from "@material-ui/core";
import styles from "../styles/sendmail.module.css"; 
import {LabelTheme} from '../theme';
import { connect } from "react-redux";
import {sendMailAction, closeMessage} from '../redux/actions/SendMailAction';
import translate from '../languages/translate'
import LanguageButtons from './LanguageButtons';



	
class SendResetEmail  extends React.Component{

    constructor(props) {
		super(props);
		this.state = {
			email: '',
			emailError: '',
			emailErrorStatus: false,
			open: false,
			errorMessage: ''
		};
    }
	validate = () => {
		let isError = false;
		const errors = {
			emailError: '',
			emailErrorStatus: false,
		};

		if (!isEmail(this.state.email)) {
			isError = true;
			errors.emailErrorStatus = true;
			errors.emailError = translate('valid-mail');
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
			};
			await this.props.sendMail(send, this.props.history);
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
					<div style={{ display: this.props.sendEmailState.loading }}>
						<LinearProgress />
					</div>
					<LanguageButtons />

					<div className={styles.wrap}>
						<div className={styles.form_top_text}>
							<p className={styles.fs_title}>{translate('password-gone')}</p>
							<p className={styles.fs_subtitle}>{translate('link-promise')}</p>
						</div>
						<form className="form" onSubmit={(e) => this.onSubmit(e)} aria-label="form">
							<ThemeProvider theme={LabelTheme}>
								<TextField
									error={this.state.emailErrorStatus}
									className={styles.inputs}
									name="email"
									type="email"
									InputProps={{ 
										"aria-label": "email",
										"data-testid": "email-input"
									}}
									label={translate('email')}
									variant="outlined"
									helperText={this.state.emailError}
									value={this.state.email}
									onChange={(e) => this.change(e)}
								/>
							</ThemeProvider>
							<div className={styles.link_container}>
							<Link to="/signup" className={styles.link} >
									{translate('no-account')}
							</Link>
							</div>
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
					open={this.props.sendEmailState.open}
					autoHideDuration={6000}
					onClose={this.handleClose}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">{translate('user-exists-not')}</span>}
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
		sendEmailState: state.sendEmail
	};
};

export const mapDispatchToProps = (dispatch) => {
	return {
		sendMail: (userEMail, history) => dispatch(sendMailAction(userEMail, history)),
		closeMessage: () => dispatch(closeMessage())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SendResetEmail))