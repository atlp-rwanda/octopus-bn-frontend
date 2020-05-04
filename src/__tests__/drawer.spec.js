import ResponsiveDrawer from '../components/ResponsiveDrawer';
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
					<ResponsiveDrawer />
				</Router>
			</IntlProvider>
		</Provider>
	);
};

describe('LOST', () => {
	afterEach(cleanup);
	it('should render ResponsiveDrawer component', () => {
		const { asFragment } = LostComponent();
		expect(asFragment(<ResponsiveDrawer />)).toMatchSnapshot();
	});
});
