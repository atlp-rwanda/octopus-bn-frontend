import React, { Component } from 'react';
import SvgLost from '../components/SvgLost';
import { Link } from 'react-router-dom';
import styles from '../styles/svg.lost.module.css';
import translate from '../languages/translate';
export default class Lost extends Component {
	render() {
		return (
			<div>
				<SvgLost />
				<p className={styles.text} aria-label= 'lost-text'>
				{translate('lost')}{' '}
					<Link to="/" className={styles.link}>
						Home
					</Link>
				</p>
			</div>
		);
	}
}
