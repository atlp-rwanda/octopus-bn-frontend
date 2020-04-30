import React, { Component, useContext } from 'react';
import Styles from '../styles/entry.module.css';
import SvgMap from '../components/SvgMap';
import LoginForm from '../components/LoginForm';
import translate from '../languages/translate';

export default class Login extends Component {
	constructor(props) {
		super(props);
    }
	render() {
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
