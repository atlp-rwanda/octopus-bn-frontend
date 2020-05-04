import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { withRouter, Redirect } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	grow: {
		flexGrow: 1
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto'
		}
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch'
		}
	},
	logout: {
		position: 'absolute',
		bottom: 0,
		width: drawerWidth
	}
}));

const DrawerComponents = ({ history, ...props }) => {
	const routes = [
		{ key: 'Dashboard', text: 'Dashboard', to: '/dashboard', icon: <HomeIcon /> },
		{ key: 'Requests', text: 'My Requests', to: '/requests', icon: <FlightTakeoffIcon /> }
	];
	const classes = useStyles();
	const logout = () => {
		localStorage.removeItem('bn-user-data');
		localStorage.removeItem('bn-token');
		history.push('/');
	};
	return (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{routes.map((element) => (
					<Link to={element.to} style={{ textDecoration: 'none', color: '#000000' }} key={element.key}>
						<ListItem button>
							<ListItemIcon>{element.icon}</ListItemIcon>
							<ListItemText primary={element.text} />
						</ListItem>
					</Link>
				))}
			</List>

			<div className={classes.logout} onClick={() => logout()} aria-label="logoutClick">
				<Divider />
				<ListItem button key="Logout">
					<ListItemIcon>
						<PowerSettingsNewIcon />
					</ListItemIcon>
					<ListItemText primary="Logout" />
				</ListItem>
			</div>
		</div>
	);
};

export default withRouter(DrawerComponents);
