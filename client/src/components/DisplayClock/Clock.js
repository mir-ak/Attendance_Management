import React from "react";
import * as d3 from "d3";

class Clock extends React.Component {
  componentDidMount() {
    const width = this.props.width;
    const height = this.props.height;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    svg
      .append("circle")
      .attr("r", radius)
      .attr("fill", "rgba(255, 255, 255, 1)")
      .attr("stroke", "black")
      .attr("stroke-width", 1);

    const hands = svg.append("g").attr("class", "hands");
    hands
      .append("line")
      .attr("class", "hour-hand")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", -radius * 0.6)
      .attr("stroke", "black")
      .attr("stroke-width", radius * 0.04)
      .attr("filter", "drop-shadow(-5px 0px 1 grey)"); // Ajout d'une ombre à l'aiguille des heures
    hands
      .append("line")
      .attr("class", "minute-hand")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", -radius * 0.74)
      .attr("stroke", "black")
      .attr("stroke-width", radius * 0.04)
      .attr("filter", "drop-shadow(4px 0px 1 grey)"); // Ajout d'une ombre à l'aiguille des minutes

    svg
      .append("circle")
      .attr("r", radius * 0.1)
      .attr("fill", "black");

    // Ajout des numéros de l'horloge
    const numbers = svg.append("g").attr("class", "numbers");
    for (let i = 1; i <= 12; i++) {
      const angle = (i / 12) * 360 - 90;
      const x = radius * 0.8 * Math.cos((angle * Math.PI) / 180);
      const y = radius * 0.8 * Math.sin((angle * Math.PI) / 180);
      numbers
        .append("text")
        .attr("x", x)
        .attr("y", y)
        .text(i)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("font-size", radius * 0.1)
        .attr("x", x)
        .attr("y", y)
        .text(i)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("font-size", radius * 0.1)
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .style("user-select", "none") // Empêche la sélection du texte par l'utilisateur
        .append("tspan")
        .attr("dy", radius * 0.03)
        .attr("x", x)
        .style("font-size", radius * 0.15);
    }

    // Mise à jour de l'horloge en fonction des props heure et minute
    const hoursAngle = (this.props.hours / 12) * 360;
    const minutesAngle = (this.props.minutes / 60) * 360;
    d3.select(".hour-hand").attr("transform", `rotate(${hoursAngle})`);
    d3.select(".minute-hand").attr("transform", `rotate(${minutesAngle})`);
  }

  render() {
    return <div ref="canvas"></div>;
  }
}

export default Clock;
