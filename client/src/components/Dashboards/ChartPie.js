import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
function ChartPie(props) {
  const [series, setSeries] = useState([]);
  const options = {
    labels: ["Présent", "Absent"],
    colors: ["#42EC4A", "#DF5133"],
    title: {
      text: "Fundamental Analysis of Attendance",
      align: "left",
      fontSize: "45px",
    },
    subtitle: {
      text: "Pie Chart",
      align: "left",
    },

    chart: {
      foreColor: "#36d0ea",
    },

    label: [
      {
        text: "Présent",
        style: {
          color: "green",
          fontSize: "20px",
        },
      },
      {
        text: "Absent",
        style: {
          color: "red",
          fontSize: "20px",
        },
      },
    ],
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#111"],
      },
      background: {
        enabled: true,
        foreColor: "#fff",
        borderWidth: 0.5,
      },
    },
  };

  useEffect(() => {
    const filterDate = props.faceArray.filter((item) =>
      item.date.includes(props.currentDate)
    );

    const studentsList = props.allFaceArray.map((item) => {
      const face = filterDate.find((face) => face.fullName === item.fullName);
      if (face) {
        return { fullName: item.fullName, status: "Présent" };
      } else {
        return { fullName: item.fullName, status: "Absent" };
      }
    });
    if (studentsList.length > 0) {
      const present = studentsList.filter(
        (item) => item.status === "Présent"
      ).length;
      const absent = studentsList.filter(
        (item) => item.status === "Absent"
      ).length;
      setSeries([present, absent]);
    }
  }, [props]);

  return (
    <div className="ChartPie">
      <h3>Pie Chart</h3>
      <ReactApexChart
        options={options}
        series={series}
        title={"Présence des étudiants"}
        type="pie"
        width={400}
      />
    </div>
  );
}

export default ChartPie;
