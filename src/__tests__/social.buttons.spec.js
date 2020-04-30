import SocialButtons from '../components/SocialButtons';
import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import userEvent from '@testing-library/user-event';
import IntlProvider from '../languages/components/IntlProvider';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import SocialLogin from '../helpers/SocialLogin';

const SocialButtonsComponent = () => {
	return render(
		<Provider store={store}>
			<IntlProvider>
				<Router>
					<SocialButtons />
				</Router>
			</IntlProvider>
		</Provider>
	);
};


describe('LOST', () => {
	afterEach(cleanup);
	it('should render social buttons', () => {
		const { asFragment } = SocialButtonsComponent();
		expect(asFragment(<SocialButtons />)).toMatchSnapshot();
	});
	it('should click the gmail login button', () => {
		const { getByLabelText } = SocialButtonsComponent();
		const gmail = getByLabelText('Google');
		fireEvent.click(gmail);
	});
	it('should click the facebook login button', (done) => {
		const { getByLabelText } = SocialButtonsComponent();
		const facebook = getByLabelText('Facebook');
		fireEvent.click(facebook);
		done();
	});
});
