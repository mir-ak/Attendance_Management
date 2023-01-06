import React from "react";
import imgProfil from "../media/admin.png";
import { NavLink } from "react-router-dom";
import {
  TwitterOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import MaterialIcon from "material-icons-react";
import AuthContext from "./PrivateRoute/Auth";

function Navigation() {
  return (
    <div className="sidebar">
      <div className="id">
        <div className="idContent">
          <img src={imgProfil} alt="profil-pic" />
          <h3>Imade Saleh</h3>
        </div>
      </div>
      <div className="navigation">
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="navActive">
              <i>
                <MaterialIcon icon="cottage" size={30} color="#4FEDD2" invert />
              </i>
              <span>Accueil</span>
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
            <NavLink exact to="/Dashboard" activeClassName="navActive">
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
            <NavLink exact to="/Login" activeClassName="navActive">
              <i
                onClick={() => {
                  AuthContext.logout();
                }}>
                <MaterialIcon
                  icon="power_settings_new"
                  size={30}
                  color="#4FEDD2"
                  invert
                />
              </i>
              <span>Déconnecter</span>
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
          <p>AGDP® 1.3.0</p>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
