import {decode, encode} from '../utils/tokenDecoder';

describe('Token decoder and encoder tests', () => {
    let token;
    const claims = {
        id: 1,
        email:'john@doe.com'
    };

    it('Should encode a token', () => {
        token = encode(claims);
        expect(token).toEqual(token);
    })
    it('Should decode a token', () => {
        const expectedClaims = decode(token);
        expect(expectedClaims).toBeInstanceOf(Object);
    })

});
