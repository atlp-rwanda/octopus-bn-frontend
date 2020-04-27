import axios from 'axios';

export default {
	user: {
		signup: (user) =>
			axios
				.post('https://octopus-bn-backend.herokuapp.com/api/v1/auth/signup', {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					password: user.password
				})
				.then((res) => res.data.user)
	}
};
