import Home from '../views/Dashboard/Home';
import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import userEvent from '@testing-library/user-event';
import IntlProvider from '../languages/components/IntlProvider';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const LostComponent = () => {
	return render(
		<Provider store={store}>
			<IntlProvider>
				<Router>
					<Home />
				</Router>
			</IntlProvider>
		</Provider>
	);
};

describe('LOST', () => {
	afterEach(cleanup);
	it('should render ResponsiveDrawer component', () => {
		const { asFragment } = LostComponent();
		expect(asFragment(<Home />)).toMatchSnapshot();
	});
});
