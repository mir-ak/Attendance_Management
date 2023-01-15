import React from "react";
import imgProfil from "../media/admin.png";
import { NavLink } from "react-router-dom";
import {
  TwitterOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import MaterialIcon from "material-icons-react";
import Auth from "./PrivateRoute/Auth";
import { NotificationManager } from "react-notifications";

function Navigation() {
  return (
    <div className="sidebar">
      <div className="id">
        <div className="idContent">
          <img src={imgProfil} alt="profil-pic" />
          <h3>
            {localStorage.getItem("user")
              ? localStorage.getItem("user").split("_").join(" ")
              : "Admin 2023"}
          </h3>
        </div>
      </div>
      <div className="navigation">
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="navActive">
              <i>
                <MaterialIcon icon="cottage" size={30} color="#4FEDD2" invert />
              </i>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/presence" activeClassName="navActive">
              <i>
                {" "}
                <MaterialIcon
                  icon="co_present"
                  size={30}
                  color="#4FEDD2"
                  invert
                />
              </i>
              <span>Presence</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/dashboard" activeClassName="navActive">
              <i>
                <MaterialIcon
                  icon="dashboard"
                  size={30}
                  color="#4FEDD2"
                  invert
                />
              </i>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/contact_cv" activeClassName="navActive">
              <i>
                <MaterialIcon
                  icon="contact_phone"
                  size={30}
                  color="#4FEDD2"
                  invert
                />
              </i>
              <span>Contact</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/Login"
              activeClassName="navActive"
              onClick={() => {
                Auth.logout();
                NotificationManager.success(`You are logged out successfully`);
              }}>
              <MaterialIcon
                icon="power_settings_new"
                size={30}
                color="#4FEDD2"
                invert
              />

              <span>Log Out</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="socialNetwork">
        <ul>
          <li>
            <a
              href="https://www.linkedin.com/in/mir-ak/"
              target="_blank"
              rel="noopener noreferrer">
              <LinkedinOutlined
                style={{ fontSize: "22px", color: "#2a1d52" }}
              />{" "}
            </a>
          </li>

          <li>
            <a
              href="https://github.com/mir-ak/"
              target="_blank"
              rel="noopener noreferrer">
              <GithubOutlined style={{ fontSize: "22px", color: "#2a1d52" }} />
            </a>
          </li>

          <li>
            <a
              href="https://twitter.com/xmirak_x"
              target="_blank"
              rel="noopener noreferrer">
              <TwitterOutlined style={{ fontSize: "22px", color: "#2a1d52" }} />
            </a>
          </li>
        </ul>

        <div className="signature">
          <p>AMS® 3.2.0</p>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
