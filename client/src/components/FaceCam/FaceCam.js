import React, { Component } from "react";
import MaterialIcon from "material-icons-react";
import Clock from "../DisplayClock/Clock";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
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
    let { fullName, time, picture } = this.props.item;

    return (
      <div className="project">
        <h3>{fullName}</h3>
        <img src={picture} alt="" onClick={this.handleInfo} />

        <div className="infos" onClick={this.handleInfo}>
          <div class="tooltip">
            <MaterialIcon icon="add_circle" size={35} color="#4FEDD2" invert />
            <span class="tooltiptext">show more informations</span>
          </div>
        </div>
        {this.state.showInfos && (
          <div className="showInfos">
            <div className="infosContent">
              <div className="head">
                <h3>
                  <MaterialIcon icon="how_to_reg" size={30} invert />
                  Scanned at {time} a.m
                </h3>
              </div>
              <br />
              <Clock
                width={200}
                height={200}
                hours={Number(time.split(":")[0])}
                minutes={Number(time.split(":")[1])}
              />
              <div className="text">
                <Stack sx={{ width: "100%" }} spacing={50} paddingTop={5}>
                  <Alert
                    severity={
                      Number(time.split(":")[0]) === 9 &&
                      Number(time.split(":")[1]) > 5 &&
                      Number(time.split(":")[1]) <= 35
                        ? "warning"
                        : Number(time.split(":")[0]) === 8 &&
                          Number(time.split(":")[1]) < 55 &&
                          Number(time.split(":")[1]) >= 35
                        ? "info"
                        : (Number(time.split(":")[0]) === 8 &&
                            Number(time.split(":")[1]) >= 55) ||
                          (Number(time.split(":")[0]) === 9 &&
                            Number(time.split(":")[1]) <= 5)
                        ? "success"
                        : "error"
                    }>
                    <AlertTitle>
                      {Number(time.split(":")[0]) === 9 &&
                      Number(time.split(":")[1]) > 5 &&
                      Number(time.split(":")[1]) <= 35
                        ? `Il est arrivé avec ${
                            time.split(":")[1]
                          } min de retard !`
                        : Number(time.split(":")[0]) === 8 &&
                          Number(time.split(":")[1]) < 55 &&
                          Number(time.split(":")[1]) >= 35
                        ? `Il est arrivé ${
                            60 - Number(time.split(":")[1])
                          } min en avance. `
                        : (Number(time.split(":")[0]) === 8 &&
                            Number(time.split(":")[1]) >= 55) ||
                          (Number(time.split(":")[0]) === 9 &&
                            Number(time.split(":")[1]) <= 5)
                        ? "Il est arrivé a l'heure"
                        : "Il a dû manquer quelques cours matinaux ! "}
                    </AlertTitle>
                  </Alert>
                </Stack>
              </div>

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
