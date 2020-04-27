import { English, French } from '../messages';
const processLocale = (locale) => {
	let lang;
	let englishColor;
	let frenchColor;
	if (String(locale).substr(0, 2) == 'en') {
		lang = English;
		englishColor = 'primary';
		frenchColor = 'default';
	} else if (String(locale).substr(0, 2) == 'fr') {
		lang = French;
		frenchColor = 'primary';
		englishColor = 'default';
	} else {
		lang = English;
		englishColor = 'primary';
		frenchColor = 'default';
	}
	const data = { lang, englishColor, frenchColor };
	return data;
};

export default processLocale;
