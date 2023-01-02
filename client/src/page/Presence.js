import React from "react";
import FaceCamList from "../components/FaceCam/FaceCamList";

import Navigation from "../components/Navigation";

function Presence() {
  return (
    <div>
      <div className="presence">
        <Navigation />
        <div className="presenceContent">
          <FaceCamList />
        </div>
      </div>
    </div>
  );
}

export default Presence;
