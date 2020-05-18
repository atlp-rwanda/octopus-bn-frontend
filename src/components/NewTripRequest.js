import React, { useState, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  FormHelperText,
  Dialog,
  DialogActions,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Snackbar,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import moment from 'moment'
import { Add, Delete, Close } from '@material-ui/icons'
import countriesList from "country-list";
import citiesList from "countries-cities";
import DateFnsUtils from '@date-io/date-fns';
import { v4 as uuid } from 'uuid'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import styles from '../styles/newtrip.module.css';
import { useStyles, modalStyles } from '../styles/stepperStyles'
import { newTripStateData, textFieldsValidator } from '../helpers/tripHelper';
import translate from '../languages/translate';
import { getSteps } from '../helpers/stepperHelper'
import {dateFormatter} from '../utils/dateFormatter';
import { multiCityAction, closeMessage } from '../redux/actions/multicityRequest'
import { nonMultiCityAction } from '../redux/actions/nonMultiCityAction'




const NewTripRequest = props => {

  const [state, setState] = useState({ ...newTripStateData })
  const errors = { ...textFieldsValidator };
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const steps = getSteps();
  const fromCities = citiesList.getCities(countriesList.getName(state.fromCountry));
  const toCities = citiesList.getCities(countriesList.getName(state.toCountry));
  const stopCities = citiesList.getCities(countriesList.getName(state.stopCountry));



  const stepOne = () => {
    return (
      <div className={styles.wrap1}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={styles.inputs}>
              <InputLabel id="demo-simple-select-outlined-label-1">Trip Type</InputLabel>
              <Select
                className={styles.text_field_styles}
                name="type"
                label="Trip Type"
                error={state.tripTypeErrorStatus}
                labelId="demo-simple-select-outlined-label-1"
                value={state.type}
                onChange={onChange}
              >
                <MenuItem value="one way">One Way</MenuItem>
                <MenuItem value="return">Two Way</MenuItem>
                <MenuItem value="multi city">Multi-City</MenuItem>
              </Select>
              <FormHelperText
                error={state.tripTypeErrorStatus}
                className={styles.helper_text_error}>
                {state.tripTypeError}
              </FormHelperText>
            </FormControl>

            <FormControl variant="outlined" className={styles.inputs}>
              <InputLabel id="demo-simple-select-outlined-label-2">Departure Country</InputLabel>
              <Select
                className={styles.text_field_styles}
                name="fromCountry"
                label="Departure Country"
                labelId="demo-simple-select-outlined-label-2"
                error={state.fromCountryErrorStatus}
                value={state.fromCountry}
                onChange={onChange}
              >
                {countriesList.getData().map((country) => (
                  <MenuItem key={country.name} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                error={state.fromCountryErrorStatus}
                className={styles.helper_text_error}>
                {state.fromCountryError}
              </FormHelperText>
            </FormControl>

            <FormControl variant="outlined" className={styles.inputs}>
              <InputLabel id="demo-simple-select-outlined-label-3">Departure City</InputLabel>
              <Select
                className={styles.text_field_styles}
                name="fromCity"
                label="Departure City"
                labelId="demo-simple-select-outlined-label-3"
                error={state.fromCityErrorStatus}
                value={state.fromCity}
                onChange={onChange}
              >
                {fromCities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}

              </Select>
              <FormHelperText
                error={state.fromCityErrorStatus}
                className={styles.helper_text_error}>
                {state.fromCityError}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl variant="outlined" className={styles.inputs}>
              <InputLabel id="demo-simple-select-outlined-label-6">Accommodation</InputLabel>
              <Select
                className={styles.text_field_styles}
                name="accommodation"
                label="Accommodation"
                labelId="demo-simple-select-outlined-label-6"
                error={state.accommodationErrorStatus}
                value={state.accommodation}
                onChange={onChange}
              >
                <MenuItem value="yes">Yes</MenuItem>
                <MenuItem value="no">No</MenuItem>
              </Select>
              <FormHelperText
                error={state.accommodationErrorStatus}
                className={styles.helper_text_error}>
                {state.accommodationError}
              </FormHelperText>
            </FormControl>

            <FormControl variant="outlined" className={styles.inputs}>
              <InputLabel id="demo-simple-select-outlined-label-4">Destination Country</InputLabel>
              <Select
                className={styles.text_field_styles}
                name="toCountry"
                label="Destination Country"
                labelId="demo-simple-select-outlined-label-4"
                error={state.toCountryErrorStatus}
                value={state.toCountry}
                onChange={onChange}
              >
                {countriesList.getData().map((country) => (
                  <MenuItem key={country.name} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                error={state.toCountryErrorStatus}
                className={styles.helper_text_error}>
                {state.toCountryError}
              </FormHelperText>
            </FormControl>

            <FormControl variant="outlined" className={styles.inputs}>
              <InputLabel id="demo-simple-select-outlined-label-5">Destination City</InputLabel>
              <Select
                className={styles.text_field_styles}
                name="toCity"
                label="Destination City"
                labelId="demo-simple-select-outlined-label-5"
                error={state.toCityErrorStatus}
                value={state.toCity}
                onChange={onChange}
              >
                {toCities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText
                error={state.toCityErrorStatus}
                className={styles.helper_text_error}>
                {state.toCityError}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );

  };


  const StopsWrapper = props => {

    const [stopsDiv, setStopsDiv] = useState([]);
    const { open, onClose } = props;
    const modalClasses = modalStyles()


    const handleConfirm = () => {

      if (activeStep === 1 && !state.stopCountry) {
        errors.stopCountryError = translate('stop-country-error');
        errors.stopCountryErrorStatus = true;
        return setState({ ...state, ...errors });
      }

      if (activeStep == 1 && !state.stopCity) {
        errors.stopCityError = translate('stop-city-error');
        errors.stopCityErrorStatus = true;
        return setState({ ...state, ...errors });
      }
      onClose()
    };

    

    const handleCancel = () => {
      const emptyStops = stopsDiv;
      emptyStops.length = 0
      setStopsDiv(emptyStops);
      onClose();
    }

    const showNextDiv = () => {

      setStopsDiv((stopsDiv) => [...stopsDiv, <div key={uuid()}>
        <FormControl variant="outlined" className={styles.inputs}>
          <InputLabel id="demo-simple-select-outlined-label-6">Accommodation</InputLabel>
          <Select
            className={styles.text_field_styles}
            name="accommodation"
            label="Accommodation"
            labelId="demo-simple-select-outlined-label-6"
            error={state.accommodationErrorStatus}
            value={state.accommodation}
            onChange={onChange}>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
          <FormHelperText
            error={state.accommodationErrorStatus}
            className={styles.helper_text_error}>
            {state.accommodationError}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined" className={styles.inputs}>
          <InputLabel id="demo-simple-select-outlined-label-8">Stop Country</InputLabel>
          <Select
            className={styles.stops_fields}
            name="stopCountry"
            error={state.stopCountryErrorStatus}
            label="Stop country"
            labelId="demo-simple-select-outlined-label-8"
            value={state.stopCountry}
            onChange={onChange}>
            {countriesList.getData().map((country) => (
              <MenuItem key={country.name} value={country.code}>
                {country.name}
              </MenuItem>
            ))}

          </Select>
          <FormHelperText
            error={state.stopCountryErrorStatus}
            className={styles.helper_text_error}>
            {state.stopCountryError}
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined" className={styles.inputs}>
          <InputLabel id="demo-simple-select-outlined-label-9">Stop City</InputLabel>
          <Select
            className={styles.stops_fields}
            name="stopCity"
            label="Stop City"
            labelId="demo-simple-select-outlined-label-9"
            error={state.stopCityErrorStatus}
            value={state.stopCity}
            onChange={onChange}>
            {stopCities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText
            error={state.stopCityErrorStatus}
            className={styles.helper_text_error}>
            {state.stopCityError}
          </FormHelperText>
        </FormControl>
      </div>

      ])
    };

    const removeItem = keyValue => {
      const filteredStops = stopsDiv.filter(value => value.key !== keyValue)
      setStopsDiv(filteredStops)
    }

    return (
      <Dialog
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        open={open}
        scroll="paper">

        <ListItem className={modalClasses.listItem}>
          <ListItemAvatar>
            <Avatar>
              <Add onClick={showNextDiv} className={modalClasses.addIcon} titleAccess="New Stopping Point" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText className={modalClasses.listItemText} primary={`${stopsDiv.length} stopping point(s) so far.`} />
        </ListItem>
        {stopsDiv.map((value) => (
          <div className={styles.stops_div_styles} key={value.key}>
            <div className={modalClasses.deleteOption}>
              <Delete className={modalClasses.deleteIcon} titleAccess="Remove" onClick={() => removeItem(value.key)} />
            </div>
            {value}
            <Divider variant="middle" />
          </div>
        ))}
        <DialogActions className={modalClasses.dialogActions}>
          <Button onClick={handleCancel} className={classes.button}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" autoFocus onClick={handleConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const ModalPopper = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div className={styles.modal_popper_styles}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Stopping Points
         </Button>
        <StopsWrapper open={open} onClose={handleClose}  keepMounted={true}/>
      </div>
    );
  }



  const stepTwo = () => {

    return (
      <div className={styles.wrap1}>
        <Grid container spacing={4} className={styles.dates_stops_grid}>
          <Grid item xs={6} className={styles.steptwo_gridstyles}>

            <div className={styles.stops_calendar_holder}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={styles.inputs}
                  disableToolbar
                  inputVariant="outlined"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="date-picker-inline-1"
                  label="Departure Date"
                  name='departureDate'
                  value={state.departureDate}
                  onChange={(date => setState({ ...state, departureDate: dateFormatter(date) }))}
                  error={state.departureDateErrorStatus}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
                <FormHelperText
                  error={state.departureDateErrorStatus}
                  className={styles.helper_text_error}
                >
                  {state.departureDateError}
                </FormHelperText>
              </MuiPickersUtilsProvider>
            </div>
          </Grid>

          {state.type === "return" ? (

            <Grid item xs={6} className={styles.steptwo_gridstyles}>
              <div className={styles.stops_calendar_holder}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={styles.inputs}
                    disableToolbar
                    inputVariant="outlined"
                    format="yyyy-MM-dd"
                    margin="normal"
                    name="returnDate"
                    id="date-picker-inline-2"
                    label="Return Date"
                    value={state.returnDate}
                    onChange={(date => setState({ ...state, returnDate: dateFormatter(date) }))}
                    error={state.returnDateErrorStatus}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                  <FormHelperText
                    error={state.returnDateErrorStatus}
                    className={styles.helper_text_error}
                  >
                    {state.returnDateError}
                  </FormHelperText>
                </MuiPickersUtilsProvider>
              </div>
            </Grid>
          ) : (null)}

          {state.type === 'multi city' ? <h4 className={styles.stops_title}>Stops</h4> : null}

          {state.type === 'multi city' ? <Grid item className={styles.stops_popper}>

            <div className={styles.stops_calendar_holder}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={styles.stops_inputs}
                  disableToolbar
                  inputVariant="outlined"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="date-picker-inline-3"
                  name="arrivalDate"
                  label="Arrival Date"
                  value={state.arrivalDate}
                  onChange={(date => setState({ ...state, arrivalDate: dateFormatter(date) }))}
                  error={state.arrivalDateErrorStatus}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
                <FormHelperText
                  error={state.arrivalDateErrorStatus}
                  className={styles.helper_text_error}>
                  {state.arrivalDateError}
                </FormHelperText>
              </MuiPickersUtilsProvider>
            </div>


            <div className={styles.stops_calendar_holder}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={styles.stops_inputs}
                  disableToolbar
                  inputVariant="outlined"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="date-picker-inline-4"
                  name="departureDate"
                  label="Departure Date"
                  value={state.secondDepartureDate}
                  onChange={(date => setState({ ...state, secondDepartureDate: dateFormatter(date) }))}
                  error={state.secondDepartureDateErrorStatus}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
                <FormHelperText
                  error={state.secondDepartureDateErrorStatus}
                  className={styles.helper_text_error}>
                  {state.secondDepartureDateError}
                </FormHelperText>
              </MuiPickersUtilsProvider>
            </div>

            <ModalPopper />
          </Grid> : null}

        </Grid>
      </div>
    );
  };


  const stepThree = () => {
    return (
      <div className={styles.wrap1}>
        <div className={styles.inputs}>
          <TextField
            className={styles.reason_area}
            id="outlined-multiline-static"
            label="Reason"
            multiline
            name="reason"
            error={state.reasonErrorStatus}
            helperText={state.reasonError}
            value={state.reason}
            onChange={onChange}
            rows={6}
            placeholder="Your trip's purpose..."
            variant="outlined"
          />
        </div>
      </div>
    );
  };


  const onChange = (e) => {
    e.persist();
    setState(state => ({ ...state, [e.target.name]: e.target.value }));
  }


  const handleNext = () => {

    // if (activeStep == 0 && !state.type) { // Step 1 valiations
    //   errors.tripTypeError = translate('trip-type-error');
    //   errors.tripTypeErrorStatus = true;
    //   return setState({ ...state, ...errors });
    // }

    // if (activeStep === 0 && !state.fromCountry) {
    //   errors.fromCountryError = translate('from-country-error');
    //   errors.fromCountryErrorStatus = true;
    //   return setState({ ...state, ...errors });
    // }

    // if (activeStep === 0 && !state.fromCity) {
    //   errors.fromCityError = translate('from-city-error');
    //   errors.fromCityErrorStatus = true;
    //   return setState({ ...state, ...errors });
    // }

    // if (activeStep === 0 && !state.accommodation) {
    //   errors.accommodationError = translate('accommodation-error');
    //   errors.accommodationErrorStatus = true;
    //   return setState({ ...state, ...errors });
    // }

    // if (activeStep === 0 && !state.toCountry) {
    //   errors.toCountryError = translate('to-country-error');
    //   errors.toCountryErrorStatus = true;
    //   return setState({ ...state, ...errors });
    // }

    // if (activeStep === 0 && !state.toCity) {
    //   errors.toCityError = translate('to-city-error');
    //   errors.toCityErrorStatus = true;
    //   return setState({ ...state, ...errors });
    // }

    if (activeStep === 1 && state.departureDate < dateFormatter(new Date())) {
      errors.departureDateError = translate('departure-date-error');
      errors.departureDateErrorStatus = true;
      return setState({ ...state, ...errors });
    }

    if (activeStep === 1 && state.returnDate < dateFormatter(new Date())) {
      errors.returnDateError = translate('return-date-error');
      errors.returnDateErrorStatus = true;
      return setState({ ...state, ...errors });
    }

    if (activeStep === 1 && state.secondDepartureDate < dateFormatter(new Date())) {
      errors.secondDepartureDateError = translate('second-departure-date-error');
      errors.secondDepartureDateErrorStatus = true;
      return setState({ ...state, ...errors });
    }

    if (activeStep === 1 && state.arrivalDate < dateFormatter(new Date())) {
      errors.arrivalDateError = translate('arrival-date-error');
      errors.arrivalDateErrorStatus = true;
      return setState({ ...state, ...errors });
    }

    if (activeStep === 2 && !state.reason) { // Step 3 validations
      errors.reasonError = translate('reason-error');
      errors.reasonErrorStatus = true;
      return setState({ ...state, ...errors });
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return stepOne();
      case 1:
        return stepTwo();
      case 2:
        return stepThree();
      default:
        return 'Uknown Step :-(';
    }
  }

  const onSubmit = async () => {
    
    const oneWayTripData = {
      type: state.type, 
      fromCountry: state.fromCountry, 
      fromCity: state.fromCity,
      toCountry: state.toCountry, 
      toCity: state.toCity,
      accommodation: state.accommodation,
      departureDate: state.departureDate,
      reason: state.reason
    }
    const returnTripData = {
      ...oneWayTripData,
      returnDate: state.returnDate
    }
    if(state.type === 'one way'){
      await props.nonMultiCityRequestAction(oneWayData, props.history);

    }else if(state.type === 'return'){
      await props.nonMultiCityRequestAction(returnTripData, props.history);
    }else {
      // await props.nonMultiCityRequestAction(returnTripData, props.history);
    }
    
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className={styles.finish_line}>
            <Typography component={'span'} className={classes.instructions}>All steps completed.</Typography>

            {

              props.nonMultiCityTripState.loading === 'block'?
              <CircularProgress size={25} color="primary" /> : null

              // props.nonMultiCityTripState.loading === 'block' || props.multiCityTripState.loading === 'block' ?
              // <CircularProgress size={25} color="#2196f3" /> : null

            }

            <Button color="primary" variant="contained" onClick={onSubmit}>Submit</Button>
          </div>
        ) : (
            <div>
              <Typography component={'span'} className={classes.instructions}>{getStepContent(activeStep)}</Typography>
              <div className={styles.progress_buttons}>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  Back
               </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={props.nonMultiCityTripState.open}
        // open={state.type !== 'multi city' ? props.nonMultiCityTripState.open : props.multiCityTripState.open}
        autoHideDuration={6000}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        
        message={<span id="message-id">{ props.nonMultiCityTripState.error}</span>}
        // message={<span id="message-id">{state.type !== 'multi city' ? props.nonMultiCityTripState.error : props.multiCityTripState.error}</span>}
        action={[
          <IconButton
            key="close"
            color="inherit"
            onClick={props.closeMessage}
          >
            <Close aria-label="Close" />
          </IconButton>,
        ]}
      />
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    nonMultiCityTripState: state.nonMultiCityTrip,
    // multiCityTripState: state.multiCityTrip
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // multiCityRequestAction: (data, history) => dispatch(multiCityAction(data, history)),
    nonMultiCityRequestAction: (data, history) => dispatch(nonMultiCityAction(data, history)),
    closeMessage: () => dispatch(closeMessage())
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewTripRequest));