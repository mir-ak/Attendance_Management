import React from "react";
// import Experience from "../components/presence/Experience";
// import Langauges from "../components/presence/Langauges";
// import Hobbies from "../components/presence/Hobbies";
// import OtherSkills from "../components/presence/OtherSkills";
import Navigation from "../components/Navigation";

function Presence() {
  return (
    <div>
      <div className="presence">
        <Navigation />
        <div className="presenceContent">
          {/* <Langauges />
          <Experience />
          <OtherSkills />
          <Hobbies /> */}
        </div>
      </div>
    </div>
  );
}

export default Presence;
