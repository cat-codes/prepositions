import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import SelectBtn from "./components/btn/SelectBtn";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-text">
        Komplett deutsche Verbliste mit Präpositionen A1-C1
      </h1>
      <div className="home-content">
        <Link to="/list">
          <SelectBtn SelectBtnText={"Präpositionenliste"} />
        </Link>
        <Link to="/pretest">
          <SelectBtn SelectBtnText={"Präpositionstest"} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
