import React from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import SignupForm from "../components/SignupForm";
import Svg from "../components/SvgMap";
import styles from "../styles/signup.module.css";
import { signup } from "../redux/actions/signupAction";

class SignupPage extends React.Component {
  submit = (data) =>
    this.props
      .signup(data)
      .then(() => this.props.history.push("/verify-email"));

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.side}>
          <div className={styles.text_wrap}>
            <h1>Barefoot Nomad</h1>
            <p>Making company travel and accommodation easy and convenient.</p>
          </div>
        </div>
        <Svg />
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
  signup: Proptypes.func.isRequired,
};

export default connect(null, { signup })(SignupPage);
