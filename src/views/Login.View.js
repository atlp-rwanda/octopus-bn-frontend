import React, { Component, useContext } from 'react';
import Styles from '../styles/entry.module.css';
import SvgMap from '../components/SvgMap';
import LoginForm from '../components/LoginForm';
import translate from '../languages/translate';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
	constructor(props) {
		super(props);
    }
	render() {
		const token = localStorage.getItem('bn-token');
		const user = localStorage.getItem('bn-user-data');
		if(token){
			return <Redirect to='/dashboard' />
		}
		return (
			<div className={Styles.container}>
				<SvgMap />
				<div className={Styles.side}>
					<div className={Styles.text_wrap}>
						<h1>Barefoot Nomad</h1>
						<p>{translate('bn-value')}</p>
					</div>
				</div>
				<LoginForm />
			</div>
		);
	}
}
