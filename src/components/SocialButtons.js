import React, { Component } from 'react';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import Button from '@material-ui/core/Button';
export default class SocialButtons extends Component {
	constructor(props) {
		super(props);
	}
	facebookRedirect = () => {
		window.location.assign('https://octopus-bn-backend.herokuapp.com/api/v1/auth/facebook');
	};
	googleRedirect = () => {
		window.location.assign('https://octopus-bn-backend.herokuapp.com/api/v1/auth/google');
	};
	render() {
		return (
			<div>
				<Button
					variant="contained"
					style={{ textTransform: 'capitalize', marginRight: '20px', width: '136px' }}
					color="secondary"
					startIcon={<FaGoogle />}
					disableElevation
					aria-label="Google"
					onClick={() => this.googleRedirect()}
				>
					Google
				</Button>
				<Button
					variant="contained"
					color="primary"
					startIcon={<FaFacebookF />}
					style={{ textTransform: 'capitalize', marginLeft: '20px', width: '136px' }}
					disableElevation
					aria-label="Facebook"
					onClick={() => this.facebookRedirect()}
				>
					Facebook
				</Button>
			</div>
		);
	}
}
