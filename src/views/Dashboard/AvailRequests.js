import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import styles from '../../styles/dashboard.requests.module.css';
import AvailRequestsTable from '../../components/AvailRequestsTable';
import { connect } from 'react-redux';
import { getRequestsAction } from '../../redux/actions/AvailRequestsActions';
import { withRouter } from 'react-router-dom';

class AvailRequests extends Component {
	componentDidMount() {
		this.props.getRequestsAction();
	}
	render() {
		return (
			<div>
				<div className={styles.topIntro}>
					<div className={styles.left}>
						<p className={styles.title}>Dashboard - AVAIL REQUESTS</p>
						<p className={styles.sub_title}>Travel made easy - Barefoot Nomad</p>
					</div>
					<div className={styles.right}>
						<Button
							variant="contained"
							className={styles.button}
							color="primary"
							startIcon={<FlightTakeoffIcon />}
						>
							Request Travel
						</Button>
					</div>
				</div>
				<div className={styles.table}>
					<AvailRequestsTable />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loginSate: state.login
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getRequestsAction: () => dispatch(getRequestsAction())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AvailRequests));
