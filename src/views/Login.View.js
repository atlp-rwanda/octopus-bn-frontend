import React, { Component } from 'react';
import styles from '../styles/entry.module.css';
import SvgMap from '../components/SvgMap';
import LoginForm from '../components/LoginForm';

export default class Login extends Component {
	render() {
		return (
			<div className={styles.container}>
				<SvgMap />
				<div className={styles.side}>
					<div className={styles.text_wrap}>
						<h1>Barefoot Nomad</h1>
						<p>Making company travel and accommodation easy and convenient.</p>
					</div>
				</div>
				<LoginForm />
			</div>
		);
	}
}
