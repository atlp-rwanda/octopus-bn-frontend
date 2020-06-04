import React from 'react';
import { render, fireEvent, cleanup, waitFor, waitForElement } from '@testing-library/react';
import AvailRequestsTable from '../components/AvailRequestsTable';
import Svg from '../components/SvgMap';
import { Provider } from 'react-redux';
import store from '../redux/store';
import userEvent from '@testing-library/user-event';
import IntlProvider from '../languages/components/IntlProvider';
import { createMemoryHistory } from 'history';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const history = createMemoryHistory();
const AvailRequestsTableComponent = () => {
	return render(
		<Provider store={store}>
			<IntlProvider>
				<Router>
					<AvailRequestsTable />
				</Router>
			</IntlProvider>
		</Provider>
	);
};
describe('AVAIL REQUEST', () => {
	afterEach(cleanup);
	it('should render login component', () => {
		const { asFragment } = AvailRequestsTableComponent();
		expect(asFragment(<AvailRequestsTable />)).toMatchSnapshot();
	});
});
