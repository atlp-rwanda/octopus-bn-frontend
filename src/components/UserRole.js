import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from "@material-ui/core/Select";
import isEmail from "validator/lib/isEmail";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import styles from "../styles/signup.module.css";

import translate from "../languages/translate";
class UserRole extends Component {
  state = {
    data: { email: "", role: "" },
    loading: "none",
    errors: {},
    open: false,
    message: "",
  };

  onChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      message: "",
    });

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);

    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: "block" });
      this.props
        .submit(this.state.data)
        .then(() => {
          this.setState({
            message: "The role was successfully set",
            loading: "none",
          });
        })
        .catch((err) => {
          this.setState({
            errors: { globalError: err.response.data.error },
            loading: "none",
            open: true,
          });
        });
    }
  };

  validate = (data) => {
    const errors = {};

    if (!isEmail(data.email)) {
      errors.email = translate("valid-email");
      errors.emailErrorStatus = true;
    }
    if (!data.role) {
      errors.role = translate("select-role");
      errors.roleErrorStatus = true;
    }
    return errors;
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  render() {
    const { data, errors, loading, open, message } = this.state;
    return (
      <div>
        <h1 className={styles.fs_title}>{translate("role-settings")}</h1>
        <p className={styles.fs_subtitle}>{translate("role_settings_sub")}</p>

        <div className={styles.forms_plus}>
          <div className={styles.forms}>
            <div className={styles.wrap}>
              <form onSubmit={this.onSubmit} className={styles.form}>
                <TextField
                  className={styles.inputs}
                  label="Email"
                  inputProps={{
                    "aria-label": "email",
                  }}
                  name="email"
                  variant="outlined"
                  error={errors.emailErrorStatus}
                  helperText={errors.email}
                  value={message === "" ? data.email : ""}
                  onChange={this.onChange}
                />
                <FormControl
                  className={styles.inputs}
                  style={{ marginTop: "20px" }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="role">{translate("role")}</InputLabel>
                  <Select
                    native
                    value={message === "" ? data.role : ""}
                    name="role"
                    label="Role"
                    inputProps={{
                      "arial-label": "role",
                      name: "role",
                      id: "role",
                    }}
                    error={errors.roleErrorStatus}
                    onChange={this.onChange}
                  >
                    <option value="" />
                    <option value="requester">Requester</option>
                    <option value="manager">Manager</option>
                    <option value="accommodation_supplier">
                      Accommodation supplier
                    </option>
                    <option value="travel_administrator">
                      Travel administrator
                    </option>
                    <option value="travel_team_member">
                      Travel team member
                    </option>
                  </Select>
                  <FormHelperText style={{ color: "red", marginLeft: "18px" }}>
                    {errors.role}
                  </FormHelperText>
                </FormControl>
                <Button
                  type="submit"
                  aria-label="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: "10px",
                    float: "right",
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
                    translate("set-role")
                  )}
                </Button>
              </form>
              <p style={{ color: "green" }}>{message}</p>
            </div>
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

UserRole.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default withRouter(UserRole);
