import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import '../src/styles/styles.scss';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './redux/store';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<Routes />
				</Router>
			</Provider>
		);
	}
}

export default App;
