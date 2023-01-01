import React, { Component } from 'react';
import ProgressBar from './ProgressBar';
export default class Langauges extends Component {
  state = {
    langauges: [
      { id: 1, value: "Javascrip & Html/Css", xp: 2. },
      { id: 2, value: "C/C++", xp: 1.95 },
      { id: 3, value: "Python", xp: 1.75 },
      { id: 4, value: "SQL Server", xp: 1.85 },
      { id: 4, value: "Java", xp: 0.99 },
      { id: 5, value: "Php", xp: 0.95 }
    ],
    frameworks: [
      { id: 1, value: "Node js ", xp: 1.2 },
      { id: 1, value: "React-native ", xp: 1.2 },
      { id: 2, value: "React JS", xp: 1.2 },
      { id: 3, value: "Pyspark", xp: 1.10 }
    ]
  }
  render() {
    let { langauges, frameworks } = this.state;
    return (
      <div className="languagesFrameworks">
        <ProgressBar langauges={langauges} className="langaugesDisplay" title="langauges" />
        <ProgressBar langauges={frameworks} className="frameworksDisplay" title="frameworks & bibliothéques" />

      </div>
    )
  }
}
