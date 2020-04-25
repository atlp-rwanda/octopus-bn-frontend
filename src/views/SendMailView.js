import React  from 'react';
import styles from '../styles/entry.module.css';
import SvgMap from '../components/SvgMap';
import SendResetEmail from '../components/SendResetEmail';
import LanguageButtons from '../components/LanguageButtons';
import translate from '../languages/translate';

export const SendResetEmailView = () =>{
    return (
        <div className={styles.container}>
				<SvgMap />
				<div className={styles.side}>
					<div className={styles.text_wrap}>
						<h1>Barefoot Nomad</h1>
						<p>{translate('bn-value')}</p>
					</div>
				</div>
				<SendResetEmail />
		</div>
    )
};

export const PasswordResetProcess = () => {
	return (
	  <div className={styles.container}>
		<div className={styles.side}>
		  <div className={styles.text_wrap}>
			<h1>Barefoot Nomad</h1>
			<p>Making company travel and accommodation easy and convenient.</p>
		  </div>
		</div>
		<SvgMap />
		<div className={styles.forms}>
			<LanguageButtons/>
		  <div className={styles.text_wrap}>
			<p className={styles.fs_confirm}>
			  {translate('process-message')}
			</p>
		  </div>
		</div>
	  </div>
	);
};



