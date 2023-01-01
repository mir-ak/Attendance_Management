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
              <h2>Bienvenue sur l'App de gestion de présence</h2>
            </div>
            <div className="animated-title">
              <div className="text-top">
                <div>
                  <span>
                    C’est avec un grand plaisir que je lance la mise en ligne de
                    dans ma nouvelle application de gestion de présence.
                    <br />
                    je suis heureux de vous y accueillir.{" "}
                  </span>
                </div>
              </div>
              <div className="text-bottom">
                <div>Bonne navigation !</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
