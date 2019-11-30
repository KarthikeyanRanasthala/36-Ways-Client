import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
let socket;

const ChatFrame = ({ userId }) => {
  const [match, setMatch] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:5001";

  useEffect(() => {
    console.count("renders");
    console.log("connect to soio", ENDPOINT);
    socket = io(ENDPOINT);

    socket.emit("join", { userId }, () => {
      //   alert(error);
    });

    // return stmt is for unmounting
    return () => {
      console.log(userId, "frnt end unmount");
      socket.emit("disconnect", { userId }, () => {});

      socket.off();
    };
  }, [ENDPOINT, match]);

  useEffect(() => {
    return () => {
      console.log(userId, "frnt end unmount, just effect");
      socket.emit("disconnect", { userId }, () => {});

      socket.off();
    };
  });

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = event => {
    // prevent refresh on key press
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", { message, userId }, () => setMessage(""));
    }
  };
  console.log(message, messages, "message and messages");
  return (
    <div>
      <div className="col s8 offset-s1">
        <div className="images-flex">
          <img src="http://via.placeholder.com/150" alt=""></img>
          <img src="http://via.placeholder.com/150" alt=""></img>
        </div>
        <div id="frame">
          {/* <p className="center">Hello</p>
          <div className="images-flex">
            <button class="btn waves-effect waves-light">Op 1</button>
            <button class="btn waves-effect waves-light">Op 2</button>
          </div>
          <p className="center">Hello</p>
          <div className="images-flex">
            <button class="btn waves-effect waves-light">Op 1</button>
            <button class="btn waves-effect waves-light">Op 2</button>
          </div>
          <p className="center">Hello</p>
          <div className="images-flex">
            <button class="btn waves-effect waves-light">Op 1</button>
            <button class="btn waves-effect waves-light">Op 2</button>
          </div>
          <p className="center">Hello</p>
          <div className="images-flex">
            <button class="btn waves-effect waves-light">Op 1</button>
            <button class="btn waves-effect waves-light">Op 2</button>
          </div>
          <p className="center">Hello</p>
          <div className="images-flex">
            <button class="btn waves-effect waves-light">Op 1</button>
            <button class="btn waves-effect waves-light">Op 2</button>
          </div>
          <p className="center">Hello</p>
          <div className="images-flex">
            <button class="btn waves-effect waves-light">Op 1</button>
            <button class="btn waves-effect waves-light">Op 2</button>
          </div>
          <p className="center">Hello</p>
          <div className="images-flex">
            <button class="btn waves-effect waves-light">Op 1</button>
            <button class="btn waves-effect waves-light">Op 2</button>
          </div>
        </div>
        <div className="images-flex">
          <button class="btn waves-effect waves-light red ">Leave Chat</button> */}
          <input
            type="text"
            value={message}
            onChange={event => setMessage(event.target.value)}
            onKeyPress={event =>
              event.key === "Enter" ? sendMessage(event) : null
            }
          />
        </div>
        <div className="images-flex">
          {match ? (
            <button
              onClick={() => setMatch(!match)}
              className="btn waves-effect waves-light red"
            >
              UnMatch
            </button>
          ) : (
            <button
              onClick={() => setMatch(!match)}
              className="btn waves-effect waves-light green"
            >
              Match
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    userId: state.auth.user.id
  };
};

export default connect(mapStateToProps, null)(ChatFrame);
