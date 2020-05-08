import React, { Component } from 'react';
import { render} from '@testing-library/react';
import ProfileAligner from '../views/Dashboard/ProfileAligner';


const ProfileAlignerComponent = () => {
	return render(

	   <ProfileAligner />
	);
};
describe('Profile Component', () => {
	it('should render profile aligner properly', () => {
		const { asFragment } = ProfileAlignerComponent();
		expect(asFragment(<ProfileAligner/>)).toMatchSnapshot();
    });
});
