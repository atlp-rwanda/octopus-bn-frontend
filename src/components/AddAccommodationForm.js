import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import countryList from "country-list";
import cities from "countries-cities";
import Paper from "@material-ui/core/Paper";
import PublishIcon from "@material-ui/icons/Publish";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "../styles/signup.module.css";
import validate from "../helpers/validateAccommodation";

class addAccommodationForm extends Component {
  state = {
    name: "",
    city: "",
    country: "RW",
    city: "",
    imageUrl: "",
    around: [],
    amenities: [],
    errors: {},
    open: false,
    loading: "none",
    btn: "Add",
    isImageUploaded: true,
    profileWidget: cloudinary.createUploadWidget(
      {
        cloudName: "octopusbn",
        uploadPreset: "barefootNomadCloud",
        multiple: false,
        cropping: true,
        croppingShowBackButton: true,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const data = { ...this.state };
          this.state.imageUrl = result.info.secure_url;
          this.setState({ data });
          this.setState({ ...this.state, isImageUploaded: true });
        }
      }
    ),
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  onSubmit = (e) => {
    e.preventDefault();
    const amenity = this.state.amenities.toString().split(",");
    const arounds = this.state.around.toString().split(",");
    const errors = validate(
      this.state.name,
      this.state.country,
      this.state.city,
      this.state.imageUrl,
      this.state.amenities,
      this.state.around
    );
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const data = {
        name: this.state.name,
        country: this.state.country,
        city: this.state.city,
        imageUrl: this.state.imageUrl,
        amenities: amenity,
        around: arounds,
      };
      this.setState({ loading: "block" });
      this.props.submit(data).catch((err) =>
        this.setState({
          errors: { globalError: err.response.data.error },
          loading: "none",
          open: true,
        })
      );
    }
  };

  showWidget = () => {
    this.state.profileWidget.open();
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };
  render() {
    const { errors, loading, open } = this.state;
    const cities2 = cities.getCities(countryList.getName(this.state.country));
    return (
      <div className={styles.first_wrap}>
        <form
          onSubmit={this.onSubmit}
          style={{ flexGrow: 1 }}
          aria-label="form"
        >
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                className={styles.inputs}
                label="Accommodation name"
                inputProps={{
                  "aria-label": "name",
                }}
                name="name"
                variant="outlined"
                error={errors.nameErrorStatus}
                helperText={errors.name}
                value={this.state.name}
                onChange={this.onChange}
              />

              <TextField
                className={styles.inputs}
                style={{ marginTop: "10px" }}
                id="outlined-select-currency"
                name="country"
                select
                label="Select Country"
                error={errors.countryErrorStatus}
                helperText={errors.country}
                value={this.state.country}
                onChange={this.onChange}
                variant="outlined"
              >
                {countryList.getData().map((country) => (
                  <MenuItem key={country.name} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                className={styles.inputs}
                style={{ marginTop: "10px" }}
                id="outlined-select-currencys"
                name="city"
                select
                label="Select city"
                error={errors.cityErrorStatus}
                helperText={errors.city}
                value={this.state.city}
                onChange={this.onChange}
                variant="outlined"
              >
                {cities2.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                className={styles.inputs}
                style={{ marginTop: "10px" }}
                label="Around"
                inputProps={{
                  "aria-label": "around",
                }}
                name="around"
                multiline
                rows={4}
                variant="outlined"
                error={errors.aroundErrorStatus}
                helperText={errors.around}
                value={this.state.around}
                onChange={this.onChange}
                placeholder="let people know more interesting things around your accommodation (Separated with a comma)"
              />
            </Grid>
            <Grid item xs={6} style={{ padding: 0, margin: 0 }}>
              <Paper
                variant="outlined"
                style={{ marginTop: "10px", height: 134 }}
              >
                <img
                  src={this.state.imageUrl}
                  style={{ height: 134, width: "fill" }}
                />
              </Paper>

              <p style={{ fontSize: "12px", color: "red" }}>
                {errors.imageUrl}
              </p>

              <Button
                variant="contained"
                style={{ marginBottom: "8px" }}
                color="primary"
                component="span"
                onClick={this.showWidget}
                startIcon={<PublishIcon />}
              >
                add image
              </Button>
              <TextField
                className={styles.inputs}
                style={{ marginTop: "10px" }}
                label="Amenities"
                inputProps={{
                  "aria-label": "amenities",
                }}
                name="amenities"
                multiline
                rows={4}
                variant="outlined"
                error={errors.amenitiesErrorStatus}
                helperText={errors.amenities}
                value={this.state.amenities}
                onChange={this.onChange}
                placeholder="Amenities such as Wifi, Lunch etc..(Separated with a comma)"
              />
              <Button
                type="submit"
                aria-label="submit"
                variant="contained"
                color="primary"
                style={{
                  float: "right",
                  marginTop: "10px",
                  textTransform: "capitalize",
                  width: "136px",
                }}
                disableElevation
              >
                {loading === "block" ? (
                  <div className={styles.progress}>
                    <CircularProgress size={24} color="#4b7ba0" />
                  </div>
                ) : (
                  this.state.btn
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">{errors.globalError}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => this.setState({ open: false })}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

addAccommodationForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default withRouter(addAccommodationForm);
