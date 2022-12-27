import style from "./CardActivity.module.css";

const CardActivity = ({ img, name, difficulty, duration, season }) => {
  return (
    <div className={style.cardContainer}>
      <div className={style.imgContainer}>
        <img src={img} alt={name} />
      </div>
      <div className={style.parrafosContainer}>
        <h4>{`Nombre: ${name}`}</h4>
        <p>{`Dificultad: ${difficulty}`}</p>
        <p>{`Duracion: ${duration}`}</p>
        <p>{`Temporada: ${season}`}</p>
      </div>
    </div>
  );
};

export default CardActivity;
