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
    return (
      <div>
        <div style={{ background: "black" }}>
          <h1
            style={{ color: "white", margin: "0px", padding: "100px 0px" }}
            className="center"
          >
            Come Fall In Love.
          </h1>
        </div>
        <div
          className="row"
          style={{
            margin: "0px 100px",
            marginTop: "-50px",
            background: "white",
            borderRadius: "10px",
            padding: "30px 10px"
          }}
        >
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
