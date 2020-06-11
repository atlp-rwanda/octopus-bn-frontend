import React from 'react';
import clsx from 'clsx';
import { Check } from '@material-ui/icons'
import { useQontoStepIconStyles } from '../styles/stepperStyles'



export const QontoStepIcon = props => {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}


export const getSteps = () => {
  return [
    'Trip Info',
    'Dates/Stops',
    'Reason',
  ];
}



