import React, { Component } from "react";
import Navigation from "../components/Navigation";
import * as firebase from "firebase/database";
import databaseApp, { storage } from "../config/firebaseConfig";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import StudentsList from "../components/Dashboards/StudentsList";
import ChartAttendance from "../components/Dashboards/ChartAttendance";
import ChartPie from "../components/Dashboards/ChartPie";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CircularProgressWithLabel = (props) => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        bottom: "50%",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default class Dashboards extends Component {
  state = {
    studentsArray: [],
    faceArray: [],
    progress: 10,
    dateChoose: new Date(),
    currentDate: new Date().toLocaleDateString(),
  };

  handleChangeDate = (newValue) => {
    this.setState({
      dateChoose: newValue,
      currentDate: new Date(newValue).toLocaleDateString(),
    });
  };

  isWeekend = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
  };

  componentDidMount() {
    var newFace = [];
    var totalFace = [];
    listAll(ref(storage, "/pictures"))
      .then((data) => {
        data.items.forEach((fileRef) => {
          listAll(ref(storage, "/pictures"))
            .then((data) => {
              data.items.forEach((fileRef) => {
                getMetadata(fileRef)
                  .then((metadata) => {
                    const extension = metadata.contentType.split("/")[1];
                    var newJsonTotalFace = {};
                    if (fileRef.name.includes(extension)) {
                      newJsonTotalFace = {
                        id: metadata.generation.slice(-8),
                        fullName: fileRef.name.split("." + extension)[0],
                      };
                    } else {
                      newJsonTotalFace = {
                        id: metadata.generation.slice(-8),
                        fullName: fileRef.name.split(".jpg")[0],
                      };
                    }

                    getDownloadURL(fileRef).then((url) => {
                      if (
                        url.includes(
                          newJsonTotalFace.fullName.split(" ").join("%20")
                        )
                      ) {
                        newJsonTotalFace = {
                          id: newJsonTotalFace.id,
                          fullName: newJsonTotalFace.fullName,
                          Email:
                            newJsonTotalFace.fullName
                              .split(" ")
                              .join("")
                              .toLowerCase() + "@etud.univ-paris8.fr",
                          picture: url,
                        };
                      }

                      if (
                        !totalFace.some(
                          (item) => item.fullName === newJsonTotalFace.fullName
                        )
                      )
                        totalFace.push(newJsonTotalFace);
                    });

                    this.setState({
                      studentsArray: totalFace.sort((a, b) =>
                        a.fullName.localeCompare(b.fullName)
                      ),
                    });
                  })
                  .catch((err) => console.log(err));
              });
            })
            .catch((err) => console.log(err));

          firebase.onValue(
            firebase.ref(databaseApp, "faceCam/"),
            (snapshot) => {
              if (snapshot.val())
                Object.entries(snapshot.val()).forEach(([id, values]) => {
                  let newJsonFace = {
                    id: id,
                    fullName: values.fullName,
                    date: values.date,
                    time: values.time,
                  };
                  if (!newFace.some((item) => item.id === newJsonFace.id)) {
                    newFace.push(newJsonFace);
                  }

                  this.setState({ faceArray: newFace });
                });
            }
          );
        });
      })
      .catch((err) => console.log(err));

    const timer = setInterval(() => {
      this.setState((prevState) => {
        const prevProgress = prevState.progress;
        const progress = prevProgress >= 100 ? 130 : prevProgress + 22.5;
        return { progress };
      });
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }
  render() {
    return (
      <div className="dashboard">
        <Navigation />
        {this.state.progress <= 100 ? (
          <CircularProgressWithLabel value={this.state.progress} />
        ) : (
          <div className="dashboardContent">
            <div className="Calendar">
              <h3>Calendar</h3>
              <LocalizationProvider dateAdapter={AdapterDayjs} sx={{}}>
                <StaticDatePicker
                  dateFormat="DD/MM/YYYY"
                  inputFormat="DD/MM/YYYY"
                  value={this.state.dateChoose}
                  shouldDisableDate={this.isWeekend}
                  onChange={(newValue) => this.handleChangeDate(newValue)}
                  sx={{
                    backgroundColor: "green",
                    ".MuiTypography-root": {
                      color: "white",
                      opacity: 0.85,
                    },
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <StudentsList studentsArray={this.state.studentsArray} />
            {this.state.faceArray && this.state.faceArray.length > 1 ? (
              <ChartAttendance faceArray={this.state.faceArray} />
            ) : null}
            {this.state.faceArray &&
            this.state.studentsArray &&
            this.state.studentsArray.length > 0 &&
            this.state.faceArray.length > 0 &&
            this.state.currentDate ? (
              <ChartPie
                faceArray={this.state.faceArray}
                allFaceArray={this.state.studentsArray}
                currentDate={this.state.currentDate}
              />
            ) : null}
          </div>
        )}
      </div>
    );
  }
}
