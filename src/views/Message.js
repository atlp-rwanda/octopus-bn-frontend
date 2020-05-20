import React from 'react';
import styles from '../styles/signup.module.css';
import Svg from '../components/SvgMap';
import translate from '../languages/translate';
import LanguageButtons from '../components/LanguageButtons';
import { withRouter } from 'react-router-dom';
import { BrowserRouter, Link, Redirect } from 'react-router-dom';

const Message = (props) => {
	const state = props.location.state;
	return (
		<div className={styles.container}>
			<div className={styles.side}>
				<div className={styles.text_wrap}>
					<h1>Barefoot Nomad</h1>
					<p>{translate('bn-value')}</p>
				</div>
			</div>
			<Svg />
			<div className={styles.forms}>
				<LanguageButtons />
				<div className={styles.text_wrap}>
					<div className={styles.fs_confirm} style={{ marginTop: '360px', fontSize: '1.1em' }}>
						{state.message.length != 0 && (
							<div>
								{translate(state.message)},{' '}
								{state.next && (
									<Link className={styles.linkLabel} to={state.next}>
										{translate(state.label)}
									</Link>
								)}
							</div>
						)}
						{}
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Message);
