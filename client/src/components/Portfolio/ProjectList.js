import React, { Component } from "react";
import { portfolioData } from "../../data/portfolioData";
import Project from "./Project";
export default class ProjectList extends Component {
  state = {
    projects: portfolioData,
    radios: [
      { id: 1, value: "javascript" },
      { id: 2, value: "python" },
      { id: 3, value: "c/c++" },
      { id: 4, value: "java" },
    ],
    selectedRadio: "javascript",
  };
  handlRadio = (event) => {
    let radio = event.target.value;
    this.setState({ selectedRadio: radio });
  };
  render() {
    let { projects, radios, selectedRadio } = this.state;
    return (
      <div className="presenceContent">
        <ul className="radioDisplay">
          {radios.map((radio) => {
            return (
              <li key={radio.id}>
                <input
                  type="radio"
                  name="radio"
                  checked={radio.value === selectedRadio}
                  value={radio.value}
                  id={radio.value}
                  onChange={this.handlRadio}
                />
                <label htmlFor={radio.value}>{radio.value}</label>
              </li>
            );
          })}
        </ul>
        <div className="projects">
          {projects
            .filter((item) => item.languages.includes(selectedRadio))
            .map((item) => {
              return <Project key={item.id} item={item} />;
            })}
        </div>
      </div>
    );
  }
}
