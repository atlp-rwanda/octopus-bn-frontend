import React, { Component, useContext } from 'react';
import Styles from '../styles/entry.module.css';

import LoginForm from '../components/LoginForm';
import translate from '../languages/translate';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={Styles.container}>
				<LoginForm />
			</div>
		);
	}
}
