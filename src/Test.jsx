import React, { Component } from "react";

export default class Test extends Component {
  state = {
    percent: 0
  };

  changePer = () => {
    this.setState({ percent: 3 });
  };

  render() {
    const x = 60 - Math.floor((60 / 6) * this.state.percent);

    return (
      <div>
        <img
          style={{ filter: `blur(${x}px)` }}
          src={`https://images.unsplash.com/photo-1575075500178-c99ef905661a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=664&q=80`}
          alt=""
        />
        <button onClick={this.changePer}>change per</button>
      </div>
    );
  }
}
