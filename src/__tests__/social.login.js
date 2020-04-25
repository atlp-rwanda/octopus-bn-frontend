import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import userEvent from '@testing-library/user-event';
import IntlProvider from '../languages/components/IntlProvider';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import SocialLogin from '../helpers/SocialLogin';


const SocialLoginComponent = () => {
	return render(
		<Provider store={store}>
			<IntlProvider>
				<Router>
					<SocialLogin />
				</Router>
			</IntlProvider>
		</Provider>
	);
};

describe('SOCIAL LOGIN', () => {
	const {location } = window;
	beforeAll(()=>{
		delete window.location;
    	window.location = { assign: jest.fn() };
	})

	afterAll(()=>{
		cleanup;
		window.location = location;
	});
    it('should render social call back component', () => {
		const { asFragment } = SocialLoginComponent();
		expect(asFragment(<SocialLogin />)).toMatchSnapshot();
	});
});
