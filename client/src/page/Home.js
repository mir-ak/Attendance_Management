import React from "react";
import Navigation from "../components/Navigation";

function Home() {
  return (
    <div>
      <div className="home">
        <Navigation />
        <div className="homeContent">
          <div className="content">
            <div className="typing-demo">
              <h2>Welcome to Attendance Management System</h2>
            </div>
            <div className="animated-title">
              <div className="text-top">
                <div>
                  <span>
                    It is with great pleasure that I launch my new attendance
                    management application.
                    <br />{" "}
                  </span>
                </div>
              </div>
              <div className="text-bottom">
                <div>Happy Surfing !</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
