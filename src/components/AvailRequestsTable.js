import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
		overflowX: 'auto'
	},
	table: {
		minWidth: 650
	},
	pending: {
		textTransform: 'uppercase',
		color: 'white',
		background: '#FEC400',
		border: 'none',
		opacity: '0.79'
	},
	rejected: {
		textTransform: 'uppercase',
		color: 'white',
		background: '#F12B2C',
		border: 'none',
		opacity: '0.79'
	},
	approved: {
		textTransform: 'uppercase',
		color: 'white',
		background: '#29CC97',
		border: 'none',
		opacity: '0.79'
	},
	progress: {
		position: 'absolute',
		marginRight: 'auto',
		marginLeft: 'auto',
		left: 0,
		right: 0
	}
}));

const TablePaginationActions = (props) => {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = (event) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
};

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired
};

const RequestsTable = () => {
	const requests = useSelector((state) => state.availRequests);
	let rows = {};
	try {
		if (requests.loading == 'none') {
			rows = requests.requests.data.data;
		}
	} catch (error) {
		console.log(error.message);
	}

	const classes = useStyles();
	const [ page, setPage ] = React.useState(0);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Paper className={classes.root}>
			<Toolbar>
				<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
					Avail requests
				</Typography>
			</Toolbar>
			<Table className={classes.table} aria-label="caption table">
				<TableHead>
					<TableRow>
						<TableCell>Type</TableCell>
						<TableCell align="center">By</TableCell>
						<TableCell align="center">From</TableCell>
						<TableCell align="center">To</TableCell>
						<TableCell align="center">Departure Date</TableCell>
						<TableCell align="center">Return Date</TableCell>
						<TableCell align="center">Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.length > 1 ? (
						(rowsPerPage > 0
							? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: rows).map((row) => (
							<TableRow key={row.id} hover style={{ cursor: 'pointer' }}>
								<TableCell component="th" scope="row">
									{row.type}
								</TableCell>
								<TableCell align="center">
									{' '}
									{row.User.firstName} {row.User.lastName}
								</TableCell>
								<TableCell align="center">{row.from}</TableCell>
								<TableCell align="center">{row.to}</TableCell>
								<TableCell align="center">{row.departureDate}</TableCell>
								<TableCell align="center">{row.returnDate}</TableCell>
								<TableCell align="center">
									{row.status == 'pending' ? (
										<Chip className={classes.pending} label={row.status} variant="outlined" />
									) : row.status == 'approved' ? (
										<Chip className={classes.approved} label={row.status} variant="outlined" />
									) : (
										<Chip className={classes.rejected} label={row.status} variant="outlined" />
									)}
								</TableCell>
							</TableRow>
						))
					) : requests.loading == 'block' ? (
						<TableRow>
							<TableCell colspan="6" align="center">
								<CircularProgress variant="indeterminate" disableShrink size={24} thickness={4} />
							</TableCell>
						</TableRow>
					) : (
						<TableRow>
							<TableCell colspan="6" align="center">
								You have no pending Requests for approval
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[ 5, 10, 25 ]}
				component="div"
				count={rows.length || 0}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default RequestsTable;
