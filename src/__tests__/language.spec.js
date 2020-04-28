import processLocale from '../languages/helper/processLocale';

describe('LANGUAGE', () => {
	it('should change language to french', () => {
		const data = processLocale('fr');
		expect(data).toHaveProperty('lang', 'englishColor', 'frenchColor');
		expect(data.frenchColor).toEqual('primary');
    });
    it('should change language to english', () => {
		const data = processLocale('en');
		expect(data).toHaveProperty('lang', 'englishColor', 'frenchColor');
		expect(data.englishColor).toEqual('primary');
    });
    it('should change language to english even when called with no species locale', () => {
		const data = processLocale();
		expect(data).toHaveProperty('lang', 'englishColor', 'frenchColor');
		expect(data.englishColor).toEqual('primary');
	});
});
