import React from "react";
import Navigation from "../components/Navigation";
//import FaceCamList from "../components/Presence/FaceCamList";

function Portfolio() {
  return (
    <div className="dashboard">
      <Navigation />
      <div className="dashboardContent">{/* <FaceCamList /> */}</div>
    </div>
  );
}

export default Portfolio;
