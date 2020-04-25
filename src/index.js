import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import './styles/styles.scss';
import IntlProvider from './languages/components/IntlProvider';
import store from './redux/store';
import { Provider } from 'react-redux';
import {theme} from "./theme";

ReactDOM.render(
	<ThemeProvider theme={theme}>
		{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
		<CssBaseline />
		<Provider store={store}>
			<IntlProvider>
				<App />
			</IntlProvider>
		</Provider>
	</ThemeProvider>,
	document.querySelector('#root')
);
