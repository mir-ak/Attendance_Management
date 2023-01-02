import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
//const image = require("/media/karim/Data_SSD/Attendance_Management/server/image_data/Karim.png");
export default class Project extends Component {
  state = {
    showInfos: false,
  };
  handleInfo = () => {
    this.setState({
      showInfos: !this.state.showInfos,
    });
  };

  render() {
    let { fullName, date, time } = this.props.item;
    return (
      <div className="project">
        <h3>{fullName}</h3>
        {/* <img src={image} alt="" onClick={this.handleInfo} /> */}
        <span className="infos" onClick={this.handleInfo}>
          <MaterialIcon icon="add_circle" size={35} color="#4FEDD2" invert />
        </span>
        {this.state.showInfos && (
          <div className="showInfos">
            <div className="infosContent">
              <div className="head">
                <h2>{date}</h2>
                <div className="sourceCode">
                  {/* <a
                    href={source}
                    rel="noonpener noreferrer"
                    className="button"
                    target="_blank">
                    Code souce
                  </a> */}
                </div>
              </div>
              <p className="text">{time}</p>
              <div className="button return" onClick={this.handleInfo}>
                close
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
