import React, { Component } from "react";
import * as firebase from "firebase/database";
import databaseApp, { storage } from "../../config/firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { portfolioData } from "../../data/portfolioData";
import FaceCam from "./FaceCam";
import Pagination from "@mui/material/Pagination";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
//mport MaterialIcon from "material-icons-react";
import Button from "@mui/material/Button";

const CircularProgressWithLabel = (props) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
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

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default class ProjectList extends Component {
  state = {
    projects: portfolioData,
    faceCam: [],
    currentPage: 1,
    elementsPerPage: 10,
    progress: 10,
    today: new Date(),
    currentDate: new Date().toLocaleDateString(),
    currentTime: null,
    time: null,
    picture: [],
  };

  handleChangeDate = (newValue) => {
    this.setState({
      today: newValue,
      currentDate: new Date(newValue).toLocaleDateString(),
    });
  };

  handleChangeTime = (newValue) => {
    const time = new Date(newValue);
    this.setState({
      time: newValue,
      currentTime:
        newValue !== null ? `${time.getHours()}:${time.getMinutes()}` : null,
    });
  };

  componentDidMount() {
    var newFaceCam = [];

    listAll(ref(storage, "/pictures")).then((data) => {
      data.items.forEach((fileRef) => {
        getDownloadURL(fileRef).then((url) => {
          firebase.onValue(
            firebase.ref(databaseApp, "faceCam/"),
            (snapshot) => {
              if (snapshot.val())
                Object.entries(snapshot.val()).forEach(([id, values]) => {
                  if (url.includes(values.fullName.split(" ").join("%20"))) {
                    let newJsonFaceCam = {
                      id: id,
                      fullName: values.fullName,
                      date: values.date,
                      time: values.time,
                      picture: url,
                    };

                    if (
                      !newFaceCam.some((item) => item.id === newJsonFaceCam.id)
                    ) {
                      newFaceCam.push(newJsonFaceCam);
                    }

                    this.setState({
                      faceCam: newFaceCam,
                    });
                  }
                });
            }
          );
        });
      });
    });
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
    let { faceCam, currentDate, elementsPerPage, currentTime } = this.state;
    const indexOfLastElement =
      this.state.currentPage * this.state.elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - this.state.elementsPerPage;
    const filterDate = faceCam.filter((item) =>
      item.date.includes(currentDate)
    );
    const filterTime = filterDate.filter((item) =>
      item.time.includes(currentTime)
    );

    return (
      <div className="presenceContent">
        <ul className="filter">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <li>
              <DesktopDatePicker
                label="Date"
                dateFormat="DD/MM/YYYY"
                inputFormat="DD/MM/YYYY"
                value={this.state.today}
                onChange={this.handleChangeDate}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    sx={{
                      svg: { color: "#fff" },
                      input: { color: "#fff" },
                      label: { color: "#fff" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#ffffff",
                        },
                        "&:hover fieldset": {
                          borderColor: "blue",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "green",
                        },
                      },
                    }}
                  />
                )}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <TimePicker
                label="Time"
                value={this.state.time}
                onChange={this.handleChangeTime}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    sx={{
                      svg: { color: "#fff" },
                      input: { color: "#fff" },
                      label: { color: "#fff" },
                      borderColor: { color: "#fff" },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#ffffff",
                        },
                        "&:hover fieldset": {
                          borderColor: "blue",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "green",
                        },
                      },
                    }}
                  />
                )}
              />
            </li>
          </LocalizationProvider>
          <Box sx={{ flexGrow: 0.98 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Add Products">
              <Stack spacing={2} direction="row">
                <Button variant="outlined">Outlined</Button>
              </Stack>
            </Tooltip>
          </Box>
        </ul>
        {this.state.progress <= 100 ? (
          <CircularProgressWithLabel value={this.state.progress} />
        ) : (
          <>
            <div className="projects">
              {filterDate.length === 0 && filterTime.length === 0 ? (
                <Stack sx={{ width: "100%" }} spacing={50} paddingTop={5}>
                  <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    No one is present on this date {currentDate}{" "}
                    {currentTime !== null
                      ? "or this time " + currentTime
                      : null}{" "}
                    <strong>check it out!</strong>
                  </Alert>
                </Stack>
              ) : faceCam.length > 0 && currentTime !== null ? (
                filterTime
                  .slice(indexOfFirstElement, indexOfLastElement)
                  .map((item) => {
                    return <FaceCam key={item.id} item={item} />;
                  })
              ) : (
                filterDate
                  .slice(indexOfFirstElement, indexOfLastElement)
                  .map((item) => {
                    return <FaceCam key={item.id} item={item} />;
                  })
              )}
            </div>
            <div className="pagination">
              <Pagination
                color="primary"
                defaultPage={1}
                count={
                  currentTime != null
                    ? Math.ceil(filterTime.length / elementsPerPage)
                    : Math.ceil(filterDate.length / elementsPerPage)
                }
                onChange={(event, page) => this.setState({ currentPage: page })}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}
