import React from "react";
import FaceCamList from "../components/Presence/FaceCamList";

import Navigation from "../components/Navigation";

function Presence() {
  return (
    <div className="presence">
      <Navigation />
      <div className="presenceContent">
        <FaceCamList />
      </div>
    </div>
  );
}

export default Presence;
