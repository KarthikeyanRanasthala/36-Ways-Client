import React, { Component } from "react";
// import io from "socket.io-client";
import io from "socket.io-client";
import { connect } from "react-redux";
// let socket;
const ENDPOINT = "localhost:5001";
let socket = io(ENDPOINT);

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match: false,
      message: "",
      messages: []
    };
  }

  sendMessage = event => {
    // prevent refresh on key press
    event.preventDefault();

    if (this.state.message) {
      socket.emit(
        "sendMessage",
        { message: this.state.message, userId: this.props.userId },
        () => this.setState({ message: "" })
      );
    }
  };

  componentDidMount() {
    socket.on("mymessage", message => {
      console.log(message, "ms");
      this.setState({ messages: [...this.state.messages, message] });
    });
    // socket.on("message", message => {
    //   console.log(message, "ms");
    //   this.setState({ messages: [...this.state.messages, message] });
    // });
  }

  handleMatch = () => {
    console.log("called on click");
    socket.emit("join", { userId: this.props.userId }, () => {
      //   alert(error);
    });
    this.setState({ match: !this.state.match });
  };

  handleUnMatch = () => {
    socket.emit("unmatch", { userId: this.props.userId }, () => {
      //   alert(error);
    });

    this.setState({ match: !this.state.match });
  };

  componentWillUnmount() {
    //   is not working on refresh

    console.log("unmount called", this.props.userId);
    socket.emit("disconnect", { userId: this.props.userId }, () => {});

    socket.off();
  }

  render() {
    const { match, message, messages } = this.state;
    console.log(message, messages);
    return (
      <div>
        <div className="col s8 offset-s1">
          <div className="images-flex">
            <img src="http://via.placeholder.com/150" alt=""></img>
            <img src="http://via.placeholder.com/150" alt=""></img>
          </div>
          <div id="frame">
            <input
              type="text"
              value={message}
              onChange={event => this.setState({ message: event.target.value })}
              onKeyPress={event =>
                event.key === "Enter" ? this.sendMessage(event) : null
              }
            />
          </div>
          <div className="images-flex">
            {match ? (
              <button
                onClick={() => this.setState({ match: !match })}
                className="btn waves-effect waves-light red"
              >
                UnMatch
              </button>
            ) : (
              <button
                onClick={this.handleMatch}
                className="btn waves-effect waves-light green"
              >
                Match
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    userId: state.auth.user.id
  };
};

export default connect(mapStateToProps, null)(Chat);
