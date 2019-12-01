import React, { Component } from "react";
// import io from "socket.io-client";
import io from "socket.io-client";
import { connect } from "react-redux";
import Axios from "axios";

import "./ChatFrame.css";

// let socket;
const ENDPOINT = "localhost:5001";
let socket = io(ENDPOINT);

const questions = [
  {
    id: 1,
    question: "Q1",
    options: ["O1", "O2"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Q1",
    options: ["O1", "O2"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Q1",
    options: ["O1", "O2"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "Q1",
    options: ["O1", "O2"],
    correctAnswer: 2
  }
];

let answerStorage = [];

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match: false,
      active: false,
      message: "",
      messages: [],
      questionNo: 1,
      questions: [{ ...questions[0], answer: "" }],
      percent: 0,
      oppImg: "",
      oppName: ""
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

  getUser() {
    Axios.post("http://localhost:5001/api/users/", {
      id: this.props.userId
    }).then(resp => this.setState({ user: resp.data }));
  }

  componentDidMount() {
    this.getUser();
    socket.on("mymessage", message => {
      console.log(message, "ms");
      console.log(message.user !== this.props.username);
      if (message.type === "Active") {
        if (
          message.user !== this.props.username &&
          this.state.oppImg !== message.img
        ) {
          this.setState({
            active: true,
            oppImg: message.img || "",
            oppName: message.user
          });
        } else {
          this.setState({ active: true });
        }
      } else {
        this.setState({ active: false });
      }
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
    const { match, message, messages, active } = this.state;
    console.log(message);
    console.log(messages);
    console.log(this.props);
    return (
      <div className="col s8 offset-s1">
        {match ? (
          active ? (
            <></>
          ) : (
            <button
              onClick={() => this.setState({ match: !match })}
              className="btn waves-effect waves-light red"
            >
              Searching...
            </button>
          )
        ) : (
          <button
            onClick={this.handleMatch}
            className="btn waves-effect waves-light green"
          >
            Match
          </button>
        )}
        {active ? (
          <>
            <div className="images-flex">
              <div>
                <img
                  src={`http://localhost:5001/uploads/${this.state.user.image}`}
                  alt=""
                  style={{ width: "200px", height: "200px" }}
                ></img>
                <p className="center-align">{this.props.username}</p>
              </div>
              <div>
                <img
                  src={`http://localhost:5001/uploads/${this.state.oppImg}`}
                  alt=""
                  style={{ width: "200px", height: "200px" }}
                ></img>
                <p className="center-align">
                  {this.state.oppName === "admin"
                    ? "Secret Partner"
                    : this.state.oppName}
                </p>
              </div>
            </div>

            <div id="frame">
              <p className="center">{questions[0].question}</p>
              <div className="images-flex">
                <button class="btn waves-effect waves-light">Op 1</button>
                <button class="btn waves-effect waves-light">Op 2</button>
              </div>
              <input
                type="text"
                value={message}
                onChange={event =>
                  this.setState({ message: event.target.value })
                }
                onKeyPress={event =>
                  event.key === "Enter" ? this.sendMessage(event) : null
                }
              />
              <div className="images-flex">
                <button
                  onClick={() => this.setState({ match: !match })}
                  className="btn waves-effect waves-light red"
                >
                  UnMatch
                </button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {/* <div className="images-flex">
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
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    userId: state.auth.user.id,
    username: state.auth.user.name
  };
};

export default connect(mapStateToProps, null)(Chat);
