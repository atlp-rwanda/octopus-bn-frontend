import dateConverter from '../utils/DateConverter';

describe('Date convert util file', () => {
    it('Should test the function', () => {
        const dateToBeConverted = 'Fri Jan 01 1993 02:00:00 GMT+0200 (Africa Cairo Standard Time)';
        const expectedFormat = '01-01-1993';
        expect(dateConverter(dateToBeConverted)).toEqual(expectedFormat);
    })

});
