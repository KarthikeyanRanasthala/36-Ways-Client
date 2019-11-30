import React from "react";
import { connect } from "react-redux";

import SideBar from "../components/SideBar";
import Chat from "../components/Chat";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = event => {
    console.log(event);
    this.setState({ profilePicture: event.target.value });
  };

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <div className="row">
          <SideBar />
          <Chat />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Dashboard);
