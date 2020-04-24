import { SET_LANGUAGE } from '../types/languageTypes';
import processLocale from '../../languages/helper/processLocale';

const loginLocale = JSON.parse(localStorage.getItem('bn-user-data'));

let locale;
if (loginLocale) {
	locale = loginLocale.preferedLang;
} else {
	locale = navigator.language;
}

const data = processLocale(locale);

const { lang, englishColor, frenchColor } = data;

const initialState = {
	messages: lang,
	locale: locale,
	englishColor: englishColor,
	frenchColor: frenchColor
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_LANGUAGE:
			return {
				messages: action.payload.messages,
				locale: action.payload.locale,
				englishColor: action.payload.englishColor,
				frenchColor: action.payload.frenchColor
			};
		default:
			return state;
	}
};

export default reducer;
