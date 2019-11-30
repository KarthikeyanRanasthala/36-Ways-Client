import React from "react";

import { connect } from "react-redux";
import Axios from "axios";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    Axios.post("http://localhost:5001/api/users/", {
      id: this.props.user.id
    }).then(resp => this.setState({ user: resp.data }));
  }

  onChange = event => {
    let file = event.target.files[0];
    console.log(file);
    const data = new FormData();
    data.append("image", file);
    data.append("id", this.props.user.id);
    console.log(data);
    Axios.post("http://localhost:5001/api/image", data)
      .then(resp => this.getUser())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <>
        {this.state.user ? (
          <div className="col s3">
            <div class="card">
              <div class="card-image">
                <img
                  src={`${process.env.REACT_APP_BASE_URL}/${this.state.user.image}`}
                  alt=""
                ></img>
              </div>

              <div class="card-content" style={{ padding: "10px 10px" }}>
                <div
                  class="file-field input-field"
                  style={{ margin: "10px 10px" }}
                >
                  <div class="btn">
                    <span>Change</span>
                    <input type="file" onChange={evt => this.onChange(evt)} />
                  </div>
                  <div class="file-path-wrapper">
                    <input
                      class="file-path validate"
                      type="text"
                      style={{ display: "none" }}
                    />
                  </div>
                  <br></br>
                  <br></br>
                </div>
                <ul class="collection">
                  <li class="collection-item">
                    <span class="title">Name</span>
                    <p>{this.state.user.name}</p>
                  </li>
                </ul>
                <ul class="collection">
                  <li class="collection-item">
                    <span class="title">Location</span>
                    <p>{this.state.user.location}</p>
                  </li>
                </ul>
                <ul class="collection">
                  <li class="collection-item">
                    <span class="title">Email</span>
                    <p>{this.state.user.email}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(SideBar);
