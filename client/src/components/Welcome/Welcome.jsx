import React from "react";
import Landing from "../../images/Landing.jpg";
import LogoTitulo from "../../images/CountriesApp.png";
import LogoSubtitulo from "../../images/cooltext426055965501219.png";

import style from "./Welcome.module.css";
import { Link } from "react-router-dom";
function Welcome() {
  return (
    <>
      <header className={style.welcomeContainer}>
        {/* <h1 className={style.titulo}>Mi aplicación de paises!!</h1> */}
        <img className={style.titulo} src={LogoTitulo} alt="Logo" />
        {/* <h2 className={style.subtitulo}>Busca paises y crea actividades</h2> */}
        <img className={style.titulo} src={LogoSubtitulo} alt="Logo" />
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
