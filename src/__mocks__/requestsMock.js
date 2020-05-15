export const requestsMockData = {
	responseOnSuccess: {
		status: 200,
		message: 'Requests retrieved successfully',
		data: [
			{
				id: '72d85b25-16a7-444e-85b7-c6dbd9c5231e',
				type: 'return',
				from: 'rw - Kigali',
				to: 'USA - Texas',
				accommodation: 'yes',
				departureDate: '2020-08-11',
				returnDate: '2020-10-12',
				reason:
					'the employee needs to attend a conference where the presence of a company representative is needed',
				status: 'rejected',
				stops: [],
				manager: 'needs.grid@gmail.com',
				Comments: []
			},
			{
				id: '7bf6a30d-30a2-40f6-bad0-9e1e0afccc87',
				type: 'one way',
				from: 'rw - Kigali',
				to: 'kn - Nairobi',
				accommodation: 'yes',
				departureDate: '2020-08-17',
				returnDate: null,
				reason: 'me here testing the ug kampala thing',
				status: 'approved',
				stops: [],
				manager: 'needs.grid@gmail.com',
				Comments: []
			},
			{
				id: 'c068294b-14fc-439d-a109-4c0faefdbbae',
				type: 'one way',
				from: 'rw - Kigali',
				to: 'kn - Nairobi',
				accommodation: 'yes',
				departureDate: '2020-08-17',
				returnDate: null,
				reason: 'me here testing the ug kampala thing',
				status: 'pending',
				stops: [],
				manager: 'needs.grid@gmail.com',
				Comments: []
			},
			{
				id: 'a333ba60-2ea6-4a52-abab-0b2cc4a54b2f',
				type: 'multi city',
				from: 'Rw - Kigali',
				to: 'USA - Kigali',
				accommodation: null,
				departureDate: '2020-10-01',
				returnDate: null,
				reason: null,
				status: 'approved',
				stops: [
					{
						accommodation: 'yes',
						stopCountry: 'Ug',
						stopCity: 'Kigali',
						arrivalDate: '2020-10-01',
						departureDate: '2020-10-01',
						reason: "Visit company's offices in kampala"
					},
					{
						accommodation: 'yes',
						stopCountry: 'Et',
						stopCity: 'Addis Ababa',
						arrivalDate: '2020-10-01',
						departureDate: '2020-10-01',
						reason: 'Attend african union summit'
					},
					{
						accommodation: 'yes',
						stopCountry: 'USA',
						stopCity: 'Miami',
						arrivalDate: '2020-10-01',
						reason: 'Attend billing partners in miami'
					}
				],
				manager: 'needs.grid@gmail.com',
				Comments: []
			},
			{
				id: '11a82087-9790-48a1-82e7-59bc00a81535',
				type: 'return',
				from: 'rw - Kigali',
				to: 'USA - Texas',
				accommodation: 'yes',
				departureDate: '2020-08-11',
				returnDate: '2020-10-12',
				reason:
					'the employee needs to attend a conference where the presence of a company representative is needed',
				status: 'approved',
				stops: [],
				manager: 'needs.grid@gmail.com',
				Comments: []
			},
			{
				id: '94aa2e39-3904-4085-b855-1ff3e4fd61e2',
				type: 'one way',
				from: 'rw - Kigali',
				to: 'kn - Nairobi',
				accommodation: 'yes',
				departureDate: '2020-08-17',
				returnDate: null,
				reason: 'me here testing the ug kampala thing',
				status: 'approved',
				stops: [],
				manager: 'needs.grid@gmail.com',
				Comments: []
			},
			{
				id: '8c76b717-5411-4870-bdb0-c67aab4791b0',
				type: 'multi city',
				from: 'Rw - Kigali',
				to: 'USA - Kigali',
				accommodation: null,
				departureDate: '2020-10-01',
				returnDate: null,
				reason: null,
				status: 'approved',
				stops: [
					{
						accommodation: 'yes',
						stopCountry: 'Ug',
						stopCity: 'Kigali',
						arrivalDate: '2020-10-01',
						departureDate: '2020-10-01',
						reason: "Visit company's offices in kampala"
					},
					{
						accommodation: 'yes',
						stopCountry: 'Et',
						stopCity: 'Addis Ababa',
						arrivalDate: '2020-10-01',
						departureDate: '2020-10-01',
						reason: 'Attend african union summit'
					},
					{
						accommodation: 'yes',
						stopCountry: 'USA',
						stopCity: 'Miami',
						arrivalDate: '2020-10-01',
						reason: 'Attend billing partners in miami'
					}
				],
				manager: 'needs.grid@gmail.com',
				Comments: []
			},
			{
				id: 'b3accc33-b2d8-48bc-93b1-3eab7ef929e0',
				type: 'return',
				from: 'rw - Kigali',
				to: 'USA - Texas',
				accommodation: 'yes',
				departureDate: '2020-08-11',
				returnDate: '2020-10-12',
				reason:
					'the employee needs to attend a conference where the presence of a company representative is needed',
				status: 'approved',
				stops: [],
				manager: 'needs.grid@gmail.com',
				Comments: []
			}
		]
	},
	successAction: {
		loading: 'block',
		requests: [],
		error: '',
		open: false
	}
};
