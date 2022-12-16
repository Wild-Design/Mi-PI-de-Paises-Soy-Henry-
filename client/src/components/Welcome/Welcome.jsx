import React from "react";
import img1 from "../../images/img1.jpg";
import style from "./Welcome.module.css";
import { Link } from "react-router-dom";
function Welcome() {
  return (
    <header className={style.welcomeContainer}>
      <img
        className={style.imgWelcome}
        src={img1}
        alt="imagen de la ruta inicial"
      />
      <h1>Mi aplicación de paises!!</h1>
      <h3>Busca paises y crea actividades</h3>
      <Link to="home">
        <button>Entrar</button>
      </Link>
    </header>
  );
}

export default Welcome;
