import React, { Component } from 'react';
import { render} from '@testing-library/react';
import IntlProvider from '../languages/components/IntlProvider';
import store from '../redux/store';
import { Provider } from 'react-redux';
import ViewEditProfile from '../views/ViewEditProfile';


const ViewEditProfileComponent = () => {
	return render(
        <Provider store={store}>
			<IntlProvider>
					<ViewEditProfile />
			</IntlProvider>
        </Provider>
	);
};
describe('Profile Component', () => {
	it('should render profile component properly', () => {
		const { asFragment } = ViewEditProfileComponent();
		expect(asFragment(<ViewEditProfile />)).toMatchSnapshot();
    });
});
