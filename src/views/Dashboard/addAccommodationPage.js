import React, { Component } from "react";
import { connect } from "react-redux";
import Styles from "../../styles/entry.module.css";
import styles2 from "../../styles/addAccom.module.css";
import AddAccommodationForm from "../../components/AddAccommodationForm";
import { addAccommodation } from "../../redux/actions/addAccommodationAction";

class addAccommodationPage extends Component {
  submit = (data) =>
    this.props
      .addAccommodation(data)
      .then(() => this.props.history.push("/dashboard"));
  render() {
    return (
      <div className={Styles.container}>
        <h1 className={styles2.title}>Add accommodation</h1>
        <p className={styles2.sub_title}>Travel made easy - Barefoot Nomad</p>
        <AddAccommodationForm submit={this.submit} />
      </div>
    );
  }
}

export default connect(null, { addAccommodation })(addAccommodationPage);
