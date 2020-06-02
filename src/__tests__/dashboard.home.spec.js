import Home from '../components/Home';
import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import userEvent from '@testing-library/user-event';
import IntlProvider from '../languages/components/IntlProvider';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const HomeComponent = () => {
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

describe('Home component', () => {
	afterEach(cleanup);
	it('Should render home component properly', () => {
		const { asFragment } = HomeComponent();
		expect(asFragment(<Home />)).toMatchSnapshot();
	});
	it("should simulate click event on paginator", () => {
		const { getByTestId } = HomeComponent();
		const paginate = getByTestId("paginator")
		fireEvent.change(paginate, { target: { page: 5 } })
	  });
	
});
