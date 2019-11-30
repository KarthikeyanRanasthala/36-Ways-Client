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
        <div className="images-flex">
          <img src="http://via.placeholder.com/150" alt=""></img>
          <img src="http://via.placeholder.com/150" alt=""></img>
        </div>
        <div id="frame">
          <p className="center">Hello</p>
          <div className="images-flex">
            <button class="btn waves-effect waves-light red">Op 1</button>
            <button class="btn waves-effect waves-light red">Op 2</button>
          </div>
          <p className="center">Hello</p>
          <div className="images-flex">
            <button class="btn waves-effect waves-light red">Op 1</button>
            <button class="btn waves-effect waves-light red">Op 2</button>
          </div>
          <p className="center">Hello</p>
          <div className="images-flex">
            <button class="btn waves-effect waves-light red">Op 1</button>
            <button class="btn waves-effect waves-light red">Op 2</button>
          </div>
          <p className="center">Hello</p>
          <div className="images-flex">
            <button class="btn waves-effect waves-light red">Op 1</button>
            <button class="btn waves-effect waves-light red">Op 2</button>
          </div>
          <p className="center">Hello</p>
          <div className="images-flex">
            <button class="btn waves-effect waves-light red">Op 1</button>
            <button class="btn waves-effect waves-light red">Op 2</button>
          </div>
          <p className="center">Hello</p>
          <div className="images-flex">
            <button class="btn waves-effect waves-light red">Op 1</button>
            <button class="btn waves-effect waves-light red">Op 2</button>
          </div>
          <p className="center">Hello</p>
          <div className="images-flex">
            <button class="btn waves-effect waves-light red">Op 1</button>
            <button class="btn waves-effect waves-light red">Op 2</button>
          </div>
        </div>
        <div className="images-flex">
          <button class="btn waves-effect waves-light red">Leave Chat</button>
        </div>
      </div>
    );
  }
}

export default ChatFrame;
