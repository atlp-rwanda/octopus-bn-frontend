import React, { Component } from 'react';
import Chip from '@material-ui/core/Chip';
import ReactCountryFlag from 'react-country-flag';
import styles from '../styles/language.styles.module.css';
import { connect } from 'react-redux';
import { setLocale } from '../redux/actions/languageAction';

class LanguageButtons extends Component {
	constructor(props) {
		super(props);
	}

	buttonClickHandler = async (locale) => {
		await this.props.setLocale(locale);
	};
	render() {
		return (
			<div className={styles.container}>
				<div
					className={styles.langue_button}
					onClick={() => this.buttonClickHandler('en')}
					aria-label="english-button"
				>
					<Chip
						label="English"
						color={this.props.languageState.englishColor}
						variant="outlined"
						clickable
						icon={
							<ReactCountryFlag
								countryCode="US"
								style={{
									fontSize: '1.5em',
									lineHeight: '1.5em'
								}}
							/>
						}
					/>
				</div>
				<div
					className={styles.langue_button}
					onClick={() => this.buttonClickHandler('fr')}
					aria-label="french-button"
				>
					<Chip
						label="Français"
						variant="outlined"
						color={this.props.languageState.frenchColor}
						clickable
						icon={
							<ReactCountryFlag
								countryCode="FR"
								style={{
									fontSize: '1.5em',
									lineHeight: '1.5em'
								}}
							/>
						}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		languageState: state.language
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setLocale: (locale) => dispatch(setLocale(locale))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageButtons);
