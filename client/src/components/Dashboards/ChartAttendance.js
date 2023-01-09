import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class ChartAttendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: [],
          name: "Presence",
        },
      ],
      options: {
        chart: {
          foreColor: "#36d0ea",
          type: "area",
          height: 350,
          zoom: {
            enabled: true,
          },
        },
        colors: ["#00D100"],
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        fill: {
          colors: ["#2EFF2E", "#5CFF5C", "#8AFF8A"],
          gradient: {
            enabled: true,
            opacityFrom: 0.7,
            opacityTo: 0.3,
          },
        },
        markers: {
          size: 5,
          colors: ["#3084C6"],
          strokeColor: "#2EFF2E",
          strokeWidth: 3,
        },
        dataLabels: {
          style: {
            colors: ["#F44336", "#E91E63", "#9C27B0"],
          },
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        grid: {
          borderColor: "#36d0ea",
        },
        title: {
          text: "Attendance Overview",
          align: "left",
        },
        subtitle: {
          text: "Attendance Movements",
          align: "left",
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          opposite: false,
        },
        legend: {
          horizontalAlign: "left",
        },
      },
    };
  }

  componentDidMount() {
    const countPerMonth = this.props.faceArray.reduce((acc, person) => {
      const month = person.date.split("/")[1];
      if (acc[month]) {
        acc[month]++;
      } else {
        acc[month] = 1;
      }
      return acc;
    }, {});

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const newArray = Object.entries(countPerMonth).map(([month, data]) => {
      const person = this.props.faceArray.find(
        (p) => p.date.split("/")[1] === month
      );
      const year = person.date.split("/")[2];
      const monthName = `${monthNames[month - 1].slice(0, 3)},${year.slice(
        -2
      )}`;
      return { month: monthName, data };
    });
    const months = newArray.map((obj) => obj.month);
    const data = newArray.map((obj) => obj.data);

    this.setState((prevState) => {
      return {
        series: [
          {
            ...prevState.series[0],
            data: data,
          },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: months.length > 0 ? months : [],
          },
        },
      };
    });
  }
  render() {
    return (
      <div className="ChartAttendance">
        <h3>Area Chart</h3>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={280}
        />
      </div>
    );
  }
}
export default ChartAttendance;
