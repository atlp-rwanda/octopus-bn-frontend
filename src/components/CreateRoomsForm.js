import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import { currencies, types } from "../helpers/currencies-types";
import styles from "../styles/signup.module.css";
import validate from "../helpers/validateRoom";

class createRooms extends Component {
  state = {
    accommodationsID: "",
    roomNumber: "",
    cost: "",
    currency: "",
    type: "",
    errors: {},
    accommodations: [],
    loading: "none",
    open: false,
    message: "",
    btnMessage: "Add",
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
      message: "",
    });

  onSubmit = (e) => {
    e.preventDefault();
    const errors = validate(
      this.state.accommodationsID,
      this.state.roomNumber,
      this.state.cost,
      this.state.currency,
      this.state.type
    );
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const data = {
        accommodationsID: this.state.accommodationsID,
        roomNumber: this.state.roomNumber,
        cost: this.state.cost,
        currency: this.state.currency,
        type: this.state.type,
      };
      this.setState({ loading: "block" });
      this.props
        .submit(data)
        .then(() => {
          this.setState({
            message: "The room was successfully registered",
            loading: "none",
          });
        })
        .catch((err) =>
          this.setState({
            errors: { globalError: err.response.data.error },
            loading: "none",
            open: true,
          })
        );
    }
  };

  componentDidMount() {
    const token = localStorage.getItem("bn-token");
    const header = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
    };
    axios
      .get(
        "https://octopus-bn-backend.herokuapp.com/api/v1/accommodations/all-accommodations",
        header
      )
      .then((res) => {
        this.setState({ accommodations: res.data.data.allAccommodations });
      });
  }

  render() {
    const {
      errors,
      accommodations,
      loading,
      btnMessage,
      open,
      message,
    } = this.state;
    console.log(accommodations.length);
    return (
      <div className={styles.forms_plus_second}>
        <div className={styles.forms}>
          <div className={styles.third_wrap}>
            <form
              className={styles.form}
              aria-label="form"
              onSubmit={this.onSubmit}
            >
              <TextField
                className={styles.inputs}
                label="Accommodation"
                inputProps={{
                  "aria-label": "Accommodation",
                }}
                select
                name="accommodationsID"
                variant="outlined"
                error={errors.accommodationErrorStatus}
                helperText={errors.accommodation}
                value={message === "" ? this.state.accommodationsID : ""}
                onChange={this.onChange}
              >
                {accommodations.length === 0 ? (
                  <CircularProgress style={{ position: "center" }} />
                ) : (
                  accommodations.map((info) => (
                    <MenuItem key={info.name} value={info.id}>
                      {info.name}
                    </MenuItem>
                  ))
                )}
              </TextField>
              <TextField
                className={styles.inputs}
                style={{ marginTop: "10px" }}
                label="Room number"
                inputProps={{
                  "aria-label": "room number",
                }}
                name="roomNumber"
                variant="outlined"
                error={errors.roomErrorStatus}
                helperText={errors.room}
                value={message === "" ? this.state.roomNumber : ""}
                onChange={this.onChange}
              />
              <TextField
                className={styles.inputs}
                style={{ marginTop: "10px" }}
                label="Cost"
                inputProps={{
                  "aria-label": "cost",
                }}
                name="cost"
                variant="outlined"
                error={errors.costErrorStatus}
                helperText={errors.cost}
                value={message === "" ? this.state.cost : ""}
                onChange={this.onChange}
              />
              <TextField
                className={styles.inputs}
                style={{ marginTop: "10px" }}
                label="Currency"
                inputProps={{
                  "aria-label": "currency",
                }}
                select
                name="currency"
                variant="outlined"
                error={errors.currencyErrorStatus}
                helperText={errors.currency}
                value={message === "" ? this.state.currency : ""}
                onChange={this.onChange}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency.label} value={currency.value}>
                    {currency.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                className={styles.inputs}
                style={{ marginTop: "10px" }}
                label="Type"
                inputProps={{
                  "aria-label": "type",
                }}
                select
                name="type"
                variant="outlined"
                error={errors.typeErrorStatus}
                helperText={errors.type}
                value={message === "" ? this.state.type : ""}
                onChange={this.onChange}
              >
                {types.map((type) => (
                  <MenuItem key={type.label} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>
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
                  btnMessage
                )}
              </Button>
            </form>
            <p style={{ color: "green" }}>{message}</p>
          </div>
        </div>
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

createRooms.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default withRouter(createRooms);
