import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
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
    let { name, languagesIcons, source, info, picture } = this.props.item;

    return (
      <div className="project">
        <div className="icons">
          {languagesIcons.map((icon) => (
            <i>{icon}</i>
          ))}
        </div>

        <h3>{name}</h3>
        <img src={picture} alt="" onClick={this.handleInfo} />
        <span className="infos" onClick={this.handleInfo}>
          <MaterialIcon icon="add_circle" size={35} color="#4FEDD2" invert />
        </span>
        {this.state.showInfos && (
          <div className="showInfos">
            <div className="infosContent">
              <div className="head">
                <h2>{name}</h2>
                <div className="sourceCode">
                  <a
                    href={source}
                    rel="noonpener noreferrer"
                    className="button"
                    target="_blank">
                    Code souce
                  </a>
                </div>
              </div>
              <p className="text">{info}</p>
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
