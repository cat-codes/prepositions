import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./Home";
import List from "./List";
import Pretest from "./Pretest";
import Test from "./Test";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/pretest" element={<Pretest />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
