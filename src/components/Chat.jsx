import React, { Component } from "react";
// import io from "socket.io-client";
import io from "socket.io-client";
import { connect } from "react-redux";
import Axios from "axios";

import "./ChatFrame.css";

import { withRouter } from "react-router-dom";

// let socket;
const ENDPOINT = "localhost:5001";
let socket = io(ENDPOINT);
const myrns = [
  { index: 0, received: false, sent: false, myans: null, otherans: null },
  { index: 2, received: false, sent: false, myans: null, otherans: null },
  { index: 3, received: false, sent: false, myans: null, otherans: null },
  { index: 4, received: false, sent: false, myans: null, otherans: null },
  { index: 5, received: false, sent: false, myans: null, otherans: null },
  { index: 1, received: false, sent: false, myans: null, otherans: null },
  { index: 6, received: false, sent: false, myans: null, otherans: null }
];
const questions = [
  {
    id: 1,
    question:
      "If you got some free time, which activity would you most enjoy engaging in with your partner?",
    options: ["Relaxing on the beach ", "Reading a book "],
    correctAnswer: 2
  },
  {
    id: 2,
    question:
      "If you went to see a movie together, which of these genres would you most likely pick?",
    options: ["Action ", "Drama"],
    correctAnswer: 2
  },
  {
    id: 3,
    question:
      "If you were broke, what's the most romantic thing you would do for your partner?",
    options: [
      "Provide emotional support",
      "Buy him/her a nice gift with your credit card "
    ],
    correctAnswer: 2
  },
  {
    id: 4,
    question:
      "Which of these do you feel is the most important aspect of a successful relationship?",
    options: ["Communication ", "Compromise "],
    correctAnswer: 2
  },
  {
    id: 5,
    question: "How important is your partner's intelligence to you? ",
    options: [
      "It's important, but I don't know how to describe it  ",
      "It makes me respect him/her more  "
    ],
    correctAnswer: 2
  },
  {
    id: 6,
    question:
      "Which of these do you feel is the most important aspect of a successful relationship?",
    options: ["Communication ", "Compromise "],
    correctAnswer: 2
  },
  {
    id: 7,
    question:
      "Which of these do you feel is the most important aspect of a successful relationship?",
    options: ["Communication ", "Compromise "],
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
      oppName: "",
      qp: 0,
      rns: [...myrns],
      showStart: false,
      qaScreen: true,
      qscreen: true,
      textField: false
    };
  }

  handleQA = (qp, op) => {
    socket.emit(
      "sendMessage",
      {
        message: {
          qid: qp,
          oid: op,
          type: "qa"
        },
        userId: this.props.userId
      },
      () => {
        let newrns = this.state.rns;
        newrns = newrns.map(item => {
          if (item.index === qp) {
            item.myans = op;
            item.sent = true;
            return { ...item };
          } else {
            return { ...item };
          }
        });
        if (qp < questions.length - 1) {
          this.setState({
            rns: newrns,
            qp: this.state.qp + 1
          });
        } else {
          this.setState({
            rns: newrns,
            qp: 0,
            qscreen: false,
            textField: true
          });
        }
      }
    );
  };

  sendMessage = event => {
    // prevent refresh on key press
    event.preventDefault();

    if (this.state.message !== undefined) {
      socket.emit(
        "sendMessage",
        { message: this.state.message, userId: this.props.userId },
        () => this.setState({ message: "", showStart: false, qaScreen: true })
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
        if (message.user === "admin") {
          this.setState({ showStart: true, qaScreen: false });
        }
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

      if (message.text.type === "qa" && this.props.username !== message.user) {
        let newrns = this.state.rns;
        newrns = newrns.map(item => {
          if (item.index === message.text.qid) {
            item.otherans = message.text.oid;
            item.received = true;
            return { ...item };
          } else {
            return { ...item };
          }
        });

        this.setState({
          rns: newrns
        });
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

    this.setState({
      match: !this.state.match,
      rns: [...myrns],
      messages: [],
      qaScreen: true,
      showStart: false
    });
  };

  componentWillUnmount() {
    //   is not working on refresh

    console.log("unmount called", this.props.userId);
    socket.emit("disconnect", { userId: this.props.userId }, () => {});

    socket.off();
  }

  render() {
    const {
      match,
      message,
      messages,
      active,
      qp,
      rns,
      showStart,
      qaScreen,
      qscreen,
      textField
    } = this.state;
    console.log(message);
    console.log(messages, rns);

    let percent = rns.filter(
      item => item.received && item.sent && item.myans == item.otherans
    );
    let x = 60 - Math.floor((60 / 6) * percent);

    // style={{ filter: `blur(${x}px)` }}
    console.log(this.props);
    console.log(messages);
    return (
      <div className="col s8 offset-s1">
        <div className="images-flex" style={{ margin: "30px 0px" }}>
          {showStart ? (
            <button
              onClick={event => this.sendMessage(event)}
              className="btn waves-effect waves-light"
            >
              Start Conversation
            </button>
          ) : (
            <></>
          )}
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
              Find a Match
            </button>
          )}
        </div>
        {match && active && qaScreen ? (
          <>
            <div className="images-flex">
              <div>
                <img
                  src={`http://localhost:5001/uploads/${this.state.user.image}`}
                  alt=""
                  style={{
                    width: "200px",
                    height: "200px",
                    filter: `blur(${x}px)`
                  }}
                ></img>
                <p className="center-align">{this.props.username}</p>
              </div>
              <div>
                <img
                  src={`http://localhost:5001/uploads/${this.state.oppImg}`}
                  alt=""
                  style={{
                    width: "200px",
                    height: "200px",
                    filter: `blur(${x}px)`
                  }}
                ></img>
                <p className="center-align">
                  {this.state.oppName === "admin"
                    ? "Secret Partner"
                    : this.state.oppName}
                </p>
              </div>
            </div>
            {qscreen ? (
              <div id="frame">
                <p className="center">{questions[qp].question}</p>
                <div className="images-flex">
                  <button
                    onClick={() => this.handleQA(qp, 0)}
                    class="btn waves-effect waves-light"
                  >
                    {questions[qp].options[0]}
                  </button>
                  <button
                    onClick={() => this.handleQA(qp, 1)}
                    class="btn waves-effect waves-light"
                  >
                    {questions[qp].options[1]}
                  </button>
                </div>
                <div>
                  {rns
                    .filter(item => item.received && item.sent)
                    .map(x => (
                      <p>
                        Your Answer : {x.myans} | Other Answer :{x.otherans}
                      </p>
                    ))}
                </div>
                {textField ? (
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
                ) : (
                  <></>
                )}
                <div className="images-flex" style={{ margin: "30px 0px" }}>
                  <button
                    onClick={() => this.handleMatch()}
                    className="btn waves-effect waves-light red"
                  >
                    UnMatch
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
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

export default withRouter(connect(mapStateToProps, null)(Chat));
