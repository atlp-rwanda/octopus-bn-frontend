import React from "react";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import UserRole from "../../components/UserRole";
import { roleSettings } from "../../redux/actions/roleAction";
import LanguageButtons from "../../components/LanguageButtons";

class UserRoles extends React.Component {
  submit = (data) =>
    this.props
      .roleSettings(data)
      .then(() => this.props.history.push("/user-roles"));

  render() {
    return (
      <div>
        <LanguageButtons />
        <UserRole submit={this.submit} />
      </div>
    );
  }
}

UserRole.propTypes = {
  history: Proptypes.shape({
    push: Proptypes.func.isRequired,
  }).isRequired,
  roleSettings: Proptypes.func.isRequired,
};

export default connect(null, { roleSettings })(UserRoles);
