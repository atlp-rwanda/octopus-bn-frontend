import { encode } from '../utils/jwtTokenizer';

export const claims = {
	email: 'octopus@andela.com',
	userId: 'e80a1be0-428d-11ea-9434-ab08a1e03ed1'
};
export const unRegisteredClaims = {
	email: 'iamnotregistered@barefoot.com',
	userId: 'e80a1b34-128d-98ea-9434-ab01a1e03ed1'
};
export const mockToken = encode(claims);
export const unRegisteredToken = encode(unRegisteredClaims);
