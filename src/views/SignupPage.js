import React from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import SignupForm from "../components/SignupForm";
import styles from "../styles/entry.module.css";
import { signup } from "../redux/actions/signupAction";

class SignupPage extends React.Component {
  submit = (data) =>
    this.props
      .signup(data)
      .then(() => this.props.history.push("/verify-email"));

  render() {
    return (
      <div className={styles.container}>
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }),
  signup: Proptypes.func.isRequired,
};

SignupPage.defaultProps = {
  history: {
    push: ()=> undefined
  }
}
export default connect(null, { signup })(SignupPage);
