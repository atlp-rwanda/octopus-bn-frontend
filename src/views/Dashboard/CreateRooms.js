import React, { Component } from "react";
import { connect } from "react-redux";
import entry from "../../styles/entry.module.css";
import title from "../../styles/addAccom.module.css";
import CreateRooms from "../../components/CreateRoomsForm";
import { addRoom } from "../../redux/actions/addRoomAction";

class createRoomsPage extends Component {
  submit = (data) =>
    this.props.addRoom(data).then(() => this.props.history.push("/add-rooms"));
  render() {
    return (
      <div className={entry.container}>
        <h1 className={title.title}>Add rooms</h1>
        <p className={title.sub_title}>Travel made easy - Barefoot Nomad</p>
        <CreateRooms submit={this.submit} />
      </div>
    );
  }
}

export default connect(null, { addRoom })(createRoomsPage);
