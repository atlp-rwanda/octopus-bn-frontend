import { Route, MemoryRouter } from 'react-router-dom';
import Message from '../views/Message';
import { render, fireEvent, cleanup, waitFor, waitForElement } from '@testing-library/react';
import React from 'react';

const renderWithRouter = (Message) =>
	render(
		<MemoryRouter state={{ message: 'password_reset', next: '/', label: 'sign-in-click' }}>
			<Route path="/message">{Message}</Route>
		</MemoryRouter>
	);

describe('RESET', () => {
	afterEach(cleanup);
	it('should render reset password component', () => {
		const { asFragment } = renderWithRouter();
		expect(asFragment(<Message />)).toMatchSnapshot();
	});
});
