import React, { Component } from 'react';
import translate from '../languages/translate';

export default class Dashboard extends Component {
	render() {
		return (
			<div>
				<h1>{translate('bn-value')}</h1>
			</div>
		);
	}
}
