import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from '../../styles/dashboard.requests.module.css';
import { connect } from 'react-redux';
import NewTripRequest from '../../components/NewTripRequest'


class NewRequestTripView extends React.Component {
	render() {
		return (
			<div>
				<div className={styles.topIntro}>
					<div className={styles.left}>
						<p className={styles.title}>Dashboard - New Trip Request</p>
						<p className={styles.sub_title}>Travel made easy - Barefoot Nomad</p>
					</div>
				</div>
				<div className={styles.table}>
					<NewTripRequest/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loginState: state.login
	};
};



export default withRouter(connect(mapStateToProps, null)(NewRequestTripView));