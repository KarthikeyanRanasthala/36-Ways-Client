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
        <div className="card">
          <div className="card-image">
            <img
              src="http://via.placeholder.com/150"
              alt=""
              style={{ borderRadius: "50%" }}
            ></img>
          </div>
          <div
            className="file-field input-field"
            style={{ margin: "10px 10px" }}
          >
            <div className="btn">
              <span>Change</span>
              <input type="file" onChange={this.onChange} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          <div className="card-content" style={{ padding: "10px 10px" }}>
            <ul className="collection">
              <li className="collection-item">
                <span className="title">Name</span>
                <p>{sample.name}</p>
              </li>
            </ul>
            <ul className="collection">
              <li className="collection-item">
                <span className="title">Location</span>
                <p>{sample.location}</p>
              </li>
            </ul>
            <ul className="collection">
              <li className="collection-item">
                <span className="title">Email</span>
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
