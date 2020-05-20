import PasswordResetEmail from '../views/PasswordResetEmail';

import React from 'react';
import { render, fireEvent, cleanup, waitFor, waitForElement } from '@testing-library/react';
import Login from '../views/Login.View';
import Svg from '../components/SvgMap';
import { Provider } from 'react-redux';
import store from '../redux/store';
import userEvent from '@testing-library/user-event';
import IntlProvider from '../languages/components/IntlProvider';
import { createMemoryHistory } from 'history';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const PasswordResetEmailComponent = () => {
	return render(
		<Provider store={store}>
			<IntlProvider>
				<Router>
					<PasswordResetEmail />
				</Router>
			</IntlProvider>
		</Provider>
	);
};
describe('RESET', () => {
	afterEach(cleanup);
	it('should render reset password component', () => {
		const { asFragment } = PasswordResetEmailComponent();
		expect(asFragment(<PasswordResetEmail />)).toMatchSnapshot();
	});
	it('should be able to handle change', () => {
		const { getByLabelText, getByText, container, debug } = PasswordResetEmailComponent();
		const email = getByLabelText('email');
		userEvent.type(email, 'email@gmail.com');
		expect(email.value).toBe('email@gmail.com');
	});
	it('should be returning error when submitting without providing email', async () => {
		const { getByLabelText, getByText, getByTestId, container, debug } = PasswordResetEmailComponent();
		const form = container.querySelector('form');
		form.dispatchEvent(new Event('submit'));
		waitFor(() => expect(getByText('Requires valid email')).toBeTruthy());
	});
	it('should be returning error when submitting providing an email which is not in the system', async () => {
		const { getByLabelText, getByText, getByTestId, container, debug } = PasswordResetEmailComponent();
		const email = getByLabelText('email');
		userEvent.type(email, 'email@gmail.com');
		const form = container.querySelector('form');
		form.dispatchEvent(new Event('submit'));
		waitFor(() => expect(getByText("The provided email don't exist, create an account")).toBeTruthy());
		waitForElement(() => fireEvent.click(getByLabelText('Close')));
	});
	it('should allow', async () => {
		const { getByLabelText, getByText, getByTestId, container, debug } = PasswordResetEmailComponent();
		const email = getByLabelText('email');
		userEvent.type(email, 'PO@gmail.com');
		const form = container.querySelector('form');
		form.dispatchEvent(new Event('submit'));
		waitFor(() =>
			expect(
				getByText(
					'We’ve emailed you instructions for setting a new password if an account exists with the email you entered. You should receive them shortly.'
				)
			).toBeTruthy()
		);
	});
});
