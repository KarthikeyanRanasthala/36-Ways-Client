import React from "react";

const sample = {
  name: "karthik",
  location: "bengaluru",
  email: "M"
};

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="col s3">
        <div class="card">
          <div class="card-image">
            <img
              src="http://via.placeholder.com/150"
              alt=""
              style={{ borderRadius: "50%" }}
            ></img>
          </div>
          <div class="file-field input-field" style={{ margin: "10px 10px" }}>
            <div class="btn">
              <span>Change</span>
              <input type="file" onChange={this.onChange} />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" />
            </div>
          </div>
          <div class="card-content" style={{ padding: "10px 10px" }}>
            <ul class="collection">
              <li class="collection-item">
                <span class="title">Name</span>
                <p>{sample.name}</p>
              </li>
            </ul>
            <ul class="collection">
              <li class="collection-item">
                <span class="title">Location</span>
                <p>{sample.location}</p>
              </li>
            </ul>
            <ul class="collection">
              <li class="collection-item">
                <span class="title">EMail</span>
                <p>{sample.email}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
