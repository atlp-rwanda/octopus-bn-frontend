import ResetPassword from '../views/ResetPassword';

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

const ResetPasswordComponent = () => {
	return render(
		<Provider store={store}>
			<IntlProvider>
				<Router>
					<ResetPassword />
				</Router>
			</IntlProvider>
		</Provider>
	);
};
describe('RESET', () => {
	afterEach(cleanup);
	it('should render reset password component', () => {
		const { asFragment } = ResetPasswordComponent();
		expect(asFragment(<ResetPassword />)).toMatchSnapshot();
	});
	it('should present a user with an error if password is not strong', () => {
		const { getByLabelText, getByText, container, debug } = ResetPasswordComponent();
		const newPassword = getByLabelText('newPassword');
		const form = container.querySelector('form');
		userEvent.type(newPassword, 'password');
		form.dispatchEvent(new Event('submit'));
		const style = window.getComputedStyle(getByText('At least 8 character/one uppercase/one special character'));
		expect(style.color).toBe('rgb(244, 67, 54)');
	});
	it("should present a user with an error if the new password doesn't match the confirm password", () => {
		const { getByLabelText, getByText, container, debug } = ResetPasswordComponent();
		const newPassword = getByLabelText('newPassword');
		const confirmPassword = getByLabelText('confirmPassword');
		const form = container.querySelector('form');
		userEvent.type(newPassword, 'Octopus@100');
		userEvent.type(confirmPassword, 'Octopus#100');
		form.dispatchEvent(new Event('submit'));
		const style = window.getComputedStyle(getByText('Must match your password'));
		expect(style.color).toBe('rgb(244, 67, 54)');
	});
	it('should go on without an error', () => {
		const { getByLabelText, getByText, container, debug } = ResetPasswordComponent();
		const newPassword = getByLabelText('newPassword');
		const confirmPassword = getByLabelText('confirmPassword');
		const form = container.querySelector('form');
		userEvent.type(newPassword, 'Octopus@100');
		userEvent.type(confirmPassword, 'Octopus@100');
		form.dispatchEvent(new Event('submit'));
	});
});
