import React, { Component } from "react";
import * as firebase from "firebase/database";
import databaseApp, { storage } from "../../config/firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { portfolioData } from "../../data/portfolioData";
import FaceCam from "./FaceCam";
import Pagination from "@mui/material/Pagination";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export default class ProjectList extends Component {
  state = {
    projects: portfolioData,
    faceCam: [],
    currentPage: 1,
    elementsPerPage: 6,
    today: new Date(),
    currentDate: new Date().toLocaleDateString(),
    time: null,
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

  handleChangeDate = (newValue) => {
    this.setState({
      today: newValue,
      currentDate: new Date(newValue).toLocaleDateString(),
    });
  };

  handleChangeTime = (newValue) => {
    this.setState({ time: newValue });
  };
  componentDidMount() {
    var newFaceCam = [];

    firebase.onValue(firebase.ref(databaseApp, "faceCam/"), (snapshot) => {
      if (snapshot.val())
        Object.entries(snapshot.val()).forEach(([id, values]) => {
          getDownloadURL(ref(storage, `pictures/${values.fullName}`)).then(
            (data) => {
              console.log(data);
            }
          );
          let newJsonProduct = {
            id: id,
            fullName: values.fullName,
            date: values.date,
            time: values.time,
            picture: values.path,
          };
          newFaceCam.push(newJsonProduct);
          this.setState({
            faceCam: newFaceCam,
          });
        });
    });
  }

  render() {
    let { faceCam, currentDate } = this.state;
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
        </ul>
        <div className="projects">
          {faceCam
            .filter((item) => item.date.includes(currentDate))
            .map((item) => {
              return <FaceCam key={item.id} item={item} />;
            })}
        </div>
        <div className="pagination">
          <Pagination count={10} color="primary" />
        </div>
      </div>
    );
  }
}
