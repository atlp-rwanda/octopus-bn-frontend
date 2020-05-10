import React  from 'react';
import styles from '../styles/entry.module.css';
import SvgMap from '../components/SvgMap';
import ResetPassword from '../components/ResetPassword';
import translate from '../languages/translate';

export const ResetPasswordView = () =>{
    return (
        <div className={styles.container}>
				<SvgMap />
				<div className={styles.side}>
					<div className={styles.text_wrap}>
						<h1>Barefoot Nomad</h1>
						<p>{translate('bn-value')}</p>
					</div>
				</div>
				<ResetPassword />
		</div>
    )
};