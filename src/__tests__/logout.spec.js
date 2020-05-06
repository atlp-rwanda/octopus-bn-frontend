import DrawerComponents from '../components/DrawerComponents';
import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import userEvent from '@testing-library/user-event';
import IntlProvider from '../languages/components/IntlProvider';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const DrawerComponent = () => {
	return render(
		<Provider store={store}>
			<IntlProvider>
				<Router>
					<DrawerComponents />
				</Router>
			</IntlProvider>
		</Provider>
	);
};

describe('LOST', () => {
	afterEach(cleanup);
	it('should render Drawer component', () => {
		const { asFragment } = DrawerComponent();
		expect(asFragment(<DrawerComponents />)).toMatchSnapshot();
	});
	it('should logout user', () => {
		const { getByLabelText, getByText, container, debug } = DrawerComponent();
		const logoutClick = getByLabelText('logoutClick');
		userEvent.click(logoutClick);
		expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
		expect(Object.keys(localStorage.__STORE__).length).toBe(0);
		waitFor(() => expect(getByText('Sign In')).toBeTruthy());
	});
});
