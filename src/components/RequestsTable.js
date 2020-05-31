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

import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
		overflowX: 'auto'
	},
	table: {
		minWidth: 650
	},
	input: {
		marginLeft: theme.spacing(1),
		width: 650 / 2,
		flex: 1
	},
	iconButton: {
		padding: 10
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
	},
	search: {
		position: 'absolute',
		right: 0,
		marginRight: theme.spacing(5)
	}
}));

const RequestsTable = () => {
	const [ loading, setLoading ] = React.useState(false);
	const [ search, setSearch ] = React.useState(false);
	const [ results, setResults ] = React.useState({});
	const requests = useSelector((state) => state.requests);
	let rows = {};
	const handleSearchChange = (event) => {
		setSearchKey(event.target.value);
		setSearch(true);

		try {
			var results = [];
			const toSearch = trimString(searchKey); // trim it
			for (var i = 0; i < rows.length; i++) {
				for (var key in rows[i]) {
					if (rows[i][key] != null) {
						if (rows[i][key].indexOf(toSearch) != -1) {
							if (!itemExists(results, rows[i])) results.push(rows[i]);
						}
					}
				}
			}
			setResults(results);
		} catch (error) {
			console.log(error);
		}
	};
	console.log(loading);
	try {
		if (requests.loading == 'none') {
			rows = requests.requests.data.data;
		}
	} catch (error) {
		console.log(error.message);
	}

	const classes = useStyles();
	const [ page, setPage ] = React.useState(0);
	const [ searchKey, setSearchKey ] = React.useState('');
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const trimString = (s) => {
		var l = 0,
			r = s.length - 1;
		while (l < s.length && s[l] == ' ') l++;
		while (r > l && s[r] == ' ') r -= 1;
		return s.substring(l, r + 1);
	};

	const compareObjects = (o1, o2) => {
		var k = '';
		for (k in o1) if (o1[k] != o2[k]) return false;
		for (k in o2) if (o1[k] != o2[k]) return false;
		return true;
	};

	const itemExists = (haystack, needle) => {
		for (var i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
		return false;
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Paper className={classes.root}>
			{console.log(results)}
			<Toolbar className={classes.Toolbar}>
				<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
					My request
				</Typography>
				<div className={classes.search}>
					<TextField
						id="filled-search"
						label="Search Here..."
						inputProps={{ 'aria-label': 'search google maps' }}
						className={classes.input}
						onChange={handleSearchChange}
						value={searchKey}
						variant="standard"
					/>
					{/* <InputBase
						variant="outlined"
					
						placeholder="S"
						
					/> */}
					<IconButton
						type="submit"
						className={classes.iconButton}
						aria-label="search"
						onClick={handleSearchChange}
					>
						<SearchIcon />
					</IconButton>
				</div>
			</Toolbar>
			<Table className={classes.table} aria-label="caption table">
				<TableHead>
					<TableRow>
						<TableCell>Type</TableCell>
						<TableCell align="center">From</TableCell>
						<TableCell align="center">To</TableCell>
						<TableCell align="center">Departure Date</TableCell>
						<TableCell align="center">Return Date</TableCell>
						<TableCell align="center">Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{search === false ? rows.length >= 1 ? (
						(rowsPerPage > 0
							? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: rows).map((row) => (
							<TableRow key={row.id} hover style={{ cursor: 'pointer' }}>
								<TableCell component="th" scope="row">
									{row.type}
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
								You have no Requests
							</TableCell>
						</TableRow>
					) : results.length >= 1 ? (
						(rowsPerPage > 0
							? results.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: results).map((row) => (
							<TableRow key={row.id} hover style={{ cursor: 'pointer' }}>
								<TableCell component="th" scope="row">
									{row.type}
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
					) : (
						<TableRow>
							<TableCell colspan="6" align="center">
								You have no Requests with that keyword
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[ 5, 10, 25 ]}
				component="div"
				count={search === true ? results.length : rows.length || 0}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};

export default RequestsTable;
