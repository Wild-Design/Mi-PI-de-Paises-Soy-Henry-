import React from "react";
import Landing from "../../images/Landing.jpg";

import style from "./Welcome.module.css";
import { Link } from "react-router-dom";
function Welcome() {
  return (
    <>
      <header className={style.welcomeContainer}>
        <h1 className={style.titulo}>Mi aplicación de paises!!</h1>
        <h2 className={style.subtitulo}>Busca paises y crea actividades</h2>
        <Link to="home">
          <button className={style.boton}>Comenzar</button>
        </Link>
      </header>
      <img
        className={style.imgWelcome}
        src={Landing}
        alt="imagen de la ruta inicial"
      />
    </>
  );
}

export default Welcome;
