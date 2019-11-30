import React from "react";

import "./ChatFrame.css";

class ChatFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="col s8 offset-s1">
        <div id="images-flex">
          <img src="http://via.placeholder.com/150" alt=""></img>
          <img src="http://via.placeholder.com/150" alt=""></img>
        </div>
      </div>
    );
  }
}

export default ChatFrame;
