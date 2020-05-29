import React, { Component } from 'react';
import { render} from '@testing-library/react';
import HomeTopView from '../views/Dashboard/HomeTopView';


const HomeTopViewComponent = () => {
	return render(

	   <HomeTopView />
	);
};
describe('Profile Component', () => {
	it('should render profile aligner properly', () => {
		const { asFragment } = HomeTopViewComponent();
		expect(asFragment(<HomeTopView/>)).toMatchSnapshot();
    });
});
