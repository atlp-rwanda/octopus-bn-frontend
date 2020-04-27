import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

class Provider extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<IntlProvider locale={this.props.languageState.locale} messages={this.props.languageState.messages}>
				{this.props.children}
			</IntlProvider>
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
		setLanguage: (language) => dispatch(loginAction(language))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Provider);
