import { encode, decode } from '../utils/jwtTokenizer';
import { claims, mockToken } from '../__mocks__/tokenMocks';

describe('JSON web token', () => {
	it('should return JSON web token', () => {
		const token = encode(claims);
		expect(token).toEqual(token);
	});
	it('should return object including claims', () => {
		const payload = decode(mockToken);
		expect(payload).toEqual(payload);
	});
});
