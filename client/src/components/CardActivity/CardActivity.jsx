import { useState } from "react";
import style from "./CardActivity.module.css";

const CardActivity = ({
  img,
  name,
  difficulty,
  duration,
  season,
  funcionBorradora,
}) => {
  const [text, setText] = useState("X");

  return (
    <div className={style.cardContainer}>
      <a href="/activities" onClick={funcionBorradora} to="/activities">
        <span
          onMouseOut={() => setText("X")}
          onMouseOver={() => setText("Borrar")}
        >
          {text}
        </span>
      </a>

      <div className={style.imgContainer}>
        <img src={img} alt={name} />
      </div>
      <div className={style.parrafosContainer}>
        <h4>{`Nombre: ${name}`}</h4>
        <p>{`Dificultad: ${difficulty}`}</p>
        <p>{`Duracion: ${duration} Horas`}</p>
        <p>{`Temporada: ${season}`}</p>
      </div>
    </div>
  );
};

export default CardActivity;
