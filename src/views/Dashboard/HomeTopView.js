import React from 'react';
import Button from '@material-ui/core/Button';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import classes from '../../styles/homeTopView.module.css'


const homeTopView = (props) => (
            <div className={classes.topIntro}>
                <div className={classes.left}>
                    <p className={classes.title}>Dashboard - {props.title}</p>
                    <p className={classes.sub_title}>Travel made easy - Barefoot Nomad</p>
                </div>
                <div className={classes.right}>
                    <Button
                        variant="contained"
                        className={classes.button}
                        color="primary"
                        startIcon={<FlightTakeoffIcon />}>
                        Request Travel
                    </Button>
                </div>
            </div>
    );

export default homeTopView;
