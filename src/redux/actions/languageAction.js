import { SET_LANGUAGE } from '../types/languageTypes';
import processLocale from '../../languages/helper/processLocale';

export const setLocale = (newLocale) => async (dispatch) => {
	const data = processLocale(newLocale);
	const { lang, englishColor, frenchColor } = data;
	dispatch(setLanguage({ locale: newLocale, messages: lang, frenchColor, englishColor }));
};

export const setLanguage = (languageSettings) => {
	return {
		type: SET_LANGUAGE,
		payload: languageSettings
	};
};
