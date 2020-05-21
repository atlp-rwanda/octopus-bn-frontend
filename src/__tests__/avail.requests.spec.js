import React from 'react';
import { render, fireEvent, cleanup, waitFor, waitForElement } from '@testing-library/react';
import AvailRequests from '../views/Dashboard/AvailRequests';
import Svg from '../components/SvgMap';
import { Provider } from 'react-redux';
import store from '../redux/store';
import userEvent from '@testing-library/user-event';
import IntlProvider from '../languages/components/IntlProvider';
import { createMemoryHistory } from 'history';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const history = createMemoryHistory();
const AvailRequestsComponent = () => {
	return render(
		<Provider store={store}>
			<IntlProvider>
				<Router>
					<AvailRequests />
				</Router>
			</IntlProvider>
		</Provider>
	);
};
describe('AVAIL REQUEST', () => {
	afterEach(cleanup);
	it('should render login component', () => {
		const { asFragment } = AvailRequestsComponent();
		expect(asFragment(<AvailRequests />)).toMatchSnapshot();
	});
	it('should render login component', () => {
		const {
			getByLabelText,
			getByDisplayValue,
			getByText,
			getByTestId,
			container,
			debug
		} = AvailRequestsComponent();
		const next = getByLabelText('Next page');
		const prev = getByLabelText('Previous page');
		const row = getByLabelText('Rows per page:');
		fireEvent.click(next);
		fireEvent.click(prev);

		fireEvent.change(getByDisplayValue(/5/i), {
			target: { value: '10' }
		});
		expect(getByDisplayValue(/10/i)).toBeTruthy();
	});
});
