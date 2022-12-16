import React from "react";
import style from "./Home.module.css";
import NavBar from "../NavBar/NavBar";
import CardsContainer from "../CardsContainer/CardsContainer";

const Home = () => {
  return (
    <div className={style.homeContainer}>
      <NavBar />
      <CardsContainer />
    </div>
  );
};

export default Home;
