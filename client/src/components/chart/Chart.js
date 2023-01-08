import React from "react";
import ReactApexChart from "react-apexcharts";

const Chart = (props) => {
  return new Promise((resolve, reject) => {
    try {
      const element = (
        <ReactApexChart
          options={props.options}
          series={props.series}
          type="pie"
          width={480}
        />
      );
      resolve(element);
    } catch (error) {
      reject(error);
    }
  });
};

export default Chart;
